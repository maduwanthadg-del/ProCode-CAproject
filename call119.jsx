import React from "react";
export default function Call119() {
  return (
    <a href="tel:119" style={{
      background: '#1565C0',
      color: '#fff',
      borderRadius: '999px',
      padding: '4px 12px',
      fontSize: '0.95rem',
      textDecoration: 'none',
      display: 'inline-flex',
      alignItems: 'center',
      gap:'8px',
      fontWeight: 'bold',
      cursor: 'pointer',
      transition: 'transform 0.2s',
    }}
    onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.05)'}
    onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}
    >
    
        
      📞 Call 119
    </a>
  );
}