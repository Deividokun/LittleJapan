import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import HostingCardView from '../../components/hostingCardView/hostingCardView'
import OwnerCard from '../../components/ownerCard/ownerCard'
import ReservationView from '../../components/reservationView/reservationView'
import ServicesView from '../../components/servicesView/servicesView'
import './hostingView.css'

const HostingCard = () => {
  const { id } = useParams() 
  const [accommodation, setAccommodation] = useState(null)

  useEffect(() => {
    const fetchAlojamiento = async () => {
      try {
        
        localStorage.setItem('selectedAccommodationId', id)

        console.log('Obteniendo alojamiento desde la API...')
        const response = await fetch(
          `http://localhost:3000/api/accommodations/${id}`
        )
        if (!response.ok) throw new Error('Error al obtener los datos')

        const data = await response.json()
        console.log('Respuesta de la API:', data)

        setAccommodation(data) 
      } catch (error) {
        console.error('Error al obtener los detalles:', error)
      }
    }

    fetchAlojamiento()
  }, [id])

  if (!accommodation) {
    return <p>Cargando...</p>
  }

  const owner = accommodation.owner || {}

  return (
    <div className='viewAccommodation'>
      <section>
        <img
          src={accommodation.image}
          alt={accommodation.name}
          className='imaginetitle'
        />
      </section>
      <section className='row'>
        <HostingCardView
          nombreAlojamiento={accommodation.name}
          huespedes={accommodation.guests}
          descripcion={accommodation.description}
        />
        <ReservationView
          nochesAlojamiento={accommodation.pricePerNight}
          huespedes={accommodation.guests}
        />
      </section>
      <section>
        <ServicesView servicies={accommodation?.services || []} />
      </section>
      <section>
        {owner?.name ? (
          <OwnerCard
            imageUser={owner.image || 'default_image.jpg'}
            userName={owner.name}
            experienciaUser={owner.experience || 'No disponible'}
            valorationUser={owner.rating || 'No disponible'}
            telephoneUser={owner.telephone_number || 'No disponible'}
          />
        ) : (
          <p>Owner information is not available.</p>
        )}
      </section>
    </div>
  )
}

export default HostingCard
