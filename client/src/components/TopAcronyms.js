import React, { useState, useEffect } from 'react';
import './TopAcronyms.css';

const TopAcronyms = () => {
  const [topAcronyms, setTopAcronyms] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Fetch top searched acronyms
  const fetchTopAcronyms = async () => {
    setLoading(true);
    try {
      const response = await fetch('/top_searched_acronyms');
      if (!response.ok) {
        throw new Error(`Failed to fetch: ${response.statusText}`);
      }
      const data = await response.json();
      if (data.top_searched_acronyms) {
        setTopAcronyms(data.top_searched_acronyms);
        setError('');
      } else {
        setError('No top acronyms found.');
      }
    } catch (err) {
      setError(err.message);
      setTopAcronyms([]);
    } finally {
      setLoading(false);
    }
  };

  // Fetch data on component mount
  useEffect(() => {
    fetchTopAcronyms();
  }, []);

  return (
    <div className="top-acronyms-container">
      <h2 className="top-acronyms-header">Top 5 Most Searched Acronyms</h2>
      {loading && <p className="loading-message">Loading...</p>}
      {error && <p className="error-message">{error}</p>}
      <ul className="top-acronyms-list">
        {topAcronyms.map((item, index) => (
          <li key={index}>
            <span>{item.acronym}</span> - <span>{item.freq} searches</span>
          </li>
        ))}
      </ul>
      <button className="refresh-button" onClick={fetchTopAcronyms}>
        Refresh
      </button>
    </div>
  );
};

export default TopAcronyms;
