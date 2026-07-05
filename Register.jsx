import React, { useState } from 'react';
import axios from 'axios';

export default function Register() {
  const [regData, setRegData] = useState({ username: '', password: '', role: 'Police' });

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5000/api/auth/register', regData);
      alert("Account Created! You can now login.");
    } catch (err) {
      alert("Registration failed: " + err.response.data.message);
    }
  };

  return (
    <div className="form-container">
      <div className="card">
        <h3>Create Authority Account</h3>
        <form onSubmit={handleRegister}>
          <input placeholder="Username" onChange={e => setRegData({...regData, username: e.target.value})} className="choice-btn" style={{width:'100%', marginBottom:'10px'}} />
          <input type="password" placeholder="Password" onChange={e => setRegData({...regData, password: e.target.value})} className="choice-btn" style={{width:'100%', marginBottom:'10px'}} />
          <select onChange={e => setRegData({...regData, role: e.target.value})} className="choice-btn" style={{width:'100%', marginBottom:'20px'}}>
            <option value="Police">Police</option>
            <option value="Hospital">Hospital</option>
          </select>
          <button type="submit" className="btn-submit">REGISTER</button>
        </form>
      </div>
    </div>
  );
}