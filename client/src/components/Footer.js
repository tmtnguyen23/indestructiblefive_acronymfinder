import React from 'react';
import footer from './cropped.png'
import './Footer.css'; 

const Footer = () => {
  return (
    <footer className="footer">
      <img 
        src={footer}
        alt-text = "all-right-reserved"
        className="footer-image"
      />
    </footer>
  );
};

export default Footer;