import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function Login() {
  const [credentials, setCredentials] = useState({ username: '', password: '' });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:5000/api/auth/login', credentials);
      if (res.data.success) {
        // Save user info to keep them logged in
        localStorage.setItem('user', JSON.stringify(res.data.user));
        navigate('/dashboard');
      }
    } catch (err) {
      setError(err.response?.data?.message || "Login Failed");
    }
  };

  return (
    <div className="form-container">
      <div className="card" style={{ marginTop: '50px' }}>
        <h2 style={{ color: 'var(--primary-red)', textAlign: 'center' }}>Authority Login</h2>
        {error && <p style={{ color: 'red', textAlign: 'center', fontSize: '14px' }}>{error}</p>}
        
        <form onSubmit={handleLogin}>
          <div style={{ marginBottom: '15px' }}>
            <label>Badge ID / Username</label>
            <input 
              type="text" 
              className="choice-btn" 
              style={{ width: '100%', textAlign: 'left' }}
              onChange={(e) => setCredentials({ ...credentials, username: e.target.value })}
              required 
            />
          </div>
          <div style={{ marginBottom: '20px' }}>
            <label>Password</label>
            <input 
              type="password" 
              className="choice-btn" 
              style={{ width: '100%', textAlign: 'left' }}
              onChange={(e) => setCredentials({ ...credentials, password: e.target.value })}
              required 
            />
          </div>
          <button type="submit" className="btn-submit">LOGIN TO COMMAND CENTER</button>
        </form>
      </div>
    </div>
  );
}