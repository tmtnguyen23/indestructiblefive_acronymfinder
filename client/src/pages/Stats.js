import React, { useState, useEffect } from 'react';

function Stats() {

  const [visitorCount, setVisitorCount] = useState('');
  const [topAcronyms, setTopAcronyms] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    handleUserVisits();
  }, []); // Fetch visitor count once

  useEffect(() => {
    fetchTopAcronyms();
  }, []); // Fetch top acronyms once

  const handleUserVisits = () => {
    setIsLoading(true);
    fetch('/count')
      .then((res) => {
        if (!res.ok) {
          throw new Error('Failed to fetch visitor count.');
        }
        return res.json();
      })
      .then((result) => {

        setVisitorCount(result.message || 'Unable to fetch visitor count.');
      })
      .catch((error) => {
        console.error('Visitor count fetch error:', error);
        setError('Failed to load visitor count.');
      });
  };

  const fetchTopAcronyms = () => {
    setIsLoading(true);
    fetch('/top_searched_acronyms')
      .then((res) => {
        if (!res.ok) {
          throw new Error('Failed to fetch top acronyms.');
        }
        return res.json();
      })
      .then((result) => {
        if (result.top_searched_acronyms) {
          setTopAcronyms(result.top_searched_acronyms);
          setError('');
        } else {
          setError('No top acronyms found.');
        }
      })
      .catch((error) => {
        console.error('Top acronyms fetch error:', error);
        setError('Failed to load top acronyms.');
      })
      .finally(() => setIsLoading(false));
  };

  return (
    <div style={{ textAlign: 'center', marginTop: 'var(--header-height)', padding: '40px 20px' }}>
      <h2 style={{ fontSize: '30px', color: '#006341', marginBottom: '20px', fontFamily: 'Arial' }}>
        Website Statistics
      </h2>
      <div style={{ 
        fontSize: '24px', 
        color: '#666', 
        margin: '0 auto 30px auto',
        maxWidth: '400px'
      }}>
        {visitorCount}
      </div>

      <h3 style={{ fontSize: '24px', color: '#006341', marginTop: '30px', fontFamily: 'Arial' }}>
        Top 5 Most Searched Acronyms
      </h3>
      {isLoading && <p>Loading...</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {!isLoading && topAcronyms.length > 0 && (
        <div style={{ maxWidth: '800px', margin: '0 auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: '20px' }}>
            <thead>
              <tr style={{ backgroundColor: '#006341', color: 'white' }}>
                <th style={{ padding: '12px', textAlign: 'center' }}>Acronym</th>
                <th style={{ padding: '12px', textAlign: 'center' }}>Meaning(s)</th>
                <th style={{ padding: '12px', textAlign: 'center' }}>Searches</th>
              </tr>
            </thead>
            <tbody>
              {topAcronyms.map((item, index) => (
                <tr 
                  key={index}
                  style={{ 
                    backgroundColor: index % 2 === 0 ? '#f8f9fa' : 'white',
                    borderBottom: '1px solid #dee2e6'
                  }}
                >
                  <td style={{ padding: '12px' }}>{item.acronym.toUpperCase()}</td>
                  <td style={{ padding: '12px' }}>
                    {item.meanings.map((meaning, idx) => (
                      <div key={idx} style={{ marginBottom: idx !== item.meanings.length - 1 ? '8px' : '0' }}>
                        {meaning}
                      </div>
                    ))}
                  </td>
                  <td style={{ padding: '12px', textAlign: 'center' }}>{item.freq}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default Stats;
