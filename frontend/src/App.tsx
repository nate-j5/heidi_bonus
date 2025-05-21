import { useState } from 'react'
import FeatureRequest from './components/FeatureRequest'
import FeatureResponse from './components/FeatureResponse'
import './App.css'
import heidiLogo from './assets/logos/heidi.png'

interface FeatureRequestResponse {
  summary: string;
}

function App() {
  const [response, setResponse] = useState<FeatureRequestResponse | null>(null)

  const handleSubmit = async (text: string) => {
    
    try {
      const response = await fetch(import.meta.env.VITE_API_ENDPOINT, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ text }),
      })
      const data = await response.json()
      setResponse(data)
    } catch (error) {
      console.error('Error submitting request:', error)
    }
  }

  return (
    <div className="container">
      <div className="card">
        {!response ? (
          <>
            <div className="logo">
              <img src={heidiLogo} alt="Heidi" />
            </div>
            <FeatureRequest onSubmit={handleSubmit} />
          </>
        ) : (
          <FeatureResponse response={response} />
        )}
      </div>
    </div>
  )
}

export default App
