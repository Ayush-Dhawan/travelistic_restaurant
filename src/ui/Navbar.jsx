import React from 'react'
import { NavLink } from 'react-router-dom'
import './Navbar.css'
import { BsCart3 } from "react-icons/bs";

function Navbar() {
  return (
    <nav className='flex items-center justify-around font-semibold text-xl font-nav'>
        <img src='/myLogo-dark.png' alt='logo' height={120} width={120} />
        <div className='rounded-lg overflow-hidden w-[35%]'>
            <div className='flex items-center justify-evenly w-full  nav-box-animate p-5'>
                    <NavLink to={'/'}>Home</NavLink>
                    <NavLink to={'/menu'}>Menu</NavLink>
            </div>
      </div>
      <NavLink to={'#'}><BsCart3 size={'2em'} /></NavLink>
    </nav>
  )
}

export default Navbar
