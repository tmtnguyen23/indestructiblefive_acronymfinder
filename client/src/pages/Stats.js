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
      <p>{visitorCount}</p>

      <h3 style={{ fontSize: '24px', color: '#006341', marginTop: '30px', fontFamily: 'Arial' }}>
        Top 5 Most Searched Acronyms
      </h3>
      {isLoading && <p>Loading...</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {!isLoading && topAcronyms.length > 0 && (
        <ul>
          {topAcronyms.map((item, index) => (
            <li key={index}>
              {item.acronym} - {item.freq} searches
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default Stats;
