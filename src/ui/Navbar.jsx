import React from 'react'
import { NavLink } from 'react-router-dom'
import './Navbar.css'
import { BsCart3 } from "react-icons/bs";
import {useSelector} from 'react-redux'
import { IoSunnyOutline } from "react-icons/io5";
import { useDarkModeContext } from '../contexts/DarkmodeContext';
import { BsMoon } from "react-icons/bs";
import { MdOutlineSettings } from "react-icons/md";
import { RiLogoutBoxLine } from "react-icons/ri";
import { RiLoginBoxLine } from "react-icons/ri"; 
import { FaHistory } from "react-icons/fa";
import {useDispatch} from 'react-redux'
import { updateUser } from '../features/user/userSlice';
import {useNavigate} from 'react-router-dom'

function Navbar() {
  const userStateString = localStorage.getItem("userState");
  // Parse the JSON string into an object
  const userState = JSON.parse(userStateString);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const username = userState?.fullName;
  const isLoggedIn = userState?.isLoggedIn;
  // const address = useSelector(state => state.user.address)
  const {isDarkMode, toggleDarkMode} = useDarkModeContext();

  function handleLogOut(){
    dispatch(updateUser("", "", "", false));
    navigate('/')
    alert("Succesfully Logged Out")
  }
  return (
    <nav className='flex items-center justify-around font-semibold text-xl font-nav'>
       <NavLink to='/'> <img src='/myLogo-dark.png' alt='logo' height={120} width={120} /></NavLink>
        <div className='rounded-lg overflow-hidden w-[35%]'>
            <div className='flex items-center justify-evenly w-full  nav-box-animate p-5'>
                    {/* <NavLink to={'/'}>Home</NavLink> */}
                    <NavLink to={'/menu'}>Menu</NavLink>
            </div>
      </div>
      <div className='flex gap-5'>
      {isLoggedIn && <NavLink to='/cart'><BsCart3 size={'1.25em'} /></NavLink>}
      {isLoggedIn && <NavLink to="/settings"><MdOutlineSettings size={'1.75rem'} /></NavLink> }
      {isLoggedIn && <NavLink to="/orderHistory"><FaHistory size={'1.75rem'} /></NavLink>}
      <NavLink onClick={toggleDarkMode} to="#">{isDarkMode ? <IoSunnyOutline size={'1.75rem'} /> : <BsMoon size="1.75rem" />}</NavLink>
      {!isLoggedIn ? <NavLink to="/signUp"><RiLoginBoxLine size={'1.25em'} /></NavLink> : <span className='cursor-pointer' onClick={handleLogOut}><RiLogoutBoxLine size={'1.75rem'} /></span>}
      {username && <span className='text-sm text-gray-200 font-semibold hidden md:block '><span className='text-xs'>welcome</span>, <br />{username}</span> }
      </div>  
    </nav>
  )
}

export default Navbar
