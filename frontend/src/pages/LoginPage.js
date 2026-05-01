import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const LoginPage = () => {
  const { login } = useAuth();
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      const user = await login(email, password);
      // Redirect based on role
      if (user.role === 'admin') {
        navigate('/admin');
      } else {
        navigate('/home');
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Invalid email or password.');
    }
  };

  return (
    <div style={{ maxWidth: '400px', margin: '60px auto', padding: '30px',
      background: '#f9f9f9', borderRadius: '10px', boxShadow: '0 2px 10px rgba(0,0,0,0.1)' }}>
      <h2 style={{ textAlign: 'center', color: '#002D62' }}>Login</h2>

      {error && (
        <div style={{ background: '#BA0C2F', color: 'white', padding: '10px',
          borderRadius: '5px', marginBottom: '15px', textAlign: 'center' }}>
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
        <div>
          <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            style={{ width: '100%', padding: '10px', borderRadius: '5px',
              border: '1px solid #ccc', boxSizing: 'border-box' }}
          />
        </div>

        <div>
          <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            style={{ width: '100%', padding: '10px', borderRadius: '5px',
              border: '1px solid #ccc', boxSizing: 'border-box' }}
          />
        </div>

        <button type="submit" style={{
          background: '#002D62', color: 'white', padding: '12px',
          border: 'none', borderRadius: '5px', cursor: 'pointer', fontSize: '1rem'
        }}>
          Login
        </button>
      </form>

      <p style={{ textAlign: 'center', marginTop: '15px' }}>
        Don't have an account? <Link to="/register" style={{ color: '#002D62' }}>Register</Link>
      </p>
    </div>
  );
};

export default LoginPage;