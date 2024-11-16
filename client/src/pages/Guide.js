import React from 'react';
import './Guide.css';

function UserGuide() {

  return (
    <div class="guide-container">
      <h1>Welcome to Acronym Finder</h1>

      <p>This guide will help you understand how to navigate through the pages and utilize the key features efficiently.</p>

      <h3>Home Page</h3>
      <p>Purpose: The central hub where you can search for acronyms.</p>
      <p>How to Use:</p>
      <p>
        Use the search bar at the top to enter an acronym and click the "Search" button.
        Below the search bar, you will see the "Acronym of the day" displayed.
      </p>

      <h3>Add Acronym</h3>
      <p>Purpose: Allows users to contribute to expanding our acronyms database.</p>
      <p>How to Use:</p>
      <p>
        Fill out the form with the acronym and its meaning.
        Click the "Submit" button to add it to the database.
      </p>

      <h3>Random Acronym</h3>
      <p>Purpose: Want to become the acronym expert? You should come to this page.</p>
      <p>How to Use:</p>
      <p>Click 'Query' and you will see an acronym along with their meaning.</p>

      <p>Enjoy exploring and discovering new acronyms with ease!</p>
    </div>
    );
  

}

export default UserGuide;