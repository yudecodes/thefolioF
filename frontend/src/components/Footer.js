import React from 'react';

const Footer = () => {
  return (
    <footer style={footerStyle}>
      <p>&copy; {new Date().getFullYear()} Baseball Portfolio Project</p>
      <div style={subTextStyle}>
        Dedicated to the "game within the game."
      </div>
    </footer>
  );
};

// --- Styles ---
const footerStyle = {
  textAlign: 'center',
  padding: '2rem',
  background: '#333333', // Ibinase sa iyong style.css (--footer-bg)
  color: 'white',
  marginTop: '40px',
  width: '100%'
};

const subTextStyle = {
  fontSize: '0.8rem',
  marginTop: '5px',
  opacity: 0.7
};

export default Footer;