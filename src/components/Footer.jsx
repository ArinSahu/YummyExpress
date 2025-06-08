import React from 'react';

export default function Footer() {
  return (
    <footer
      style={{
        backgroundColor: 'whitesmoke', 
        color: '#f8f9fa', 
        padding: '1rem 0',
        marginTop: 'auto',
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
