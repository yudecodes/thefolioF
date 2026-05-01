import React, { useState, useEffect } from 'react';
import './Splash.css';
import Pic from '../assets/pic4-26.png';

const SplashPage = ({ onComplete }) => {
  const [dots, setDots] = useState('...');

  useEffect(() => {
    const dotInterval = setInterval(() => {
      setDots(prev => (prev.length >= 3 ? '' : prev + '.'));
    }, 500);

    const timer = setTimeout(() => {
      onComplete();
    }, 3000); // Adjust duration as needed

    // Proper cleanup
    return () => {
      clearInterval(dotInterval);
      clearTimeout(timer);
    };
  }, [onComplete]);

  return (
    <div className="loader-container">
      <div className="logo-float">
        <img src={Pic} alt="Logo" width="200px" align="center"/>
      </div>
      <h1>The Diamond Dream</h1>
      <div className="spinner"></div>
      <div className="loading-text">
        Loading<span className="dots-area">{dots}</span>
      </div>
    </div>
  );
};

export default SplashPage;
