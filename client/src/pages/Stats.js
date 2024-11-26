import React, { useState, useEffect } from 'react';

function Stats() {
  const [statsResult, setStatsResult] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    handleUserVisits();
  }, []);

  const handleUserVisits = () => {
    setIsLoading(true);
    fetch('/count')
      .then((res) => {
        if (!res.ok) {
          throw new Error('Network response was not ok');
        }
        return res.json();
      })
      .then((result) => {
        setStatsResult(result.message);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error('Error:', error);
        setError('Failed to load stats');
        setIsLoading(false);
      });
  };

  return (
    <div style={{ 
      textAlign: 'center',
      marginTop: 'var(--header-height)',  // Use the header height variable
      padding: '40px 20px'
    }}>
      <h2 style={{ 
        fontSize: '30px',
        color: '#006341',
        marginBottom: '20px',
        fontFamily: 'Arial'
      }}>
        Website Statistics
      </h2>
      
      {isLoading && (
        <p style={{ color: '#006341' }}>Loading stats...</p>
      )}
      
      {error && (
        <p style={{ color: 'red' }}>{error}</p>
      )}
      
      {!isLoading && !error && (
        <p style={{ 
          fontSize: '18px',
          color: '#006341',
          fontStyle: 'italic',
          fontFamily: 'Arial'
        }}>
          {statsResult}
        </p>
      )}
    </div>
  );
}

export default Stats;