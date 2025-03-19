import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import './login.css'

function LoginUser() {
  const [formData, setFormData] = useState({
    nombreUsuario: '',
    contrasena: ''
  })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [showRegisterAlert, setShowRegisterAlert] = useState(false)

  const navigate = useNavigate()

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  } // vale actualizar en directo el estado del formulario con los datos introducidos por el usuario para mandarlo a las variables de estado formdata

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setShowRegisterAlert(false)
    setLoading(true)

    try {
      const response = await fetch('http://localhost:3000/api/users/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      })
      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'Error al iniciar sesión')
      }

      console.log('Respuesta recibida:', data) // Agregar este log

      // Guardar el token y el userId en localStorage
      localStorage.setItem('token', data.token)
      localStorage.setItem('userId', data.userId)

      console.log('Token guardado:', localStorage.getItem('token'))
      console.log('UserId guardado:', localStorage.getItem('userId'))

      // Redirigir al usuario a la página de inicio u otra página
      navigate('/')
    } catch (err) {
      console.error('Error detallado:', err)
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className='login-container'>
      <form onSubmit={handleSubmit} className='login-form'>
        <h2>LOGIN</h2>
        {error && <p className='error'>{error}</p>}
        {showRegisterAlert && (
          <p className='register-alert'>
            "You don't have a registered account. Please sign up to access."
          </p>
        )}
        <div className='form-group'>
          <label htmlFor='nombreUsuario'>Username:</label>
          <input
            type='text'
            id='nombreUsuario'
            name='nombreUsuario'
            value={formData.nombreUsuario}
            onChange={handleChange}
            required
          />
        </div>
        <div className='form-group'>
          <label htmlFor='contrasena'>Password:</label>
          <input
            type='password'
            id='contrasena'
            name='contrasena'
            value={formData.contrasena}
            onChange={handleChange}
            required
          />
        </div>
        <button type='submit' className='login-button' disabled={loading}>
          {loading ? 'Loading...' : 'Log in'}
        </button>
      </form>
    </div>
  )
}

export default LoginUser
