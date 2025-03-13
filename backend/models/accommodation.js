const User = require('../models/User')

class Accommodation {
  constructor(
    id,
    type,
    owner,
    guests,
    city,
    pricePerNight,
    image,
    name,
    description,
    services
  ) {
    this.id = id
    this.type = type
    if (!(owner instanceof User)) {
      throw new Error('El propietario debe ser una instancia de la clase User')
    }
    this.owner = owner
    if (typeof guests !== 'number' || guests <= 0) {
      throw new Error('El número de huéspedes debe ser un número positivo')
    }
    this.guests = guests
    this.city = city
    this.pricePerNight = pricePerNight
    this.image = image
    this.name = name
    this.description = description
    if (!Array.isArray(services)) {
      throw new Error('Los servicios deben ser un array')
    }
    this.services = services
  }

  toJSON() {
    return {
      id: this.id,
      type: this.type,
      owner: this.owner.toJSON(),
      guests: this.guests,
      city: this.city,
      pricePerNight: this.pricePerNight,
      image: this.image,
      name: this.name,
      description: this.description,
      services: this.services
    }
  }
}

module.exports = Accommodation
