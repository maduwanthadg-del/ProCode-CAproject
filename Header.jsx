// src/components/Header.jsx
import React from "react";

import LiveSupportButton from "./LiveSupportButton";

export default function Header() {
  return (
    <header className="header"style={{ backgroundColor: '#d02929', color: '#fff', padding: '10px', textAlign: 'center' }}>
      
        <h1 className="header-title">🚑Quick Response. Trusted Care...</h1>
        <p>Welcome to the Emergency Response Dashboard</p>

    </header>
  );
}