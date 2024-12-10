import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Header from './components/Header';
import Home from './pages/Home';
import UserGuide from './pages/Guide';
import Stats from './pages/Stats';
import Footer from './components/Footer';
import TopAcronyms from './components/TopAcronyms'; // Import the Top Acronyms page/component

function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/guide" element={<UserGuide />} />
        <Route path="/stats" element={<Stats />} />
        <Route path="/top-acronyms" element={<TopAcronyms />} /> {/* New Route */}
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
