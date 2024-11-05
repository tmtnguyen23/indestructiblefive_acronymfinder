import React, { useState } from 'react';
import './SearchBox.css';

function SearchBox({ onSearch, onRandomSearch, onAddAcronym }) {
  const [query, setQuery] = useState('');
  const [meaning, setMeaning] = useState('');

  const handleSearch = () => {
    onSearch(query); // Call the search function with the current query
  };

  const handleAddAcronym = () => {
    onAddAcronym(query, meaning); // Add a new acronym with its meaning
    setQuery(''); // Clear the input fields after adding
    setMeaning('');
  };

  return (
    <div className="search-box">
      <input
        type="text"
        placeholder="Search acronym..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      <input
        type="text"
        placeholder="Add meaning..."
        value={meaning}
        onChange={(e) => setMeaning(e.target.value)}
      />

      <button onClick={handleSearch}>Search</button>
      <button onClick={onRandomSearch}>Random Acronym</button>
      <button onClick={handleAddAcronym}>Add Acronym</button>
    </div>
  );
}

export default SearchBox;