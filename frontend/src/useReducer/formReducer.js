export const initialFormState = {
  tipoAlojamiento: 'Select the Accommodation',
  huespedes: '',
  ciudad: '',
  precioNoche: '',
  nombreAlojamiento: '',
  descripcion: '',
  imagenAlojamiento: '',
  servicios: []
}

export const formReducer = (state, action) => {
  switch (action.type) {
    case 'UPDATE_FIELD':
      return { ...state, [action.payload.field]: action.payload.value }
    case 'RESET_FORM':
      return initialFormState
    default:
      return state
  }
}
//////////////////////////////////
