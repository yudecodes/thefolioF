import React, { useState } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer'; 
import Pic2 from '../assets/pic2-26.jpg'
const Register = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    confirmPass: '',
    birthdate: '',
    bio: '',
    skillLevel: ''
  });

  const [message, setMessage] = useState({ text: '', isError: false });

  const handleChange = (e) => {
    const { id, name, value } = e.target;
   
    setFormData(prev => ({
      ...prev,
      [id || name]: value
    }));
  };

  const validateForm = (e) => {
    e.preventDefault();
    const { password, confirmPass, birthdate, bio } = formData;

    
    if (password !== confirmPass) {
      setMessage({ text: "❌ Passwords do not match!", isError: true });
      return;
    }

    
    if (birthdate) {
      const birthDateObj = new Date(birthdate);
      const today = new Date();
      let age = today.getFullYear() - birthDateObj.getFullYear();
      const m = today.getMonth() - birthDateObj.getMonth();
      if (m < 0 || (m === 0 && today.getDate() < birthDateObj.getDate())) {
        age--;
      }

      if (age < 18) {
        setMessage({ text: "❌ You must be at least 18 years old to register.", isError: true });
        return;
      }
    }

    
    if (bio.trim().length < 10) {
      setMessage({ text: "❌ Please provide at least 10 characters about yourself.", isError: true });
      return;
    }

    setMessage({ text: "Registration successful! Welcome to the team.", isError: false });
    alert("Registration successful! Welcome to the team. ");
  };

  return (
  <> 
      <Header />
    <section>
      <h2>Register for Updates </h2>
      <img src={Pic2} alt="Baseball Practice" style={{ width: '100%', borderRadius: '8px' }} />
      <p style={{ marginTop: '15px' }}>Sign up to receive weekly hitting tips and local game schedules! </p>
      
      <form onSubmit={validateForm}>
        <label>Full Name:</label>
        <input 
          type="text" 
          id="fullName" 
          value={formData.fullName} 
          onChange={handleChange} 
          required 
        />
        
        <label>Email:</label>
        <input 
          type="email" 
          id="email" 
          value={formData.email} 
          onChange={handleChange} 
          required 
        />

        <label>Password:</label>
        <input 
          type="password" 
          id="password" 
          placeholder="At least 8 characters" 
          minLength="8" 
          value={formData.password} 
          onChange={handleChange} 
          required 
        />
        
        <label>Confirm Password:</label>
        <input 
          type="password" 
          id="confirmPass" 
          value={formData.confirmPass} 
          onChange={handleChange} 
          required 
        />

        <label>Birthdate:</label>
        <input 
          type="date" 
          id="birthdate" 
          value={formData.birthdate} 
          onChange={handleChange} 
          required 
        />
        
        <label>Tell us about yourself:</label>
        <textarea 
          id="bio" 
          rows="3" 
          placeholder="Share your baseball experience..." 
          style={{ width: '100%', padding: '10px', margin: '10px 0', border: '1px solid #ddd' }}
          value={formData.bio}
          onChange={handleChange}
        ></textarea>

        {message.text && (
          <p style={{ 
            fontSize: '14px', 
            fontWeight: 'bold', 
            marginBottom: '10px', 
            color: message.isError ? 'red' : 'green' 
          }}>
            {message.text}
          </p>
        )}

        <p>Skill Level: </p>
        <label>
          <input type="radio" name="skillLevel" value="beg" onChange={handleChange} /> Beginner
        </label>
        <label>
          <input type="radio" name="skillLevel" value="int" onChange={handleChange} /> Intermediate
        </label>
        <label>
          <input type="radio" name="skillLevel" value="exp" onChange={handleChange} /> Expert
        </label>
        
        <br /><br />
        <label>
          <input type="checkbox" required /> I agree to the terms. 
        </label>
        <br />
        <button 
          type="submit" 
          style={{ marginTop: '20px', padding: '10px 20px', cursor: 'pointer', background: '#BA0C2F', color: 'white', border: 'none' }}
        >
          Join Now 
        </button>
      </form>
    </section>
          <Footer /> {/* 3. Idagdag ang Footer sa dulo */}
    </>
  );
};

export default Register;