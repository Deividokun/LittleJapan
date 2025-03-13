import React, { useEffect, useState } from 'react'
import './myprofile.css'
function MyProfile() {
  const [user, setUser] = useState(null)

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const userId = localStorage.getItem('userId') // Obtener el token del localStorage
        console.log(userId, 'miau')
        if (!userId) return

        const response = await fetch(
          `http://localhost:3000/api/users/${userId}`,
          {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${userId}` // Solo si realmente usas JWT
            }
          }
        )

        if (!response.ok) throw new Error('Error al obtener el perfil')

        const data = await response.json()
        setUser(data)
      } catch (error) {
        console.error(error)
      }
    }

    fetchUserProfile()
  }, [])

  if (!user) {
    return <p>Cargando perfil...</p>
  }

  return (
    <div className='profile-card'>
      <img src={user.image} alt={user.name} className='profile-image' />
      <h2>{user.fullName}</h2>
      <p>
        <strong>Usuario:</strong> {user.name}
      </p>
      <p>
        <strong>Experiencia:</strong> {user.experience} años
      </p>
      <p>
        <strong>Valoración:</strong> {user.rating}
      </p>
      <p>
        <strong>Documento Number:</strong>
        {user.document_number}
      </p>
      <p>
        <strong>Teléfono:</strong> {user.telephone_number}
      </p>
      <p>
        <strong>Edad:</strong> {user.age} años
      </p>
      <p>
        <strong>Email:</strong> {user.email}
      </p>
    </div>
  )
}

export default MyProfile
