import React from 'react'
import './Navbar.css'
import nav_logo from '../../assets/logo.png'
import nav_profile from '../../assets/logoSize.png'



function Navbar() {
  return (
    <div className='navbar'>
       <img src={nav_logo} alt="" className='nav-logo'/>
       <img src={nav_profile} alt="" className='nav-profile' />
    </div>
  )
}

export default Navbar