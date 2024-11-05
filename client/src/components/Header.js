import React from 'react';
import SearchPopup from './SearchPopup'; // Import the SearchPopup component

function Header({ onSearch, onRandomSearch }) {
  return (
    <header className="fnbo-header">
      <div className="fnbo-logo">
        <h1>FNBO</h1>
      </div>
      <nav className="fnbo-nav">
        <a href="#home">Home</a>
        <a href="#about">About</a>
        <a href="#services">Services</a>
        <a href="#contact">Contact</a>
        <SearchPopup onSearch={onSearch} onRandomSearch={onRandomSearch} />
      </nav>
    </header>
  );
}

export default Header;
