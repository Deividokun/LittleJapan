class Service {
  constructor(id, name, description, image) {
    if (!id) {
      throw new Error('El ID es obligatorio')
    }
    this.id = id // GUID (Unique Identifier)

    if (typeof name !== 'string' || name.trim() === '') {
      throw new Error('El nombre del servicio debe ser un string no vacío')
    }
    this.name = name // String

    if (typeof description !== 'string') {
      throw new Error('La descripción debe ser un string')
    }
    this.description = description // String

    if (typeof image !== 'string' || !image.startsWith('http')) {
      throw new Error('La imagen debe ser una URL válida')
    }
    this.image = image // URL de la imagen
  }

  toJSON() {
    return {
      id: this.id,
      name: this.name,
      description: this.description,
      image: this.image
    }
  }
}

module.exports = Service
