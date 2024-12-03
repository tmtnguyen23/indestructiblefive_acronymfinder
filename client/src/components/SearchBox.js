import React, { useState } from 'react';
import './SearchBox.css';

function SearchBox({ onSearch }) {
  const [query, setQuery] = useState('');

  const handleSearch = () => {
    onSearch(query); // Call the search function with the current query
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <div className="search-box">
      <input
        type="text"
        placeholder="Search acronym..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        onKeyPress={handleKeyPress}
      />

      <button onClick={handleSearch}>Search</button>
    </div>
  );
}

export default SearchBox;