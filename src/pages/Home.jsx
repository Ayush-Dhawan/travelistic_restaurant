import React from 'react'
import MenuGrid from '../features/menu/MenuGrid'
import Navbar from '../ui/Navbar'
import Hero from '../ui/Hero';
import { NavLink } from 'react-router-dom';

function Home() {
  return (
    <div>
    <Navbar />
    <HeroSection />
    
    </div>
  )
}



function HeroSection(){
  return (
    <div className="h-[40rem] w-screen rounded-md bg-neutral-950 relative flex flex-col items-center justify-center antialiased">
      <div className="max-w-2xl mx-auto p-4">
        <h1 className="relative z-10 text-lg md:text-5xl  bg-clip-text text-transparent bg-gradient-to-b from-neutral-200 to-[#4e46e5]  text-center font-sans font-bold">
          The Best Restaurant in Town
        </h1>
        <p></p>
        <p className="text-neutral-500 max-w-lg mx-auto my-2 text-sm text-center relative z-10">
        ⏳ Embark on a journey with us at Travelistic! ⚓✨ In just a few seconds, the cosmic spectacle will unfold, revealing shooting stars and cosmic wonders. Stay enchanted, make a wish, and let the  flavors dance across your palate, creating a culinary constellation that paints your dining experience with unforgettable moments. 🍽️✨ Stay a little longer and savor the celestial symphony at Travelistic. ✨🌌 Bon appétit! 🌌✈️✨ <br />
        <Btn label="Get Started" />
        </p>

      </div>
      <Hero />
    </div>
  );
}

export default Home


function Btn({label}){
  return (
    <NavLink to={'/menu'}>
      <button className="bg-slate-800 p-[0.1rem] mt-5 no-underline group cursor-pointer relative shadow-2xl shadow-zinc-900 rounded-full text-xs font-semibold leading-6  text-white inline-block">
  <span className="absolute inset-0overflow-hidden rounded-full">
    <span className="absolute inset-0 rounded-full bg-[image:radial-gradient(75%_100%_at_50%_0%,rgba(56,189,248,0.6)_0%,rgba(56,189,248,0)_75%)] opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
  </span>
  <div className="relative flex space-x-2 items-center z-10 rounded-full bg-zinc-950 py-0.5 px-4 ring-1 ring-white/10 ">
    <span className='m-3 bg-zinc-950'>
      {label}
    </span>
    <svg
    className='bg-zinc-950'
      fill="none"
      height="16"
      viewBox="0 0 24 24"
      width="16"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M10.75 8.75L14.25 12L10.75 15.25"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.5"
      />
    </svg>
  </div>
  <span className="absolute -bottom-0 left-[1.125rem] h-px w-[calc(100%-2.25rem)] bg-gradient-to-r from-emerald-400/0 via-emerald-400/90 to-emerald-400/0 transition-opacity duration-500 group-hover:opacity-40" />
</button>
    </NavLink>
  )
}
