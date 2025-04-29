import { useReducer, useState } from 'react'
import { formReducer, initialFormState } from '../useReducer/formReducer'

const useAlojamientoForm = () => {
  const [state, dispatch] = useReducer(formReducer, initialFormState)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleChange = (field, value) => {
    dispatch({ type: 'UPDATE_FIELD', payload: { field, value } }) 
  }

  const resetForm = () => {
    dispatch({ type: 'RESET_FORM' })
  }

  const handleSubmit = async (url, token) => {
    const ownerid = localStorage.getItem('userId')?.trim()
    if (!ownerid) {
      console.error('Error: ownerid no es válido', ownerid)
      alert('El ID del propietario es obligatorio.')
      return
    }

    setIsSubmitting(true)

    try {
      const jsonBody = JSON.stringify({
        type: state.tipoAlojamiento,
        guests: state.huespedes,
        city: state.ciudad,
        pricepernight: state.precioNoche,
        name: state.nombreAlojamiento,
        description: state.descripcion,
        image: state.imagenAlojamiento,
        services: state.servicios,
        ownerid
      })

      console.log('JSON enviado:', jsonBody)

      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: jsonBody
      })

      const responseText = await response.text()

      let responseData
      try {
      
        responseData = JSON.parse(responseText)
      } catch (error) {
       
        responseData = { message: responseText }
      }

      if (!response.ok) {
        throw new Error(responseData.message || 'Failed to submit form')
      }

      console.log('Respuesta del servidor:', responseData)
      alert('Alojamiento añadido con éxito.')
      resetForm()
    } catch (error) {
      console.error('Error en la solicitud:', error)
      alert(`Error al añadir el alojamiento: ${error.message}`)
    } finally {
      setIsSubmitting(false)
    }
  }

  return { state, handleChange, handleSubmit, isSubmitting }
}

export default useAlojamientoForm
