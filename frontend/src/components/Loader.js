import React, { useState, useEffect } from 'react';
import './Loader.css'; 

const Loader = ({ onFinish }) => {
  const [dots, setDots] = useState('...');

  useEffect(() => {
    
    const dotInterval = setInterval(() => {
      setDots(prev => (prev.length >= 3 ? '' : prev + '.'));
    }, 500);

    
    const timer = setTimeout(() => {
      onFinish();
    }, 2500);

    return () => {
      clearInterval(dotInterval);
      clearTimeout(timer);
    };
  }, [onFinish]);

  return (
    <div className="loader-container">
      <div className="logo-animation">
        <img src="assets/pic4-26.png" width="200px" alt="Diamond Logo" />
      </div>
      <h1>The Diamond Dream</h1>
      <div className="spinner"></div>
      <div className="loading-text">
        Loading<span className="dots-container">{dots}</span>
      </div>
    </div>
  );
};

export default Loader;