import React, { useEffect, useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css'; // Import styles from react-datepicker
import { useNavigate } from 'react-router-dom';
import AlarmReservation from '../alarmReservation/alarmReserva';
import './reservationView.css';

function ReservaView({ nochesAlojamiento, huespedes }) {
  const [startDate, setStartDate] = useState(null) 
  const [endDate, setEndDate] = useState(null) 
  const [totalPrice, setTotalPrice] = useState(0) 
  const [reserveConfirmed, setReserveConfirmed] = useState(false) 
  const [errorAlarm, setErrorAlarm] = useState(false) 
  const [reservedDates, setReservedDates] = useState([]) 
  const navigate = useNavigate() 

  const Cleaningfee = 17

  // useEffect(() => {
  //   // Fetch reserved dates from the backend
  //   const fetchReservedDates = async () => {
  //     try {
  //       const response = await fetch('http://localhost:3000/api/reserves/dates')
  //       const data = await response.json()
  //       if (response.ok) {
  //         const dates = data.map((reservation) => ({
  //           start: new Date(reservation.startDate),
  //           end: new Date(reservation.endDate)
  //         }))
  //         setReservedDates(dates)
  //       } else {
  //         console.error('Error fetching reserved dates:', data.error)
  //       }
  //     } catch (error) {
  //       console.error('Error fetching reserved dates:', error)
  //     }
  //   }

  //   fetchReservedDates()
  // }, [])

  const calculateTotalPrice = () => {
    if (startDate && endDate) {
     
      const differenceInTime = endDate.getTime() - startDate.getTime()
      const differenceInDays = differenceInTime / (1000 * 3600 * 24) 
      const total = nochesAlojamiento * differenceInDays

     
      const Totalincludingfees = total < 0 ? 0 : total
      const totalFinal = Totalincludingfees + Cleaningfee + 27

      setTotalPrice(totalFinal)
    } else {
      setTotalPrice(0) 
    }
  }

  
  useEffect(() => {
    calculateTotalPrice()
  }, [startDate, endDate])

  
  const handleReservation = async () => {
    const token = localStorage.getItem('token')
    if (!token) {
      setErrorAlarm(true)
      return
    }

    
    const accommodationid = localStorage.getItem('selectedAccommodationId')
    if (!accommodationid) {
      console.error('No se encontró el accommodationid en localStorage')
      return
    }

    
    let usersid = localStorage.getItem('usersid') 
    if (!usersid) {
      try {
        const tokenPayload = JSON.parse(atob(token.split('.')[1])) 
        usersid = tokenPayload.id 
      } catch (error) {
        console.error('Error al decodificar el token:', error)
        return
      }
    }

    if (startDate && endDate) {
      const reservationData = {
        startDate,
        endDate,
        price: totalPrice,
        usersid,
        accommodationid 
      }

      try {
        const response = await fetch('https://littlejapan.onrender.com/api/reserves', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
          },
          body: JSON.stringify(reservationData)
        })

        const data = await response.json()
        if (response.ok) {
          setReserveConfirmed(true)
          setTimeout(() => {
            navigate('/')
          }, 1500)
        } else {
          console.error('Error en la reserva:', data.error)
        }
      } catch (error) {
        console.error('Error en la petición:', error)
      }
    } else {
      alert('Please select start and end dates.')
    }
  }

  return (
    <article className='reserva-container'>
      <p>{nochesAlojamiento}€ / night</p>
      <p>Guests: {huespedes}</p>
      <p>Cleaning fees: 17€</p>
      <p>Administrative fees: 27€</p>
      <div className='date-picker-container'>
        <label>Select dates:</label>
        <div className='date-picker-wrapper'>
          <DatePicker
            selected={startDate}
            onChange={(date) => setStartDate(date)}
            selectsStart
            startDate={startDate}
            endDate={endDate}
            placeholderText='Start date'
            dateFormat='dd/MM/yyyy'
            highlightDates={reservedDates.map((date) => ({
              'react-datepicker__day--highlighted': date.start
            }))}
          />

          <DatePicker
            selected={endDate}
            onChange={(date) => setEndDate(date)}
            selectsEnd
            startDate={startDate}
            endDate={endDate}
            minDate={startDate}
            placeholderText='End date'
            dateFormat='dd/MM/yyyy'
            highlightDates={reservedDates.map((date) => ({
              'react-datepicker__day--highlighted': date.end
            }))}
          />
        </div>
      </div>

      <div className='total-price'>
        <h3>Total: {totalPrice}€</h3>
      </div>

      <button className='reservaButton' onClick={handleReservation}>
        Reserve
      </button>

      {reserveConfirmed && <AlarmReservation />}
      {errorAlarm && (
        <p className='error-alarm'>You must log in to make a reservation.</p>
      )}
    </article>
  )
}

export default ReservaView
