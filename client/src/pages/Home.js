import React, { useState, useEffect } from 'react';
import SearchBox from '../components/SearchBox';
import SearchResult from '../components/SearchResult';

function Home( ) {
  const [searchResult, setSearchResult] = useState('');
  const [hasSearched, setHasSearched] = useState(false); // New state to track if a search was made
  const [randomWord, setRandomWord] = useState('');

  useEffect(() => {
    // Call handleRandomSearch when the component mounts
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
        setSearchResult("An error occurred while searching for the acronym.");
        console.error(error);
      });
  };

  const handleRandomSearch = () => {
    fetch('/random_acronym')
      .then((res) => res.json())
      .then((result) => {
        setRandomWord(result.result);
      })
      .catch((error) => {
        setRandomWord("An error occurred while fetching a random acronym.");
        console.error(error);
      });
  };

  return (
    <div>
      <div style={{ textAlign: 'center' }}>
        <h2 style={{ fontSize: '30px', color: '#006747', fontStyle: 'italic', fontFamily: 'Arial' }}>
          Acronym Finder
        </h2>
      </div>

      <SearchBox onSearch={handleSearch} />
      <div style={{ textAlign: 'center' }}>
        <p style={{ fontSize: '16px', color: '#006747', fontStyle: 'italic', fontFamily: 'Arial' }}>
          Your lucky acronym today is {randomWord}
        </p>
      </div>
      <SearchResult results={searchResult} hasSearched={hasSearched} />
    </div>
  );
}

export default Home;