import React, { useState } from 'react';
import 'src/SearchPopup.css';

function SearchPopup({ onSearch, onRandomSearch }) {
  const [isVisible, setIsVisible] = useState(false);
  const [query, setQuery] = useState('');

  const toggleSearch = () => setIsVisible(!isVisible);

  const handleSearch = () => {
    onSearch(query); // Call the search function with the current query
  };

  return (
    <>
      <button onClick={toggleSearch}>Search</button>
      {isVisible && (
        <div className="search-popup">
          <input
            type="text"
            placeholder="Search..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          <button onClick={handleSearch}>Go</button>
          <button onClick={onRandomSearch}>Random Search</button> {/* Random Search button */}
          <button onClick={toggleSearch}>Close</button>
        </div>
      )}
    </>
  );
}

export default SearchPopup;
