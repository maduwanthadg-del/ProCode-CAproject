import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Selecttype from './selecttype'; // Ensure this path is correct
import './Report.css'; 

export default function Report() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  
  // Location States
  const [locationStatus, setLocationStatus] = useState('acquiring'); // acquiring, locked, error
  const [watchId, setWatchId] = useState(null);
  const [currentPos, setCurrentPos] = useState(null);
  
  // UI Notification State
  const [notice, setNotice] = useState({ message: '', type: '' });

  const [formData, setFormData] = useState({
    reporterType: 'Citizen',
    incidentType: '',
    injuredCount: '',
    vehicles: [],
    severity: 'Minor',
    servicesRequired: [],
    description: '',
  });

  const vehicleOptions = ['Car', 'Motorcycle', 'Bus', 'Three-Wheeler', 'Truck', 'Pedestrian', 'Bicycle', 'Other'];
  const vehicleEmojis = { Car: '🚗', Motorcycle: '🏍️', Bus: '🚌', 'Three-Wheeler': '🛺', Truck: '🚚', Pedestrian: '🚶', Bicycle: '🚴', Other: '⚠️' };

  const handleCheckboxChange = (field, value) => {
    const currentValues = formData[field];
    if (currentValues.includes(value)) {
      setFormData({ ...formData, [field]: currentValues.filter(v => v !== value) });
    } else {
      setFormData({ ...formData, [field]: [...currentValues, value] });
    }
  };

  const startLiveTracking = async () => {
    setLocationStatus('acquiring');
    if (!('geolocation' in navigator)) {
      setLocationStatus('error');
      setNotice({ message: 'Geolocation is not supported by your browser.', type: 'error' });
      return;
    }
    
    try {
      const id = navigator.geolocation.watchPosition(
        (pos) => {
          setCurrentPos({ lat: pos.coords.latitude, lng: pos.coords.longitude });
          setLocationStatus('locked');
          setNotice({ message: '', type: '' }); // Clear errors
        }, 
        (err) => {
          console.warn('watchPosition error', err);
          setLocationStatus('error');
          if (err.code === 1) setNotice({ message: 'Location permission denied. Please enable GPS.', type: 'error' });
          else setNotice({ message: 'Unable to get a precise location lock.', type: 'error' });
        }, 
        { enableHighAccuracy: true, maximumAge: 5000, timeout: 10000 }
      );
      setWatchId(id);
    } catch (err) {
      console.error('startLiveTracking error', err);
      setLocationStatus('error');
    }
  };

  const stopLiveTracking = () => {
    if (watchId && navigator.geolocation.clearWatch) {
      navigator.geolocation.clearWatch(watchId);
      setWatchId(null);
      setLocationStatus('error');
    }
  };

  useEffect(() => {
    startLiveTracking();
    return () => {
      if (watchId && navigator.geolocation.clearWatch) {
        navigator.geolocation.clearWatch(watchId);
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const submitReport = async (e) => {
    e.preventDefault();
    setNotice({ message: '', type: '' });

    if (!formData.incidentType) {
      setNotice({ message: 'Please select an incident type.', type: 'error' });
      return;
    }

    setLoading(true);

    const buildAndSend = async (lat, lng) => {
      const payload = { ...formData, location: { lat, lng } };
      
      try {
        await axios.post('http://localhost:5000/api/accidents/report', payload);
        setNotice({ message: '🚨 Alert Sent! Emergency services have been notified.', type: 'success' });
        
        // Delay navigation slightly so user sees the success message
        setTimeout(() => navigate('/'), 2500);
      } catch (err) {
        console.error('Report submission error:', err);
        setNotice({ message: 'Failed to send report. Please check your connection.', type: 'error' });
        setLoading(false);
      }
    };

    // If we have live position, send immediately
    if (currentPos?.lat && currentPos?.lng) {
      await buildAndSend(currentPos.lat, currentPos.lng);
      return;
    }

    // Wait briefly for position, fallback to mock if it fails
    let attempts = 0;
    const waitForPosition = setInterval(() => {
      attempts++;
      if (currentPos?.lat && currentPos?.lng) {
        clearInterval(waitForPosition);
        buildAndSend(currentPos.lat, currentPos.lng);
      } else if (attempts > 8) { // 4 seconds max wait
        clearInterval(waitForPosition);
        console.warn('GPS timeout - using fallback coordinates for Colombo');
        buildAndSend(6.9271, 80.7789); // Fallback to Colombo, LK
      }
    }, 500);
  };

  return (
    <div className="report-wrapper">
      <div className="report-card">
        
        <div className="report-header">
  <h2>
    <span className="siren-pulse">🚨</span> 
    Emergency Report
    <span className="live-badge">
      <span className="live-dot"></span> LIVE
    </span>
  </h2>
  <p>Please provide accurate details. Your GPS location is shared automatically to speed up response times.</p>
</div>

        {/* Dynamic Notice Banner */}
        {notice.message && (
          <div className={`notice-banner ${notice.type}`}>
            {notice.message}
          </div>
        )}

        {/* GPS Status Indicator */}
        <div className={`gps-status ${locationStatus}`}>
          <div className="gps-indicator"></div>
          <div className="gps-details">
            <strong>{locationStatus === 'locked' ? 'GPS Locked' : locationStatus === 'error' ? 'GPS Offline' : 'Acquiring Signal...'}</strong>
            <span>{currentPos ? `${currentPos.lat.toFixed(5)}, ${currentPos.lng.toFixed(5)}` : 'Waiting for satellite data'}</span>
          </div>
          <button 
            type="button" 
            className="btn-gps-toggle"
            onClick={() => { watchId ? stopLiveTracking() : startLiveTracking(); }}
          >
            {watchId ? 'Stop' : 'Retry'}
          </button>
        </div>

        <form onSubmit={submitReport} className="report-form">
          
          {/* 1. Incident Type */}
          <div className="form-group">
            <label>What happened?</label>
            <select 
              className="report-input report-select border-red"
              value={formData.incidentType}
              onChange={(e) => setFormData({ ...formData, incidentType: e.target.value })}
              required
              disabled={loading}
            >
              <option value="" disabled>-- Select Incident Type --</option>
              <option value="Vehicle Accident">🚗 Vehicle Accident</option>
              <option value="Pedestrian Hit">🚶 Pedestrian Hit</option>
              <option value="Fire Breakout">🔥 Fire Breakout</option>
              <option value="Natural Disaster">⛈️ Natural Disaster</option>
            </select>
          </div>

          {/* 2. Severity & Injured Count */}
          <div className="form-row">
            <div className="form-group half-width">
              <label>Severity</label>
              <select 
                className="report-input report-select border-orange"
                value={formData.severity}
                onChange={(e) => setFormData({ ...formData, severity: e.target.value })}
                disabled={loading}
              >
                <option value="Minor">🟢 Minor (No injuries)</option>
                <option value="Major">🟠 Major (Injuries/Damage)</option>
                <option value="Critical">🔴 Critical (Life Threatening)</option>
              </select>
            </div>
            
            <div className="form-group half-width">
              <label>Injured Persons</label>
              <input 
                type="number" 
                min="0" 
                className="report-input border-red" 
                value={formData.injuredCount}
                onChange={(e) => setFormData({ ...formData, injuredCount: e.target.value })}
                placeholder="0"
                disabled={loading}
              />
            </div>
          </div>

          {/* 3. Vehicles Involved */}
          <div className="form-group">
            <label>Vehicles Involved</label>
            <div className="vehicle-grid">
              {vehicleOptions.map(v => {
                const isSelected = formData.vehicles.includes(v);
                return (
                  <button 
                    type="button" 
                    key={v}
                    className={`vehicle-btn ${isSelected ? 'selected' : ''}`}
                    onClick={() => handleCheckboxChange('vehicles', v)}
                    disabled={loading}
                  >
                    <span className="v-emoji">{vehicleEmojis[v]}</span> {v}
                  </button>
                );
              })}
            </div>
          </div>

          {/* 4. Emergency Services Required */}
          <div className="form-group">
             <label>Services Required</label>
             {/* Assuming Selecttype accepts an onChange and disabled prop */}
             <Selecttype 
               onChange={(e) => setFormData({ ...formData, servicesRequired: e.target.value })} 
               disabled={loading}
             />  
          </div>

          {/* 5. Description */}
          <div className="form-group">
            <label>Additional Details (Optional)</label>
            <textarea 
              rows="3" 
              className="report-input" 
              placeholder="E.g. Near the clock tower, white van involved..."
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              disabled={loading}
            ></textarea>
          </div>

          <button 
            type="submit" 
            className="btn-broadcast" 
            disabled={loading}
          >
            {loading ? '⏳ TRANSMITTING DATA...' : '🚨 BROADCAST EMERGENCY'}
          </button>
          
        </form>
      </div>
    </div>
  );
}