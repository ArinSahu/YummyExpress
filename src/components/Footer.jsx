import React from 'react';

export default function Footer() {
  return (
    <footer
      style={{
        backgroundColor: '#212529', // bg-dark
        color: '#f8f9fa', // text-light
        padding: '1rem 0',
        marginTop: 'auto',
        position: 'fixed',
        bottom: 0,
        width: '100%',
        textAlign: 'center',
        zIndex: 1000,
      }}
    >
      <div>
        <span style={{ color: '#6c757d' }}>© 2025 Chomato, Inc</span>
      </div>
    </footer>
  );
}
