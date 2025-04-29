import React, { useState } from 'react'
import { NavLink } from 'react-router-dom'
import DropDownMenu from '../dropDownMenu/dropDownMenu'
import './header.css'

function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const toggleMenu = () => {
    setIsMenuOpen((prevState) => !prevState) 
  }

  return (
    <header>
      <h1>
        <NavLink to='/'>
          LITTERU<span className='kanji'>京</span>JAPAN
        </NavLink>
      </h1>
      <div className='ButtonMenu'>
        <NavLink to='/resandfav'>
          <img src='/assets/lugaresHeroe/cesta.png' alt='' />
        </NavLink>
        <img
          src='/assets/lugaresHeroe/lista.png'
          alt=''
          onClick={toggleMenu}
          className='menu-icon'
        />
      </div>
      <DropDownMenu isOpen={isMenuOpen} onClose={toggleMenu} />
    </header>
  )
}

export default Header
