import React, { useState, useEffect } from 'react';
import SearchBox from '../components/SearchBox';
import SearchResult from '../components/SearchResult';

function Home() {
  const [searchResult, setSearchResult] = useState('');
  const [hasSearched, setHasSearched] = useState(false);
  const [randomWord, setRandomWord] = useState('');

  useEffect(() => {
    handleRandomSearch();
  }, []);

  const handleSearch = (query) => {
    setHasSearched(true);
    fetch(`/search_acronym?acronym=${query}`)
      .then((res) => res.json())
      .then((result) => {
        if (result.error) {
          setSearchResult(result.error);
        } else if (result.message) {
          setSearchResult(result.message);
        } else {
          setSearchResult(result.result);
        }
      })
      .catch((error) => {
        console.error('Error searching acronym:', error);
        setSearchResult('An error occurred while searching for the acronym.');
      });
  };

  const handleRandomSearch = () => {
    fetch('/random_acronym')
      .then((res) => res.json())
      .then((result) => {
        setRandomWord(result.result || 'No random acronym found.');
      })
      .catch((error) => {
        console.error('Error fetching random acronym:', error);
        setRandomWord('An error occurred while fetching a random acronym.');
      });
  };

  return (
    <div>
      <div style={{ textAlign: 'center' }}>
        <h2
          style={{
            fontSize: '30px',
            color: '#006747',
            fontStyle: 'italic',
            fontFamily: 'Arial',
          }}
        >
          Acronym Finder
        </h2>
      </div>

      <SearchBox onSearch={handleSearch} />
      <div style={{ textAlign: 'center' }}>
        <p style={{ fontSize: '16px', color: '#006747', fontStyle: 'italic', fontFamily: 'Arial' }}>
          Your lucky acronym is {randomWord}
        </p>
        <button 
          onClick={handleRandomSearch}
          style={{
            padding: '8px 16px',
            backgroundColor: '#006747',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer',
            fontFamily: 'Arial',
            marginTop: '10px'
          }}
        >
          Generate New Acronym
        </button>
      </div>
      <SearchResult results={searchResult} hasSearched={hasSearched} />
    </div>
  );
}

export default Home;
