// src/pages/About.js
import React, { useState } from "react";
import Header from '../components/Header';
import Footer from '../components/Footer';
import Pic3 from '../assets/pic3-26.jpg'
const About = () => {
  const [answers, setAnswers] = useState({});
  const [score, setScore] = useState(null);

  // function para i-update ang sagot
  const handleChange = (question, value) => {
    setAnswers({ ...answers, [question]: value });
  };

  const handleCheckQuiz = () => {
    // Tamang sagot base sa about.html mo
    const correctAnswers = {
      q1: "9",
      q2: "90",
      q3: "4",
      q4: "babe",
      q5: "6"
    };

    let currentScore = 0;
    Object.keys(correctAnswers).forEach((key) => {
      if (answers[key] === correctAnswers[key]) {
        currentScore++;
      }
    });

    setScore(currentScore);
  };

  return (
    <>
      <Header />
      <div className="home-container">
        <section className="quiz-container">
          <h2>Baseball Trivia Quiz</h2>
          <img src={Pic3} alt="HardBalls" style={{ width: '100%', borderRadius: '8px' }} />
          <p>Test your knowledge about the game!</p>
          <hr /><br />

          {/* Question 1 */}
          <div className="quiz-question">
            <p>1. How many players are on the field for one team?</p>
            <label>
              <input type="radio" name="q1" value="9" onChange={() => handleChange('q1', '9')} /> 9
            </label>
            <br />
            <label>
              <input type="radio" name="q1" value="10" onChange={() => handleChange('q1', '10')} /> 10
            </label>
          </div>

          {/* Question 2 */}
          <div className="quiz-question">
            <p>2. How many feet are between the bases?</p>
            <label>
              <input type="radio" name="q2" value="80" onChange={() => handleChange('q2', '80')} /> 80 ft
            </label>
            <br />
            <label>
              <input type="radio" name="q2" value="90" onChange={() => handleChange('q2', '90')} /> 90 ft
            </label>
          </div>

          {/* Question 3 */}
          <div className="quiz-question">
            <p>3. How many balls result in a walk?</p>
            <label>
              <input type="radio" name="q3" value="3" onChange={() => handleChange('q3', '3')} /> 3
            </label>
            <br />
            <label>
              <input type="radio" name="q3" value="4" onChange={() => handleChange('q3', '4')} /> 4
            </label>
          </div>

          <br />
          <button 
            onClick={handleCheckQuiz}
            style={{ 
              padding: '10px 20px', 
              backgroundColor: 'var(--header-bg)', 
              color: 'white', 
              border: 'none', 
              borderRadius: '5px',
              cursor: 'pointer' 
            }}
          >
            Check Score
          </button>

          {score !== null && (
            <div id="quiz-result" style={{ marginTop: '20px', fontSize: '1.2rem', fontWeight: 'bold' }}>
              Final Score: {score} / 3
              {score === 5 ? " 🏆 Hall of Famer!" : score >= 3 ? " ⚾ All-Star!" : " 🧢 Rookie Season"}
            </div>
          )}
        </section>
      </div>
      <Footer />
    </> // <--- Eto yung nawawalang fragment closer
  );
};

export default About;