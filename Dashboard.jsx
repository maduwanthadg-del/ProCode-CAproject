import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import io from 'socket.io-client';
import StatsBar from './nav';

const API = import.meta.env.VITE_API_URL || 'http://localhost:5000';

function severityClass(severity) {
  if (severity === 'Critical') return 'critical';
  if (severity === 'Major')    return 'major';
  return 'minor';
}

function badgeClass(status) {
  if (status === 'Dispatched') return 'badge badge-dispatched';
  if (status === 'Resolved')   return 'badge badge-resolved';
  return 'badge badge-pending';
}

export default function Dashboard() {
  const navigate = useNavigate();
  const [alerts, setAlerts]   = useState([]);
  const [loading, setLoading] = useState(true);

  // ── Auth guard ──────────────────────────────────────────────────────────────
  useEffect(() => {
    const user = localStorage.getItem('user');
    if (!user) {
      navigate('/login');
    }
  }, [navigate]);

  // ── Data & socket ────────────────────────────────────────────────────────────
  useEffect(() => {
    axios
      .get(`${API}/api/accidents/all`)
      .then(res => setAlerts(res.data.data || []))
      .catch(err => console.error('Failed to load alerts:', err))
      .finally(() => setLoading(false));

    const socket = io(API);
    socket.on('new_accident',   (a) => setAlerts(prev => [a, ...prev]));
    socket.on('status_updated', (u) => setAlerts(prev => prev.map(x => x._id === u._id ? u : x)));

    return () => { socket.disconnect(); };
  }, []);

  const updateStatus = (id, status) => {
    axios
      .patch(`${API}/api/accidents/${id}/status`, { status })
      .catch(err => console.error('Status update failed:', err));
  };

  const openLocationInMaps = (lat, lng) => {
    const query = encodeURIComponent(`${lat},${lng}`);
    const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${query}`;
    window.open(mapsUrl, '_blank', 'noopener,noreferrer');
  };

  const handleDispatch = (alert) => {
    updateStatus(alert._id, 'Dispatched');
    if (alert.location?.lat != null && alert.location?.lng != null) {
      openLocationInMaps(alert.location.lat, alert.location.lng);
    } else {
      console.warn('Dispatch location missing for alert:', alert._id);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('user');
    navigate('/');
  };

  return (
    <div className="page">

      <StatsBar />

      <div className="dashboard-header">
        <div className="dashboard-heading">
          <h2>Live Command Center</h2>
          <div className="status-pill" role="status" aria-live="polite">
            <span className="status-dot" aria-hidden="true"></span>
            <span>System live and receiving updates</span>
          </div>
        </div>
        <button className="btn btn-ghost" onClick={handleLogout}>
          Logout
        </button>
      </div>

      {loading && <p style={{ color: 'var(--text-muted)', textAlign: 'center', padding: 40 }}>Loading incidents...</p>}

      {!loading && alerts.length === 0 && (
        <div className="card" style={{ textAlign: 'center', padding: '48px 24px', color: 'var(--text-muted)' }}>
          <div style={{ fontSize: '2.5rem', marginBottom: 12 }}>✅</div>
          <p>No active incidents. All clear.</p>
        </div>
      )}

      {alerts.map(a => (
        <div
          key={a._id}
          className={`incident-card ${severityClass(a.severity)}`}
        >
          <div className="incident-top">
            <h3>{a.incidentType}</h3>
            <span className={badgeClass(a.status)}>{a.status}</span>
          </div>

          <div className="incident-meta">
            <span>📍 {a.location.lat.toFixed(4)}, {a.location.lng.toFixed(4)}</span>
            &ensp;·&ensp;
            <span>Severity: <strong>{a.severity}</strong></span>
            &ensp;·&ensp;
            <span>Injured: <strong>{a.injuredCount}</strong></span>
            {a.serviceRequired && (
              <>&ensp;·&ensp;<span>Service: <strong>{a.serviceRequired}</strong></span></>
            )}
          </div>

          {a.description && (
            <p style={{ fontSize: 13, color: 'var(--text-muted)', marginBottom: 12 }}>{a.description}</p>
          )}

          <div className="incident-actions">
            <button
              className="btn btn-blue"
              onClick={() => handleDispatch(a)}
              disabled={a.status === 'Resolved'}
            >
              Dispatch
            </button>
            <button
              className="btn btn-green"
              onClick={() => updateStatus(a._id, 'Resolved')}
              disabled={a.status === 'Resolved'}
            >
              Resolve
            </button>
          </div>
        </div>
      ))}

    </div>
  );
}