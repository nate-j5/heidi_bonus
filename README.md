# Heidi Bonus Project

This app allows internal team members to write feature requests in their own words. It then uses the Claude API to generate a summary, which can be added to tools like Featurebase, Sleekplan, or Canny.

[View Website](https://github.com/nate-j5/inscribe_bonus).


## Setup Instructions

### Frontend Setup

1. Navigate to the frontend directory:
   ```bash
   cd frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Run the development server:
   ```bash
   npm run dev
   ```

### Backend Setup

1. Navigate to the backend directory:
   ```bash
   cd backend
   ```

2. Create and activate a virtual environment:
   ```bash
   python3 -m venv .venv
   source .venv/bin/activate  # On Unix/macOS
   .venv\Scripts\activate     # On Windows
   ```

3. Install dependencies:
   ```bash
   pip install -r requirements.txt
   ```

4. Run the backend server:
   ```**bash**
   python3 main.py
   ```


