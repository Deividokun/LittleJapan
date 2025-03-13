import React from 'react'
import './servicesView.css'

function ServicesView({ servicies }) {
  return (
    <article className='serviciesView'>
      <h2>What is included in this accommodation?</h2>
      <div className='servicesContainer'>
        {servicies && servicies.length > 0 ? (
          servicies.map((servicio, index) => (
            <div key={index} className='service'>
              <img
                src={servicio.image}
                alt={servicio.name}
                className='servicesimage'
              />
              <p>{servicio.name}</p>
            </div>
          ))
        ) : (
          <p>There are no services available.</p>
        )}
      </div>
    </article>
  )
}

export default ServicesView
