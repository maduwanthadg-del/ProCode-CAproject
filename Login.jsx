import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './Login.css'; // Make sure to import the CSS file

export default function Login() {
  const [credentials, setCredentials] = useState({ username: '', password: '' });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(''); // Clear previous errors
    
    try {
      const res = await axios.post('http://localhost:5000/api/auth/login', credentials);
      if (res.data.success) {
        // Store user role (Police/Hospital) for the dashboard
        localStorage.setItem('user', JSON.stringify(res.data.user));
        navigate('/dashboard');
      }
    } catch (err) {
      // Look for a specific backend message, otherwise use a default
      setError(err.response?.data?.message || "Unauthorized Access: Invalid Credentials");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-wrapper">
      <div className="login-card">
        
        <div className="login-header">
          <h2 className="login-title">Authority Login</h2>
          <p className="login-subtitle">Sri Lanka Emergency Response System</p>
        </div>
        
        {/* Clean Error Banner instead of standard browser alert */}
        {error && <div className="error-banner">{error}</div>}
        
        <form onSubmit={handleLogin} className="login-form">
          <input 
            type="text" 
            name="username"
            placeholder="Username / Badge ID" 
            className="form-input" 
            value={credentials.username}
            onChange={handleChange}
            required
            disabled={loading}
          />
          <input 
            type="password" 
            name="password"
            placeholder="Secure Password" 
            className="form-input" 
            value={credentials.password}
            onChange={handleChange}
            required
            disabled={loading}
          />
          <button type="submit" className="btn-submit" disabled={loading}>
            {loading ? 'AUTHENTICATING...' : 'ACCESS COMMAND CENTER'}
          </button>
        </form>
        
        <div className="login-footer">
          <span className="lock-icon">🔒</span>
          <p>Restricted to Police and Hospital personnel only.</p>
        </div>

      </div>
    </div>
  );
}