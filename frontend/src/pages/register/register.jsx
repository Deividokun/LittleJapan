import React from 'react'
import { useNavigate } from 'react-router-dom'
import useRegisterForm from '../../hooks/useRegisterForm'
import './register.css'

function RegisterUser() {
  const navigate = useNavigate()
  const { state, handleChange, handleSubmit } = useRegisterForm(navigate)

  return (
    <div className='register-container'>
      <form onSubmit={handleSubmit} className='register-form'>
        <h2>User Registration</h2>
        {state.error && <p className='error'>{state.error}</p>}
        {state.success && (
          <p className='success'>Registration successful. Redirecting...</p>
        )}

        <div className='form-group'>
          <label htmlFor='nombreUsuario'>Username:</label>
          <input
            type='text'
            id='nombreUsuario'
            name='name'
            value={state.formData.name || ''}
            onChange={handleChange}
            required
            autoComplete='username'
          />
        </div>

        <div className='form-group'>
          <label htmlFor='contrasena'>Password:</label>
          <input
            type='password'
            id='contrasena'
            name='password'
            value={state.formData.password || ''}
            onChange={handleChange}
            required
            autoComplete='current-password'
          />
        </div>

        <div className='form-group'>
          <label htmlFor='nombreCompleto'>Full Name:</label>
          <input
            type='text'
            id='nombreCompleto'
            name='fullName'
            value={state.formData.fullName || ''}
            onChange={handleChange}
            required
            autoComplete='name'
          />
        </div>

        <div className='form-group'>
          <label htmlFor='experiencia'>Experience:</label>
          <input
            type='number'
            id='experiencia'
            name='experience'
            value={state.formData.experience || ''}
            onChange={handleChange}
            autoComplete='off'
          />
        </div>

        <div className='form-group'>
          <label htmlFor='imagenUsuario'>Profile Picture URL:</label>
          <input
            type='text'
            id='imagenUsuario'
            name='image'
            value={state.formData.image || ''}
            onChange={handleChange}
            placeholder='Enter image URL'
            required
            autoComplete='off'
          />
        </div>

        <div className='form-group'>
          <label htmlFor='numeroDocumento'>Document Number:</label>
          <input
            type='text'
            id='numeroDocumento'
            name='document_number'
            value={state.formData.document_number || ''}
            onChange={handleChange}
            required
            autoComplete='off'
          />
        </div>

        <div className='form-group'>
          <label htmlFor='telefono'>Phone:</label>
          <input
            type='text'
            id='telefono'
            name='telephone_number'
            value={state.formData.telephone_number || ''}
            onChange={handleChange}
            required
            autoComplete='tel'
          />
        </div>

        <div className='form-group'>
          <label htmlFor='edad'>Age:</label>
          <input
            type='number'
            id='edad'
            name='age'
            value={state.formData.age || ''}
            onChange={handleChange}
            required
            autoComplete='off'
          />
        </div>

        <div className='form-group'>
          <label htmlFor='email'>Email:</label>
          <input
            type='email'
            id='email'
            name='Email'
            value={state.formData.Email || ''}
            onChange={handleChange}
            required
            autoComplete='email'
          />
        </div>

        <button
          type='submit'
          className='register-button'
          disabled={state.loading}
        >
          {state.loading ? 'Loading...' : 'Register'}
        </button>
      </form>
    </div>
  )
}

export default RegisterUser
