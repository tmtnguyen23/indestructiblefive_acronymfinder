import React, { useState} from 'react';
import SearchBox from './components/SearchBox';
import Header from './components/Header';

function App() {
  
  const [searchResult, setSearchResult] = useState('');
  const [randomAcronym, setRandomAcronym] = useState('');

  const handleSearch = (query) => {
    fetch(`/search_acronym?acronym=${query}`)
      .then((res) => res.json())
      .then((result) => {
        if (result.error) {
          setSearchResult(result.error);
        } else if (result.message) {
          setSearchResult(result.message);
        } else {
          setSearchResult(result.result.join(', '));
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
        setRandomAcronym(result.message);
      })
      .catch((error) => {
        setRandomAcronym("An error occurred while fetching a random acronym.");
        console.error(error);
      });
  };

  const handleAddAcronym = (acronym, meaning) => {
    fetch('/add_acronym?suggestion=${acronym}&meaning=${meaning}')
      .then((res) => res.json())
      .then((response) => {
        alert(response.message);
      })
      .catch((error) => {
        alert("An error occurred while adding the acronym.");
        console.error(error);
      });
  };

  return (
    <div>
      <Header/>
      
      <SearchBox
        onSearch={handleSearch}
        onRandomSearch={handleRandomSearch}
        onAddAcronym={handleAddAcronym}
      />
      
      <div>
        <h2>Search Result:</h2>
        <p>{searchResult}</p>
      </div>
      <div>
        <h2>Random Acronym:</h2>
        <p>{randomAcronym}</p>
      </div>
      <footer>Designed by Indestructible Five</footer>
    </div>
  );
}

export default App;