const User = require('../models/User') // Asegúrate de tener el modelo de Usuario
const Accommodation = require('../models/accommodation') // Asegúrate de tener el modelo de Alojamiento

class Reservation {
  constructor(
    id,
    price,
    startDate,
    endDate,
    user, // Debería ser una instancia de User
    accommodation // Debería ser una instancia de Accommodation
  ) {
    this.id = id // GUID
    this.price = price // Número (precio de la reserva)

    // Validaciones de fechas
    if (!(startDate instanceof Date) || !(endDate instanceof Date)) {
      throw new Error('Las fechas deben ser instancias de Date')
    }
    this.startDate = startDate // Fecha de inicio
    this.endDate = endDate // Fecha de finalización

    // Validamos que user sea una instancia de User
    if (!(user instanceof User)) {
      throw new Error('El usuario debe ser una instancia de la clase User')
    }
    this.user = user // Ahora user es un objeto User

    // Validamos que accommodation sea una instancia de Accommodation
    if (!(accommodation instanceof Accommodation)) {
      throw new Error(
        'El alojamiento debe ser una instancia de la clase Accommodation'
      )
    }
    this.accommodation = accommodation // Ahora accommodation es un objeto Accommodation
  }

  toJSON() {
    return {
      id: this.id,
      price: this.price,
      startDate: this.startDate,
      endDate: this.endDate,
      user: this.user.toJSON(), // Convertimos el objeto User a JSON
      accommodation: this.accommodation.toJSON() // Convertimos el objeto Accommodation a JSON
    }
  }
}

module.exports = Reservation
