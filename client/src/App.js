import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Header from './components/Header';
import Home from './pages/Home';
import UserGuide from './pages/Guide';
import AddAcronym from './pages/Add';
import RandomAcronym from './pages/Random';

function App() {
  
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/guide" element={<UserGuide />} />
        <Route path="/add_acronym" element={<AddAcronym />} />
        <Route path="/randomize" element={<RandomAcronym />} />
      </Routes>
    </Router>
  );
}

export default App;