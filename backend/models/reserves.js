const User = require('../models/User') 
const Accommodation = require('../models/accommodation') 

class Reservation {
  constructor(
    id,
    price,
    startDate,
    endDate,
    user, 
    accommodation 
  ) {
    this.id = id // GUID
    this.price = price // Número (precio de la reserva)


    if (!(startDate instanceof Date) || !(endDate instanceof Date)) {
      throw new Error('Las fechas deben ser instancias de Date')
    }
    this.startDate = startDate 
    this.endDate = endDate 

   
    if (!(user instanceof User)) {
      throw new Error('El usuario debe ser una instancia de la clase User')
    }
    this.user = user 
    
    if (!(accommodation instanceof Accommodation)) {
      throw new Error(
        'El alojamiento debe ser una instancia de la clase Accommodation'
      )
    }
    this.accommodation = accommodation 
  }

  toJSON() {
    return {
      id: this.id,
      price: this.price,
      startDate: this.startDate,
      endDate: this.endDate,
      user: this.user.toJSON(), 
      accommodation: this.accommodation.toJSON()
    }
  }
}

module.exports = Reservation
