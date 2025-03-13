import React, { useEffect, useState } from 'react'
import { NavLink, useLocation } from 'react-router-dom'
import './FilterHome.css'

function FilterHome() {
  const location = useLocation()
  const resultados = Array.isArray(location.state?.resultados)
    ? location.state.resultados
    : []

  // Cargar favoritos desde localStorage
  const [favorites, setFavorites] = useState(
    JSON.parse(localStorage.getItem('favorites')) || []
  )

  useEffect(() => {
    localStorage.setItem('favorites', JSON.stringify(favorites))
  }, [favorites])

  const toggleFavorite = (id, event) => {
    event.stopPropagation()
    event.preventDefault() // Evita que el NavLink navegue al hacer clic en el corazón

    setFavorites((prev) =>
      prev.includes(id) ? prev.filter((fav) => fav !== id) : [...prev, id]
    )
  }

  return (
    <div className='results-container'>
      <h2>Filter Results:</h2>
      {resultados.length === 0 ? (
        <p>No accommodations match the selected filters.</p>
      ) : (
        <div className='results-grid'>
          {resultados.map((accommodation) => (
            <NavLink
              to={`/detail/${accommodation.id}`}
              className='card-accommodation'
              key={accommodation.id}
            >
              <div className='card-image'>
                <img src={accommodation.image} alt={accommodation.name} />
                <div
                  className='heart-icon'
                  onClick={(e) => toggleFavorite(accommodation.id, e)}
                >
                  {favorites.includes(accommodation.id) ? '❤️' : '🤍'}
                </div>
              </div>
              <div className='card-content'>
                <h3>{accommodation.name}</h3>
                <p className='description'>{accommodation.description}</p>
                <p>Price: ${accommodation.pricePerNight}/night</p>
                <p>Guests: {accommodation.guests}</p>
              </div>
            </NavLink>
          ))}
        </div>
      )}
    </div>
  )
}

export default FilterHome
