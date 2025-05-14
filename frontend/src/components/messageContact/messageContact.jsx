import React from 'react'
import './messageContact.css'

function SuccessMessage({ onClose }) {
  return (
    <div className='success-overlay'>
      <div className='success-box'>
        <p>Message sent successfully!</p>
        <button onClick={onClose}>Cerrar</button>
      </div>
    </div>
  )
}

export default SuccessMessage

