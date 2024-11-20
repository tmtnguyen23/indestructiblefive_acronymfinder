import React, { useState, useEffect } from 'react';

function Stats() {
  const [statsResult, setStatsResult] = useState('');

  useEffect(() => {
    // Call handleRandomSearch when the component mounts
    handleUserVisits();
  }, []);

  const handleUserVisits = () => {
    fetch('/count')
      .then((res) => res.json())
      .then((result) => {
        setStatsResult(result.message);
      })
      .catch((error) => {
        setStatsResult("An error occurred");
        console.error(error);
      });
  };

  return (

      <div style={{ textAlign: 'center' }}>
        <p style={{ fontSize: '16px', color: '#006747', fontStyle: 'italic', fontFamily: 'Arial' }}>
          {statsResult}
        </p>
      </div>

  );
}

export default Stats;