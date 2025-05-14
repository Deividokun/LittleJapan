import React, { useState } from 'react'
import SuccessMessage from './../../components/messageContact/messageContact'
import './contactUs.css'

function ContactUs() {
  const [nombre, setNombre] = useState('')
  const [consulta, setConsulta] = useState('')
  const [mensajeEnviado, setMensajeEnviado] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log('Nombre:', nombre, 'Consulta:', consulta)
    setMensajeEnviado(true)
    setNombre('')
    setConsulta('')
  }

  const cerrarMensaje = () => {
    setMensajeEnviado(false)
  }

  return (
    <div className='form-container'>
      <h2>Do you have any questions or inquiries for us?</h2>
      <form onSubmit={handleSubmit} className='form'>
        <div className='form-group'>
          <label htmlFor='nombre'>Username:</label>
          <input
            type='text'
            id='nombre'
            placeholder='Enter your name'
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
            required
          />
        </div>
        <div className='form-group'>
          <label htmlFor='consulta'>Write your questions below:</label>
          <textarea
            id='consulta'
            placeholder='Write your inquiry or message...'
            value={consulta}
            onChange={(e) => setConsulta(e.target.value)}
            required
          />
        </div>
        <button type='submit' className='btn-enviar'>
          Submit Inquiry
        </button>
      </form>

      {mensajeEnviado && <SuccessMessage onClose={cerrarMensaje} />}
    </div>
  )
}

export default ContactUs
