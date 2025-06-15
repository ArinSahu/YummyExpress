import React from 'react'
import ReactDom from 'react-dom'

const MODAL_STYLES = {
  position: 'fixed',
  top: '50%',
  left: '50%',
  backgroundColor: 'white',
  transform: 'translate(-50%, -50%)',
  zIndex: 100000,
  height: '90%',
  width: '90%',
  borderRadius: '10px',
  display: 'flex',
  flexDirection: 'column',
};

const OVERLAY_STYLES = {
  position: 'fixed',
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  backgroundColor: 'rgba(0, 0, 0, .7)',
  zIndex: 1000
};

const CONTENT_STYLES = {
  flex: 1,
  overflowY: 'auto',
  padding: '20px'
};

export default function Modal({ children, onClose }) {
  return ReactDom.createPortal(
    <>
      <div style={OVERLAY_STYLES} />
      <div style={MODAL_STYLES}>
        <div className="d-flex justify-content-end p-3">
          <button className='btn bg-danger fs-4' onClick={onClose}>X</button>
        </div>
        <div style={CONTENT_STYLES}>
          {children}
        </div>
      </div>
    </>,
    document.getElementById('cart-root')
  );
}
