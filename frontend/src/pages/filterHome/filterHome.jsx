import React, { useEffect, useState } from 'react'
import { NavLink, useLocation } from 'react-router-dom'
import './FilterHome.css'

function FilterHome() {
  const location = useLocation()
  const resultados = Array.isArray(location.state?.resultados)
    ? location.state.resultados
    : [] // es una condicion que verifica si location.state.resultados es un array, si es asi, se asigna a resultados, si no, se asigna un array vacio.

  // Cargar favoritos desde localStorage
  const [favorites, setFavorites] = useState(
    JSON.parse(localStorage.getItem('favorites')) || []
  )

  useEffect(() => {
    localStorage.setItem('favorites', JSON.stringify(favorites))
  }, [favorites])

  const toggleFavorite = (id, event) => {
    // event.stopPropagation()
    event.preventDefault() // Evita que el NavLink navegue al hacer clic en el corazón

    setFavorites((prev) =>
      prev.includes(id) ? prev.filter((fav) => fav !== id) : [...prev, id]
    ) // se paa el id por parametro y se verifica si el id ya esta en el array de favoritos, si es asi se añade por spreed peraton que es un nuevo array, si no se elimina el id del array.
  }

  // Paginación
  const [currentPage, setCurrentPage] = useState(1)
  const accommodationsPerPage = 10

  // Obtener alojamientos actuales
  const indexOfLastAccommodation = currentPage * accommodationsPerPage
  const indexOfFirstAccommodation =
    indexOfLastAccommodation - accommodationsPerPage
  const currentAccommodations = resultados.slice(
    indexOfFirstAccommodation,
    indexOfLastAccommodation
  )

  // Cambiar página
  const paginate = (pageNumber) => setCurrentPage(pageNumber)

  const nextPage = () => {
    if (currentPage < Math.ceil(resultados.length / accommodationsPerPage)) {
      setCurrentPage(currentPage + 1)
    }
  }

  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1)
    }
  }

  return (
    <div className='results-container'>
      <h2>Filter Results:</h2>
      {resultados.length === 0 ? (
        <p>No accommodations match the selected filters.</p>
      ) : (
        <div>
          <div className='results-grid'>
            {currentAccommodations.map(
              (
                accommodation // se recorre el array de alojamientos actuales y se muestra en pantalla.
              ) => (
                <NavLink
                  to={`/detail/${accommodation.id}`}
                  className='card-accommodation'
                  key={accommodation.id}
                >
                  <div className='card-image'>
                    <img src={accommodation.image} alt={accommodation.name} />
                    <div
                      className='heart-icon'
                      onClick={(e) => toggleFavorite(accommodation.id, e)} // se pasa el id del alojamiento y el evento.
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
              )
            )}
          </div>
          <div className='pagination'>
            <button
              onClick={prevPage}
              disabled={currentPage === 1}
              className='prev'
            >
              &laquo; Previous
            </button>
            <span>{currentPage}</span>
            <button
              onClick={nextPage}
              disabled={
                currentPage ===
                Math.ceil(resultados.length / accommodationsPerPage)
              }
              className='next'
            >
              Next &raquo;
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

export default FilterHome
