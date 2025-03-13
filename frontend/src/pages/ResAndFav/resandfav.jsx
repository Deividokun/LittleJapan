import React, { useEffect, useState } from 'react'
import deleteReservation from '../../hooks/deleteReserve'
import './resandfav.css'

function ReservationDetail() {
  const [reservations, setReservations] = useState([])
  const token = localStorage.getItem('token')
  const userId = localStorage.getItem('userId')

  useEffect(() => {
    const fetchReservations = async () => {
      try {
        const response = await fetch('http://localhost:3000/api/reserves', {
          headers: { Authorization: `Bearer ${token}` }
        })
        if (!response.ok) throw new Error('Error fetching reservations')

        const data = await response.json()
        const userReservations = data.filter((res) => res.user.id === userId)
        setReservations(userReservations)
      } catch (error) {
        console.error('Error fetching reservations:', error)
      }
    }

    fetchReservations()
  }, [token, userId])

  if (reservations.length === 0) return <p>No reservations found.</p>

  return (
    <div className='reservations'>
      <h2>Your Reservations</h2>
      <ul>
        {reservations.map((reservation) => (
          <li key={reservation.id} className='liReserv'>
            <div className='reservation-content'>
              <div className='reservation-info'>
                <h3>{reservation.accommodation.name}</h3>
                <p>
                  <strong>City:</strong> {reservation.accommodation.city}
                </p>
                <p>
                  <strong>Type:</strong> {reservation.accommodation.type}
                </p>
                <p>
                  <strong>Guests:</strong> {reservation.accommodation.guests}
                </p>
                <p>
                  <strong>Start Date:</strong>{' '}
                  {new Date(reservation.startDate).toLocaleDateString()}
                </p>
                <p>
                  <strong>End Date:</strong>{' '}
                  {new Date(reservation.endDate).toLocaleDateString()}
                </p>
                <p>
                  <strong>Price:</strong> {reservation.price}€
                </p>
              </div>
              <div className='reservation-image'>
                <img
                  src={reservation.accommodation.image}
                  alt={reservation.accommodation.name}
                />
              </div>
            </div>
            <button
              className='delete-btn'
              onClick={() =>
                deleteReservation(reservation.id, token, setReservations)
              }
            >
              Delete 🗑️
            </button>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default ReservationDetail
