import React, { useEffect, useState } from 'react'

function AlertLogin() {
  const [isLoggedIn, setIsLoggedIn] = useState(false)

  useEffect(() => {
    const token = localStorage.getItem('token')
    setIsLoggedIn(!!token)
  }, [])

  return (
    <div>
      {!isLoggedIn && (
        <div style={styles.alert}>
          You need to be logged in to access this option.
        </div>
      )}
    </div>
  )
}

// Estilos en línea para la alerta
const styles = {
  alert: {
    padding: '10px',
    margin: '10px auto',
    color: '#fff',
    backgroundColor: '#f44336',
    borderRadius: '5px',
    textAlign: 'center',
    fontWeight: 'bold',
    maxWidth: '400px'
  }
}

export default AlertLogin
