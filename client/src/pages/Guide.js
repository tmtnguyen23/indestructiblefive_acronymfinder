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


      <h2>Page Statistics</h2>
      
      <div className="guide-section">
        <h3>Statistics Overview</h3>
        <p>Our statistics page provides real-time insights into website usage and popular searches.</p>
      </div>

      <div className="important-note">
        <p>You can access the statistics page by clicking "Stats" in the navigation menu.</p>
      </div>

      <h3>Visitor Counter</h3>
      <p>The visitor counter shows how many times our website has been accessed:</p>
      <div className="example-search">
        <div className="example-output">
          <span className="example-label">Example Display:</span>
          <code>Total Visitors: 42</code>
        </div>
      </div>

      <h3>Top Searched Acronyms</h3>
      <p>Below the visitor counter, you'll find a table showing:</p>
      <ul>
        <li>The 5 most frequently searched acronyms</li>
        <li>All known meanings for each acronym</li>
        <li>Number of times each acronym has been searched</li>
      </ul>

      <div className="example-search">
        <h4>Example Table Entry</h4>
        <div className="example-output">
          <code>
            Acronym: 2FA
            Meaning: Two Factor Authentication
            Searches: 5
          </code>
        </div>
      </div>

      <div className="tip">
        <p>Pro tip: The statistics update automatically whenever someone searches for an acronym!</p>
      </div>

      <p>Try our <code>random acronym</code> generator for daily learning!</p>
    </div>
  );
}

export default Guide;