import React, { useState, useEffect } from 'react';
import SearchPopup from './components/SearchPopup.js';

function App() {
  const [data, setData] = useState([{}]);
  const [filteredData, setFilteredData] = useState([{}]);

  useEffect(() => {
    fetch("/members")
      .then((res) => res.json())
      .then((data) => {
        setData(data);
        setFilteredData(data); // Initialize filtered data with the full data set
      });
  }, []);

  // Filter function
  const handleSearch = (query) => {
    if (query === '') {
      setFilteredData(data); // Reset to full data when query is empty
    } else {
      setFilteredData({
        members: data.members.filter((member) =>
          member.toLowerCase().includes(query.toLowerCase())
        )
      });
    }
  };

  // Random Search function
  const handleRandomSearch = () => {
    if (data.members && data.members.length > 0) {
      const randomMember = data.members[Math.floor(Math.random() * data.members.length)];
      setFilteredData({ members: [randomMember] }); // Set filtered data to the random member
    }
  };

  return (
    <div>
      <SearchPopup onSearch={handleSearch} onRandomSearch={handleRandomSearch} /> {/* Pass both functions */}
      
      {(typeof filteredData.members === 'undefined') ? (
        <p>Loading...</p>
      ) : (
        filteredData.members.map((member, i) => (
          <p key={i}>{member}</p>
        ))
      )}
    </div>
  );
}

export default App;
