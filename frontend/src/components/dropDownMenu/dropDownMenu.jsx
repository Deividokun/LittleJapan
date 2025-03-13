import React from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import './dropDownMenu.css'

function DropDownMenu({ isOpen, onClose }) {
  const navigate = useNavigate()

  // Check if the user is authenticated via token
  const isLoggedIn = Boolean(localStorage.getItem('token'))

  const handleLogout = () => {
    localStorage.removeItem('token') // Remove the token when logging out
    onClose()
    navigate('/') // Redirect to the homepage
  }

  return (
    <div className={`dropdown-menu ${isOpen ? 'open' : ''}`}>
      <ul>
        <li>
          <NavLink to='/' onClick={onClose}>
            Home
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
