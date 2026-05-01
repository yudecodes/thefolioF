import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import Pic from '../assets/pic4-26.png';

const Navbar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { user, logout } = useAuth();

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

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const linkStyle = { color: 'white', textDecoration: 'none' };
  const isActive = (path) => location.pathname === path ? 'active' : '';

  return (
    <header style={{
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: '10px 5%',
      background: '#002D62',
      color: 'white'
    }}>
      {/* Logo */}
      <div>
        <img src={Pic} style={{ height: '60px' }} alt="Logo" />
      </div>

      {/* Title */}
      <h1 style={{ fontSize: '1.8rem', letterSpacing: '2px' }}>
        THE DIAMOND
      </h1>

      {/* Nav */}
      <nav style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '10px' }}>
        <button
          onClick={() => setIsDark(!isDark)}
          style={{
            padding: '5px 12px', cursor: 'pointer', borderRadius: '20px',
            border: '1px solid white', background: 'transparent', color: 'white'
          }}
        >
          {isDark ? '☀️ Day Mode' : '🌙 Night Mode'}
        </button>

        <ul style={{ display: 'flex', listStyle: 'none', gap: '15px', margin: 0, padding: 0 }}>
          {/* Always visible */}
          <li><Link to="/home" className={isActive('/home')} style={linkStyle}>Home</Link></li>
          <li><Link to="/about" className={isActive('/about')} style={linkStyle}>About</Link></li>

          {!user && (
            <>
              {/* Logged out only */}
              <li><Link to="/contact" className={isActive('/contact')} style={linkStyle}>Contact</Link></li>
              <li><Link to="/register" className={isActive('/register')} style={linkStyle}>Register</Link></li>
              <li><Link to="/login" className={isActive('/login')} style={linkStyle}>Login</Link></li>
            </>
          )}

          {user && (
            <>
              {/* Logged in — all roles */}
              <li><Link to="/home" className={isActive('/feed')} style={linkStyle}>Feed</Link></li>
              <li><Link to="/profile" className={isActive('/profile')} style={linkStyle}>Profile</Link></li>

              {/* Admin only */}
              {user.role === 'admin' && (
                <li><Link to="/admin" className={isActive('/admin')} style={linkStyle}>Admin</Link></li>
              )}

              <li>
                <button onClick={handleLogout} style={{
                  background: '#BA0C2F', color: 'white', border: 'none',
                  padding: '5px 12px', borderRadius: '5px', cursor: 'pointer'
                }}>
                  Logout
                </button>
              </li>
            </>
          )}
        </ul>
      </nav>
    </header>
  );
};

export default Navbar;