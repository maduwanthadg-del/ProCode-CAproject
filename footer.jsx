import React from 'react';

export default function Footer() {
  return (
    <footer style={{
      background: 'linear-gradient(90deg, #a81e1e 0%, #d42b2b 100%)',
      color: '#fff',
      padding: '16px 24px',
      textAlign: 'center',
      fontSize: '13px',
    }}>
      <div style={{ opacity: 0.9 }}>
        © 2026 Group Pro Code &nbsp;·&nbsp; Faculty of Engineering, University of Moratuwa
      </div>
      <div style={{ opacity: 0.65, fontSize: '11px', marginTop: 3 }}>
        All rights reserved.
      </div>
    </footer>
  );
}