import { useReducer } from 'react'
import { initialState, registerReducer } from '../useReducer/registerReducer'
import useRegisterApi from './useRegisterApi'

const useRegisterForm = (navigate) => {
  const [state, dispatch] = useReducer(registerReducer, initialState)
  const { registerUser } = useRegisterApi()

  const handleChange = (e) => {
    const { name, value } = e.target
    dispatch({ type: 'CHANGE_FIELD', field: name, value })
  }

  const validateForm = () => {
    const requiredFields = [
      'name',
      'password',
      'fullName',
      'experience',
      'document_number',
      'telephone_number',
      'age',
      'Email',
      'image'
    ]

    const emptyFields = requiredFields.filter((field) => !state.formData[field])

    if (emptyFields.length > 0) {
      dispatch({
        type: 'SET_ERROR',
        error: `Los siguientes campos son obligatorios: ${emptyFields.join(
          ', '
        )}`
      })
      return false
    }

    if (
      state.formData.age &&
      (isNaN(state.formData.age) || state.formData.age < 18)
    ) {
      dispatch({
        type: 'SET_ERROR',
        error: 'La edad debe ser un número mayor o igual a 18'
      })
      return false
    }

    return true
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    dispatch({ type: 'RESET_STATUS' })

    if (!validateForm()) return

    dispatch({ type: 'SET_LOADING', loading: true })

    try {
      await registerUser(state.formData)
      dispatch({ type: 'SET_SUCCESS' })
      navigate('/login')
    } catch (err) {
      dispatch({ type: 'SET_ERROR', error: err.message })
    } finally {
      dispatch({ type: 'SET_LOADING', loading: false })
    }
  }

  return { state, handleChange, handleSubmit }
}

export default useRegisterForm
