import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import './alarmReserva.css'

function AlarmReservation() {
  const navigate = useNavigate()

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate('/')
    }, 1000)

    return () => clearTimeout(timer)
  }, [navigate])

  return (
    <div className='alarm-container'>
      Reservation Confirmed
      <img src='/assets/otros/confirm.png' alt='Confirmación' />
    </div>
  )
}

export default AlarmReservation
