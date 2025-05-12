const deleteReservation = async (reservationId, token, setReservations) => {
  const confirmDelete = window.confirm(
    'Are you sure you want to delete this reservation?'
  )
  if (!confirmDelete) return

  try {
    const response = await fetch(
      `https://littlejapan.onrender.com/api/reserves/${reservationId}`,
      {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` }
      }
    )

    if (!response.ok) throw new Error('Error deleting reservation')

    
    setReservations((prevReservations) =>
      prevReservations.filter((res) => res.id !== reservationId)
    )
  } catch (error) {
    console.error('Error deleting reservation:', error)
  }
}

export default deleteReservation
