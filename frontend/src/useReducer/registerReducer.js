export const initialState = {
  formData: {
    nombreUsuario: '',
    contrasena: '',
    nombreCompleto: '',
    experiencia: 0,
    imagenUsuario: '',
    numeroDocumento: '',
    tipoDocumento: 'DNI',
    telefono: '',
    edad: '',
    email: ''
  },
  loading: false,
  error: '',
  success: false
}

export const registerReducer = (state, action) => {
  switch (action.type) {
    case 'CHANGE_FIELD':
      return {
        ...state,
        formData: { ...state.formData, [action.field]: action.value }
      }
    case 'SET_LOADING':
      return { ...state, loading: action.loading }
    case 'SET_ERROR':
      return { ...state, error: action.error }
    case 'SET_SUCCESS':
      return { ...state, success: true }
    case 'RESET_STATUS':
      return { ...state, error: '', success: false }
    default:
      return state
  }
}
