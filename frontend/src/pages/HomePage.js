import React from 'react';
import { useNavigate } from 'react-router-dom'; 
import Footer from '../components/Footer';
import Pic1 from '../assets/pic1-26.jpg'

const Home = () => {
  const navigate = useNavigate();

  return (
    <> 
      <div className="home-container">
        {/* Hero Section */}
        <section style={{ textAlign: 'center', backgroundColor: 'var(--header-bg)', color: 'white', padding: '50px 20px' }}>
          <h2 style={{ fontSize: '2.5rem', marginBottom: '10px' }}>Welcome to The Diamond</h2>
          <img src={Pic1} alt="Baseball Field" style={{ width: '100%', borderRadius: '8px' }} />
          <p style={{ fontSize: '1.2rem', opacity: 0.9 }}>Where the game never truly ends.</p>
        </section>

        {/* Main Content */}
        <section>
          <h3>The Spirit of the Game</h3>
          <p>
            Baseball is more than just a sport; it's a "game within the game." 
            Unlike other sports with a ticking clock, baseball is measured by outs and innings. 
            This creates a unique tension where the game isn't over until the final strike is recorded.
          </p>
          <p style={{ marginTop: '15px' }}>
            Explore our site to learn about the mechanics of the game, test your knowledge with our quiz, 
            or join our community for weekly hitting tips and schedules.
          </p>
        </section>

        {/* Features Grid */}
        <section>
          <h3>Why We Love Baseball</h3>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '20px', marginTop: '20px' }}>
            <div className="feature-card">
              <h4>Strategy</h4>
              <p>The mental chess match between the pitcher and the batter on every single pitch.</p>
            </div>
            <div className="feature-card">
              <h4>History</h4>
              <p>A rich legacy dating back to the 19th century, preserved in every ballpark.</p>
            </div>
            <div className="feature-card">
              <h4>Sensory</h4>
              <p>The smell of the grass and the unmistakable sound of a wooden bat hitting a fastball.</p>
            </div>
          </div>
        </section>

        {/* Call to Action */}
        <section style={{ textAlign: 'center', background: 'transparent', boxShadow: 'none' }}>
          <button 
            onClick={() => navigate('/register')} // 2. useNavigate: Mas mabilis kaysa window.location
            style={{ 
              padding: '15px 30px', 
              fontSize: '1.1rem', 
              backgroundColor: 'var(--accent-red)', 
              color: 'white', 
              border: 'none', 
              borderRadius: '50px', 
              cursor: 'pointer',
              transition: 'transform 0.2s'
            }}
            onMouseOver={(e) => e.target.style.transform = 'scale(1.05)'}
            onMouseOut={(e) => e.target.style.transform = 'scale(1)'}
          >
            Join the Team Today
          </button>
        </section>
      </div>

      <Footer /> 
    </>
  );
};

export default Home;