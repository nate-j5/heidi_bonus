import '../styles/FeatureResponse.css';

interface FeatureResponseProps {
  response: {
    summary: string;
  };
}

const FeatureResponse = ({ response }: FeatureResponseProps) => {
  return (
    <div className="feature-response">
      <h1 className="title">Feature Request</h1>
      <p className="summary">{response.summary}</p>
      <div className="button-container">
        <button className="action-button featurebase">
          <img src="/src/assets/logos/featurebase.png" alt="Featurebase" width="20" height="20" />
          Add to Featurebase
        </button>
        <button className="action-button sleekplan">
          <img src="/src/assets/logos/sleekplan.png" alt="Sleekplan" width="20" height="20" />
          Add to Sleekplan
        </button>
        <button className="action-button canny">
          <img src="/src/assets/logos/canny.png" alt="Canny" width="20" height="20" />
          Add to Canny
        </button>
      </div>
    </div>
  );
};

export default FeatureResponse;
