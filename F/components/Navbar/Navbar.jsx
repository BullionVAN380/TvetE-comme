import React, { useContext, useRef, useState } from 'react'
import "./Navbar.css"
import { Link } from 'react-router-dom'
import logo from '../Assets/logo.png'
import cart_icon from '../Assets/cart_icon.png'
import { ShopContext } from '../Context/ShopContext'
import nav_drop from '../Assets/dropdown_icon.png'

export const Navbar = () => {
  const [menu, setMenu] = useState("shop");
  const { getTotalCountItems } = useContext(ShopContext);
  const menuRef = useRef();

  const dropdown_toggle = (e) => {
    menuRef.current.classList.toggle('nav-menu-visible');
    e.target.classList.toggle('open');
  }
  return (
    <div className='navbar'>
      <div className="nav-logo">
        <img src={logo} alt="" />
        <p>JBM COLLECTION</p>
      </div>
      <img className='nav-dropdown' onClick={dropdown_toggle} src={nav_drop} alt="" />
      <ul ref={menuRef} className='nav-menu'>
        <li onClick={() => { setMenu("shop") }}><Link to="/" style={{ textDecoration: 'none' }}>Home</Link>{menu === "shop" ? <hr /> : <></>}</li>
        <li onClick={() => { setMenu("mens") }}><Link to="/mens" style={{ textDecoration: 'none' }}>Men</Link>{menu === "mens" ? <hr /> : <></>}</li>
        <li onClick={() => { setMenu("womens") }}><Link to="/womens" style={{ textDecoration: 'none' }} >Women</Link>{menu === "womens" ? <hr /> : <></>}</li>
        <li onClick={() => { setMenu("kids") }}><Link to="/kids" style={{ textDecoration: 'none' }} >Kid</Link>{menu === "kids" ? <hr /> : <></>}</li>
      </ul>
      <div className="nav-logo-cart">
        {localStorage.getItem('auth-token') ? <button
          onClick={() => {
            localStorage.removeItem('auth-token'); window.location.replace
              ('./')
          }}>LogOut</button> : <Link to="/Login"><button>Login</button></Link>}
        <Link to="/Cart"><img src={cart_icon} alt="" /></Link>
        <div className="nav-cart-count">{getTotalCountItems()}</div>
      </div>
    </div>
  )
}
