import React from 'react'
import './hostingCardView.css'
function HostingCardView({ nombreAlojamiento, huespedes, descripcion }) {
  return (
    <article className='cardAccommodationView'>
      <h3>{nombreAlojamiento}</h3>
      <h4>Guests: {huespedes}</h4>
      <p>{descripcion}</p>
    </article>
  )
}

export default HostingCardView
