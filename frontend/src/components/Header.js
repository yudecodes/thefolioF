import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import Pic from '../assets/pic4-26.png';

const Header = () => {
  const [isDarkMode, setIsDarkMode] = useState(localStorage.getItem('nightMode') === 'enabled');

  useEffect(() => {
    if (isDarkMode) {
      document.body.classList.add('dark-mode');
      localStorage.setItem('nightMode', 'enabled');
    } else {
      document.body.classList.remove('dark-mode');
      localStorage.setItem('nightMode', 'disabled');
    }
  }, [isDarkMode]);

  return (
    <header style={headerStyle}>
      {/* Logo */}
      <div style={flexStart}>
        <img src={Pic} style={{ height: '60px' }} alt="Logo" />
      </div>

      {/* Title */}
      <div style={flexCenter}>
        <h1 style={titleStyle}>THE DIAMOND</h1>
      </div>

      {/* Navigation */}
      <nav style={navStyle}>
        <button 
          onClick={() => setIsDarkMode(!isDarkMode)} 
          style={toggleStyle}
        >
          {isDarkMode ? '☀️ Day Mode' : '🌙 Night Mode'}
        </button>

        <ul style={ulStyle}>
          <li>
            <NavLink 
              to="/home" 
              className={({ isActive }) => (isActive ? 'active' : '')}
              style={linkStyle}
            >
              Home
            </NavLink>
          </li>
          <li>
            <NavLink 
              to="/about" 
              className={({ isActive }) => (isActive ? 'active' : '')}
              style={linkStyle}
            >
              About
            </NavLink>
          </li>
          <li>
            <NavLink 
              to="/contact" 
              className={({ isActive }) => (isActive ? 'active' : '')}
              style={linkStyle}
            >
              Contact
            </NavLink>
          </li>
          <li>
            <NavLink 
              to="/register" 
              className={({ isActive }) => (isActive ? 'active' : '')}
              style={linkStyle}
            >
              Register
            </NavLink>

        
          </li>
          <li>
            <NavLink 
              to="/login" 
              className={({ isActive }) => (isActive ? 'active' : '')}
              style={linkStyle}
            >
              Login
            </NavLink>
            </li>
        </ul>
      </nav>
    </header>
  );
};

// --- Styles ---
const headerStyle = {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  padding: '10px 5%',
  background: '#002D62',
  color: 'white'
};

const flexStart = { flex: 1, display: 'flex', justifyContent: 'flex-start' };
const flexCenter = { flex: 1, text_align: 'center' };
const titleStyle = { margin: 0, fontSize: '1.8rem', letterSpacing: '2px', textAlign: 'center' };

const navStyle = {
  flex: 1,
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'flex-end',
  gap: '10px'
};

const toggleStyle = {
  padding: '5px 12px',
  cursor: 'pointer',
  borderRadius: '20px',
  border: '1px solid white',
  background: 'transparent',
  color: 'white',
  fontSize: '0.9rem'
};

const ulStyle = { display: 'flex', listStyle: 'none', margin: 0, padding: 0, gap: '15px' };
const linkStyle = { color: 'white', textDecoration: 'none' };

export default Header;