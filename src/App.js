import React, { useState } from 'react';

function App() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const API_URL = "https://97eoxe0bhe.execute-api.ap-south-1.amazonaws.com/query"; // ⬅️ Replace this with your real API Gateway URL

  const fetchData = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(API_URL);
      if (!response.ok) throw new Error("Failed to fetch data.");
      const result = await response.json();
      setData(result);
    } catch (err) {
      setError(err.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ fontFamily: "Arial", padding: "2rem" }}>
      <h1>🚀 Customer Data Viewer</h1>
      <button
        onClick={fetchData}
        style={{
          padding: "10px 20px",
          background: "#0070f3",
          color: "#fff",
          border: "none",
          borderRadius: "6px",
          cursor: "pointer",
          marginBottom: "20px"
        }}
      >
        Load Data from API
      </button>

      {loading && <p>Loading data...</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}

      {data && (
        <div style={{ whiteSpace: "pre-wrap", background: "#f4f4f4", padding: "1rem", borderRadius: "5px" }}>
          {JSON.stringify(data, null, 2)}
        </div>
      )}
    </div>
  );
}

export default App;
