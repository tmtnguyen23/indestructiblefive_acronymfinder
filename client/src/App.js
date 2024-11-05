import React, { useState, useEffect } from 'react';
import Header from './components/Header';

function App() {
  const [data, setData] = useState({ members: [] });
  const [filteredData, setFilteredData] = useState({ members: [] });

  useEffect(() => {
    fetch("/members")
      .then((res) => res.json())
      .then((data) => {
        setData(data);
        setFilteredData(data);
      });
  }, []);

  const handleSearch = (query) => {
    if (query === '') {
      setFilteredData(data);
    } else {
      setFilteredData({
        members: data.members.filter((member) =>
          member.toLowerCase().includes(query.toLowerCase())
        ),
      });
    }
  };

  const handleRandomSearch = () => {
    if (data.members && data.members.length > 0) {
      const randomMember = data.members[Math.floor(Math.random() * data.members.length)];
      setFilteredData({ members: [randomMember] });
    }
  };

  return (
    <div>
      <Header onSearch={handleSearch} onRandomSearch={handleRandomSearch} />
      {(filteredData.members.length === 0) ? (
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
