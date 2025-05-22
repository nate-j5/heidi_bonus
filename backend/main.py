from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from anthropic import Anthropic
from dotenv import load_dotenv
import os
import logging
import traceback

# Set up logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

# Load environment variables
load_dotenv()

# Initialize FastAPI app
app = FastAPI()

# Add CORS middleware
if os.getenv("ENVIRONMENT") == "production":
    logger.info("Starting server in production mode")
    origins = [os.getenv("FRONTEND_URL", "https://heidi-bonus.onrender.com/")]
else:
    logger.info("Starting server in development mode")
    origins = ["http://localhost:5173"]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["POST"],  # Only using POST for the summarize endpoint
    allow_headers=["Content-Type"], 
)

# Check API key
api_key = os.getenv("ANTHROPIC_API_KEY")
if not api_key:
    logger.error("ANTHROPIC_API_KEY not found in environment variables")
    raise ValueError("ANTHROPIC_API_KEY not found")

# Initialize Anthropic client
client = Anthropic(api_key=api_key)


# Define request model
class SummaryRequest(BaseModel):
    text: str


@app.post("/api/summarize")
async def summarize_text(request: SummaryRequest):
    try:
        logger.info(f"Received summarization request")

        if not request.text:
            raise HTTPException(status_code=400, detail="Text field cannot be empty")

        # Check if text has at least 3 words
        if len(request.text.split()) < 3:
            logger.warning("Text too short for summarization")
            raise HTTPException(status_code=400, detail="Please enter at least 3 words for summarization")

        # Define the user prompt content directly
        user_prompt_content = f"""
Summarize the following feature request into a ONE SENTENCE product description.
Keep the summary professional, actionable, and limited to exactly one sentence maximum. Do not use any leading text like "The text provides a summary of:" or anything similar. Just summarize the feature request.

{request.text}
"""

        response = client.messages.create(
            model="claude-3-haiku-20240307",
            max_tokens=150,
            temperature=0.0,
            system="You are a helpful assistant that summarizes feature requests concisely and professionally.",
            messages=[{"role": "user", "content": user_prompt_content}],
        )

        # Extract the summary
        summary = response.content[0].text
        logger.debug(f"Generated summary: {summary}")

        return {"summary": summary}
    except HTTPException as he:
        raise he
    except Exception as e:
        logger.error(f"Error in summarize_text: {str(e)}")
        logger.error(traceback.format_exc())
        raise HTTPException(status_code=500, detail=str(e))


if __name__ == "__main__":
    import uvicorn

    uvicorn.run(app, host="0.0.0.0", port=8000)
