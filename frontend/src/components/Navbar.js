
import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';

const Navbar = () => {
  const location = useLocation();

  const [isDark, setIsDark] = useState(
    localStorage.getItem('nightMode') === 'enabled'
  );

  useEffect(() => {
    if (isDark) {
      document.body.classList.add('dark-mode');
      localStorage.setItem('nightMode', 'enabled');
    } else {
      document.body.classList.remove('dark-mode');
      localStorage.setItem('nightMode', 'disabled');
    }
  }, [isDark]);

  return (
    <header
      style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '10px 5%',
        background: '#002D62',
        color: 'white'
      }}
    >
      <div>
        <img src="/assets/pic4-26.png" style={{ height: '60px' }} alt="Logo" />
      </div>

      <h1 style={{ fontSize: '1.8rem', letterSpacing: '2px' }}>
        THE DIAMOND
      </h1>

      <nav
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-end',
          gap: '10px'
        }}
      >
        <button
          onClick={() => setIsDark(!isDark)}
          style={{
            padding: '5px 12px',
            cursor: 'pointer',
            borderRadius: '20px',
            border: '1px solid white',
            background: 'transparent',
            color: 'white'
          }}
        >
          {isDark ? '☀️ Day Mode' : '🌙 Night Mode'}
        </button>

        <ul style={{ display: 'flex', listStyle: 'none', gap: '15px' }}>
          <li>
            <Link
              to="/"
              className={location.pathname === '/' ? 'active' : ''}
              style={{ color: 'white', textDecoration: 'none' }}
            >
              Home
            </Link>
          </li>

          <li>
            <Link
              to="/about"
              className={location.pathname === '/about' ? 'active' : ''}
              style={{ color: 'white', textDecoration: 'none' }}
            >
              About
            </Link>
          </li>

          <li>
            <Link
              to="/contact"
              className={location.pathname === '/contact' ? 'active' : ''}
              style={{ color: 'white', textDecoration: 'none' }}
            >
              Contact
            </Link>
          </li>

          <li>
            <Link
              to="/register"
              className={location.pathname === '/register' ? 'active' : ''}
              style={{ color: 'white', textDecoration: 'none' }}
            >
              Register
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Navbar;