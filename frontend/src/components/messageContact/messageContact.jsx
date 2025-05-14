<<<<<<< HEAD
// SuccessMessage.jsx
import React from 'react'
import './messageContact.css'

function SuccessMessage({ onClose }) {
  return (
    <div className='success-overlay'>
      <div className='success-box'>
        <p>¡Mensaje enviado con éxito!</p>
        <button onClick={onClose}>Cerrar</button>
      </div>
    </div>
  )
}

export default SuccessMessage
=======

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
>>>>>>> 6b7121764f3a2ed869df2c27959fbe1936b97a74
