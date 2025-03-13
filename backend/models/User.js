class User {
  constructor({
    id,
    name,
    experience,
    password,
    rating,
    image,
    document_number,
    telephone_number,
    age,
    Email,
    FullName
  }) {
    this.id = id
    this.name = name
    this.experience = experience
    this.password = password
    this.rating = rating
    this.image = image
    this.document_number = document_number
    this.telephone_number = telephone_number
    this.age = age
    this.email = Email // Cambia Email a email
    this.fullName = FullName // Cambia FullName a fullName
  }

  toJSON() {
    return {
      id: this.id,
      name: this.name,
      experience: this.experience,
      rating: this.rating,
      image: this.image,
      document_number: this.document_number,
      telephone_number: this.telephone_number,
      age: this.age,
      email: this.email,
      fullName: this.fullName
    }
  }
}

module.exports = User
