import React from 'react';
import { Link } from 'react-router-dom';
import logo from './fnbo-logo.png'
import './Header.css';

function Header() {

  return (
    <header className="fnbo-header">
      <div className="fnbo-logo">
        <img src={logo} alt="FNBO Logo" className="fnbo-logo-image" />
        <h1>FNBO</h1>
      </div>
      <nav className="fnbo-nav">
        <Link to="/">Home</Link>
        <Link to="/guide">User Guide</Link>
        <Link to="/stats">Page Stats</Link>
      </nav>
    </header>
  );
}

export default Header;
