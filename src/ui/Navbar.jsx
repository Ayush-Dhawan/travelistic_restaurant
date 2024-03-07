import React from 'react'
import { NavLink } from 'react-router-dom'
import './Navbar.css'
import { BsCart3 } from "react-icons/bs";
import { FaRegUser } from "react-icons/fa";

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
      <div className='flex gap-5'>
      <NavLink to={'#'}><BsCart3 size={'1.5em'} /></NavLink>
      <NavLink to="/signUp"><FaRegUser size={'1.5em'} /></NavLink>
      </div>
    </nav>
  )
}

export default Navbar
