import React from 'react'
import Select from 'react-select'
import useAlojamientoForm from '../../hooks/useAlojamientoForm'
import useFetch from '../../hooks/useFetch'
import './accommodationReg.css'

const AddAlojamientoForm = () => {
  const { state, handleChange, handleSubmit, isSubmitting } =
    useAlojamientoForm()

  const {
    data: accommodations,
    loading,
    error
  } = useFetch('https://littlejapan.onrender.com/api/accommodations')

  // Extraer servicios únicos
  const allServices = accommodations?.flatMap((acc) => acc.services) ?? []
  const uniqueServices = Array.from(new Set(allServices.map((s) => s.id))).map(
    (id) => allServices.find((s) => s.id === id)
  )

  // Mapeo de servicios para react-select
  const mappedServicios = uniqueServices.map((servicio) => ({
    value: servicio?.id,
    label: servicio?.name
  }))

  return (
    <>
      <h2>Add new accommodation:</h2>
      <form
        onSubmit={(e) => {
          e.preventDefault()
          handleSubmit(
            'https://littlejapan.onrender.com/api/accommodations',
            localStorage.getItem('token')
          )
        }}
        className='RegisterHouseForm'
      >
        <div>
          <label>Type:</label>
          <select
            value={state.tipoAlojamiento}
            onChange={(e) => handleChange('tipoAlojamiento', e.target.value)}
          >
            <option value=''>Choose one</option>
            <option value='Guest House'>Guest House</option>
            <option value='Apartment'>Apartment</option>
            <option value='Hotel'>Hotel</option>
          </select>
        </div>

        <div>
          <label>Number of guests:</label>
          <input
            type='number'
            value={state.huespedes}
            onChange={(e) => handleChange('huespedes', Number(e.target.value))}
            min='1'
          />
        </div>

        <div>
          <label>City:</label>
          <select
            value={state.ciudad}
            onChange={(e) => handleChange('ciudad', e.target.value)}
          >
            <option value=''>Choose city</option>
            <option value='Tokyo'>Tokyo</option>
            <option value='Kyoto'>Kyoto</option>
            <option value='Nara'>Nara</option>
            <option value='Hiroshima'>Hiroshima</option>
            <option value='Osaka'>Osaka</option>
          </select>
        </div>

        <div>
          <label>Price per night:</label>
          <input
            type='number'
            value={state.precioNoche}
            onChange={(e) =>
              handleChange('precioNoche', Number(e.target.value))
            }
            min='0'
          />
        </div>

        <div>
          <label>Accommodation name:</label>
          <input
            type='text'
            value={state.nombreAlojamiento}
            onChange={(e) => handleChange('nombreAlojamiento', e.target.value)}
          />
        </div>

        <div>
          <label>Description:</label>
          <textarea
            value={state.descripcion}
            onChange={(e) => handleChange('descripcion', e.target.value)}
            rows='4'
          ></textarea>
        </div>

        <div>
          <label>image Url:</label>
          <input
            type='text'
            value={state.imagenAlojamiento}
            onChange={(e) => handleChange('imagenAlojamiento', e.target.value)}
          />
        </div>

        <div>
          <label>Services:</label>
          {loading && <p>loading services...</p>}
          {error && <p>Error loading services: {error}</p>}
          {!loading && !error && mappedServicios.length > 0 && (
            <Select
              isMulti
              options={mappedServicios}
              value={state.servicios?.map((id) =>
                mappedServicios.find((s) => s.value === id)
              )}
              onChange={(selected) =>
                handleChange(
                  'servicios',
                  selected.map((s) => s.value)
                )
              }
              placeholder='Choose services'
              className='selectone'
            />
          )}
        </div>

        <button type='submit' disabled={isSubmitting}>
          {isSubmitting ? 'Adding...' : 'Add accommodation'}
        </button>
      </form>
    </>
  )
}

export default AddAlojamientoForm
