import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Report from './pages/Report';
import Login from './pages/Login'; // Fix: Ensure this is imported
import Dashboard from './pages/Dashboard';
import Footer from './footer';
import Header from './pages/Header';
import './App.css';

export default function App() {
  return (
    <>
      <Header />
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/report" element={<Report />} />
          <Route path="/login" element={<Login />} /> {/* Fix: Points to Login page */}
          <Route path="/dashboard" element={<Dashboard />} />
        </Routes>
      </Router>
      <Footer />
    </>
  );
}