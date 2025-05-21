import { useState } from 'react';
import '../styles/FeatureRequest.css';

interface FeatureRequestProps {
  onSubmit: (text: string) => void;
}

const FeatureRequest = ({ onSubmit }: FeatureRequestProps) => {
  const [requestText, setRequestText] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(requestText);
  };

  return (
    <div className="feature-request">
      <h1 className="title">Internal Feature Request Demo</h1>
      <p className="subtitle">Submit your notes on product feedback</p>
      <form onSubmit={handleSubmit}>
        <textarea
          className="request-input"
          placeholder="Enter request here..."
          value={requestText}
          onChange={(e) => setRequestText(e.target.value)}
        />
        <button type="submit" className="submit-button">
          Add Request
        </button>
      </form>
    </div>
  );
};

export default FeatureRequest;
