import React from 'react';
import './SearchResult.css'; // Ensure the CSS file for styling is present

function SearchResult({ results, hasSearched }) {
  // Ensure results is treated as an array even if a single item is passed
  const resultArray = Array.isArray(results) ? results : [results];

  return (
    <div className="search-results">
      {/* Check if search has been performed and if resultArray has any items */}
      {hasSearched ? (
        resultArray.length > 0 && resultArray[0] !== '' ? (
          <ul>
            {/* Iterate over the resultArray and render each item as a list element */}
            {resultArray.map((result, index) => (
              <li key={index}>{result}</li> // Use the index as the unique key for each list item
            ))}
          </ul>
        ) : (
          // Display a message when the resultArray is empty and a search has been performed
          <div className="no-results">No results found.</div>
        )
      ) : null}
    </div>
  );
}

export default SearchResult;