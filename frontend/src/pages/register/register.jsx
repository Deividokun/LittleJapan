import React from 'react'
import { useNavigate } from 'react-router-dom'
import useRegisterForm from '../../hooks/useRegisterForm'
import './register.css'

function RegisterUser() {
  const navigate = useNavigate()
  const { state, handleChange, handleSubmit } = useRegisterForm(navigate)
  const { formData, loading, error, success } = state

  return (
    <div className='register-container'>
      <form onSubmit={handleSubmit} className='register-form'>
        <h2>User Registration</h2>
        {error && <p className='error'>{error}</p>}
        {success && (
          <p className='success'>Registration successful. Redirecting...</p>
        )}

        <div className='form-group'>
          <label htmlFor='nombreUsuario'>Username:</label>
          <input
            type='text'
            id='nombreUsuario'
            name='name'
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>

        <div className='form-group'>
          <label htmlFor='contrasena'>Password:</label>
          <input
            type='password'
            id='contrasena'
            name='password'
            value={formData.password}
            onChange={handleChange}
            required
          />
        </div>

        <div className='form-group'>
          <label htmlFor='nombreCompleto'>Full Name:</label>
          <input
            type='text'
            id='nombreCompleto'
            name='fullName'
            value={formData.fullName}
            onChange={handleChange}
            required
          />
        </div>

        <div className='form-group'>
          <label htmlFor='experiencia'>Experience:</label>
          <input
            type='number'
            id='experiencia'
            name='experience'
            value={formData.experience}
            onChange={handleChange}
          />
        </div>

        <div className='form-group'>
          <label htmlFor='imagenUsuario'>Profile Picture URL:</label>
          <input
            type='text'
            id='imagenUsuario'
            name='image'
            value={formData.image}
            onChange={handleChange}
            placeholder='Enter image URL'
            required
          />
        </div>

        <div className='form-group'>
          <label htmlFor='numeroDocumento'>Document Number:</label>
          <input
            type='text'
            id='numeroDocumento'
            name='document_number'
            value={formData.document_number}
            onChange={handleChange}
            required
          />
        </div>

        <div className='form-group'>
          <label htmlFor='telefono'>Phone:</label>
          <input
            type='text'
            id='telefono'
            name='telephone_number'
            value={formData.telephone_number}
            onChange={handleChange}
            required
          />
        </div>

        <div className='form-group'>
          <label htmlFor='edad'>Age:</label>
          <input
            type='number'
            id='edad'
            name='age'
            value={formData.age}
            onChange={handleChange}
            required
          />
        </div>

        <div className='form-group'>
          <label htmlFor='email'>Email:</label>
          <input
            type='email'
            id='email'
            name='Email'
            value={formData.Email}
            onChange={handleChange}
            required
          />
        </div>

        <button type='submit' className='register-button' disabled={loading}>
          {loading ? 'Loading...' : 'Register'}
        </button>
      </form>
    </div>
  )
}

export default RegisterUser
