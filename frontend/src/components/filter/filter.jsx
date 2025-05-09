import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import './filter.css'

function Filter() {
  const [tipoAlojamiento, setTipoAlojamiento] = useState('')
  const [precio, setPrecio] = useState('')
  const [ciudad, setCiudad] = useState('')
  const [huespedes, setHuespedes] = useState('')

  const navigate = useNavigate()

  const handleFilter = async () => {
    try {
      const token = localStorage.getItem('token')
      const params = {} 
      if (tipoAlojamiento) params.tipoAlojamiento = tipoAlojamiento
      if (ciudad) params.ciudad = ciudad
      if (precio) params.precio = precio
      if (huespedes) params.huespedes = huespedes

      const queryParams = new URLSearchParams(params).toString()

      const response = await fetch(
        `http://localhost:3003/api/accommodations?${queryParams}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        }
      )

      if (!response.ok) throw new Error('Error al filtrar')

      const resultados = await response.json()
      navigate('/filterhome', { state: { resultados } })
    } catch (error) {
      console.error('Error:', error)
      alert('Error al aplicar filtros. Inténtalo de nuevo.')
    }
  }

  return (
    <div className='filter-container'>
      <div className='filter-accommomodation'>
        
        <div className='filter-item'>
          <label htmlFor='tipo-alojamiento'>Type of Accommodation</label>
          <select
            id='tipo-alojamiento'
            value={tipoAlojamiento}
            onChange={(e) => setTipoAlojamiento(e.target.value)}
          >
            <option value=''>Choose one</option>
            <option value='Hotel'>Hotel</option>
            <option value='Guest House'>Guesthouse</option>
            <option value='Apartment'>Apartment</option>
          </select>
        </div>

      
        <div className='filter-item'>
          <label htmlFor='precio'>Maximum Price per Night</label>
          <input
            type='number'
            id='precio'
            placeholder='Filter per price'
            value={precio}
            onChange={(e) => setPrecio(e.target.value.replace(/[^0-9]/g, ''))}
            min='0'
          />
        </div>

      
        <div className='filter-item'>
          <label htmlFor='ciudad'>City</label>
          <select
            id='ciudad'
            value={ciudad}
            onChange={(e) => setCiudad(e.target.value)}
          >
            <option value=''>Choose one</option>
            <option value='Tokyo'>Tokyo</option>
            <option value='Nara'>Nara</option>
            <option value='Osaka'>Osaka</option>
            <option value='Hiroshima'>Hiroshima</option>
            <option value='Kyoto'>Kyoto</option>
          </select>
        </div>

        
        <div className='filter-item'>
          <label htmlFor='huespedes'>Number of Guests</label>
          <input
            type='number'
            id='huespedes'
            value={huespedes}
            placeholder='¿how many guests?'
            onChange={(e) =>
              setHuespedes(e.target.value.replace(/[^0-9]/g, ''))
            }
            min='1'
          />
        </div>

        <div className='buttonSubmit'>
          <img
            src='/assets/lugaresHeroe/lupa.png'
            alt='search icon'
            onClick={handleFilter}
            className='lupa'
          />
        </div>
      </div>
    </div>
  )
}

export default Filter
