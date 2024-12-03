import React from 'react';
import './Guide.css';

function Guide() {
  return (
    <div className="guide-container">
      <h1>User Guide</h1>
      
      <div className="guide-section">
        <h2>Getting Started</h2>
        <p>Welcome to the Acronym Finder! This guide will help you make the most of our tool.</p>
      </div>

      <h2>Search Features</h2>
      <div className="important-note">
        <p>To search for an acronym, simply type it into the search box and click "Search".</p>
      </div>

      <h3>Basic Search</h3>
      <p>Enter any acronym to find its meaning. For example: "HTML", "2FA", "DAC".</p>

      <div className="tip">
        <p>Pro tip: You can also click "Generate New Acronym" to get a random acronym!</p>
      </div>

      <h3>Search Results</h3>
      <p>Results will show:</p>
      <ul>
        <li>The full meaning of the acronym</li>
        <li>Alternative meanings if they exist</li>
      </ul>

      <div className="example-search">
        <h4>Example Search</h4>
        <div className="example-input">
          <span className="example-label">Search Input:</span>
          <code>DAC</code>
        </div>
        
        <div className="example-output">
          <span className="example-label">Results:</span>
          <ul>
            <li>
              <strong>Primary Meanings:</strong>
              <ul>
                <li>Digital Activity Customers</li>
                <li>Digital To Analog Converter</li>
              </ul>
            </li>
          </ul>
        </div>
      </div>


      <h2>Additional Features</h2>
      <p>Try our <code>random acronym</code> generator for daily learning!</p>
    </div>
  );
}

export default Guide;