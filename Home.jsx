import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import LiveSupportButton from './LiveSupportButton';
import Call119 from '../call119';
import './Home.css'; 

export default function Home() {
  const navigate = useNavigate();

  // State to simulate live updating numbers
  const [incidents, setIncidents] = useState(3847);
  const [units, setUnits] = useState(5203);

  // Simulate real-time updates
  useEffect(() => {
    const interval = setInterval(() => {
      // 50% chance to update numbers every 4 seconds to look organic
      if (Math.random() > 0.5) {
        setIncidents(prev => prev + 1);
        setUnits(prev => prev + Math.floor(Math.random() * 3) + 1);
      }
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="home-wrapper">
      <div className="home-container">
        
        {/* Main Brand Header */}
        <header className="main-header">
          <div className="brand">
            <h1 className="brand-title">A.E.S.S.</h1>
            <p className="brand-subtitle">Accident Emergency Service Sri Lanka</p>
          </div>
          <div className="emergency-actions">
            <Call119 />
            <LiveSupportButton />
          </div>
        </header>

        {/* Live Dispatch Ticker */}
        <div className="ticker-wrapper">
          <div className="ticker-label">
            <span className="live-dot"></span> LIVE FEED
          </div>
          <div className="ticker-container">
            <div className="ticker-text">
              ⚠️ Unit 4 dispatched to Colombo 03 — 🚑 Ambulance en route to Kandy road — 🚓 Traffic collision reported in Galle — ✅ Incident #8892 resolved — 🚨 High priority medical emergency in Nugegoda...
            </div>
          </div>
        </div>

        {/* Live Statistics Dashboard */}
        <section className="stats-section">
          <div className="stats-header">
            <h2><span className="siren-icon">🚨</span> Live Emergency Network</h2>
            <p className="system-status">
              <span className="status-dot"></span> System Status: Active & Monitoring
            </p>
          </div>

          <div className="stats-grid">
            <div className="stat-card live-card">
              <span className="stat-icon pulse-icon">🚨</span>
              <div className="stat-info">
                <strong>Incidents Responded To</strong>
                <div className="stat-value counter-update">{incidents.toLocaleString()}</div>
                <small className="stat-trend trend-up">+12% from last year</small>
              </div>
            </div>
            
            <div className="stat-card">
              <span className="stat-icon">✅</span>
              <div className="stat-info">
                <strong>Successful Interventions</strong>
                <div className="stat-value">2,156</div>
                <small className="stat-trend trend-up">Response improved 23%</small>
              </div>
            </div>

            <div className="stat-card live-card">
              <span className="stat-icon">🛡️</span>
              <div className="stat-info">
                <strong>Units Deployed</strong>
                <div className="stat-value counter-update">{units.toLocaleString()}</div>
                <small className="stat-trend">Avg. 8 min response</small>
              </div>
            </div>

            <div className="stat-card">
              <span className="stat-icon">📈</span>
              <div className="stat-info">
                <strong>Response Efficiency</strong>
                <div className="stat-value">31%</div>
                <small className="stat-trend">Compared to last year</small>
              </div>
            </div>
          </div>
        </section>

        {/* Action Portals */}
        <div className="action-portals">
          <div className="portal-card emergency-portal">
            <div className="portal-content">
              <h3>Report an Emergency</h3>
              <p>Witnessed an incident? Send an instant alert with your location to the nearest medical and law enforcement teams. Every second counts.</p>
            </div>
            <button className="btn-portal btn-red" onClick={() => navigate('/report')}>
              🚨 REPORT INCIDENT NOW
            </button>
          </div>

          <div className="portal-card command-portal">
            <div className="portal-content">
              <h3>Command Center Access</h3>
              <p>Secure portal for authorized personnel. Monitor real-time incident streams, coordinate active responses, and manage field deployments.</p>
            </div>
            <button className="btn-portal btn-blue" onClick={() => navigate('/login')}>
              🛡️ OFFICER LOGIN
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}
