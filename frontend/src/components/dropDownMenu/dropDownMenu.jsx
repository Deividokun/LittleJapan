import React, { useEffect, useRef } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import './dropDownMenu.css'

function DropDownMenu({ isOpen, onClose }) {
  const navigate = useNavigate()
  const menuRef = useRef(null)

  // Check if the user is authenticated via token
  const isLoggedIn = Boolean(localStorage.getItem('token'))
  console.log('isLoggedIn:', isLoggedIn)
  const handleLogout = () => {
    localStorage.removeItem('token') // Remove the token when logging out
    onClose()
    navigate('/') // Redirect to the homepage
  }

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        onClose()
      }
    }

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside)
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [isOpen, onClose])

  return (
    <div ref={menuRef} className={`dropdown-menu ${isOpen ? 'open' : ''}`}>
      <ul>
        <li>
          <NavLink to='/' onClick={onClose}>
            Home
          </NavLink>
        </li>
        <li>
          <NavLink to='/array' onClick={onClose}>
            array
          </NavLink>
        </li>
        {!isLoggedIn && (
          <li>
            <NavLink to='/login' onClick={onClose}>
              Login
            </NavLink>
          </li>
        )}
        {!isLoggedIn && (
          <li onClick={onClose}>
            <NavLink to='/register'>Register</NavLink>
          </li>
        )}
        {isLoggedIn && (
          <>
            <li>
              <NavLink to='/myProfile' onClick={onClose}>
                My profile
              </NavLink>
            </li>
            <li>
              <NavLink to='/add-house' onClick={onClose}>
                Add House
              </NavLink>
            </li>
            <li>
              <NavLink to='/reserves/:id' onClick={onClose}>
                Reserves
              </NavLink>
            </li>
            <li onClick={handleLogout} className='logout-button'>
              Logout
            </li>
          </>
        )}
        <li>
          <NavLink to='/contactUs' onClick={onClose}>
            Contact Us
          </NavLink>
        </li>
        <li>
          <NavLink to='/help' onClick={onClose}>
            Help & Resources
          </NavLink>
        </li>
      </ul>
    </div>
  )
}

export default DropDownMenu
