import React from 'react';

function Modal({ showModal, onClose }) {
  if (!showModal) {
    return null; // Nie renderuj nic, jeśli showModal ma wartość false
  }

  return (
    <div className="modal">
      <div className="modal-content">
        <span className="close" onClick={onClose}>&times;</span>
        <p>Przerąbałeś!</p>
      </div>
    </div>
  );
}

export default Modal