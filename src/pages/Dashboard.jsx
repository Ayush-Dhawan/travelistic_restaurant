import React from 'react'
import Navbar from '../ui/Navbar'
import DashBoardLayout from '../features/dashboard/DashBoardLayout'

export default function Dashboard() {
  return (
   <>
        <Navbar />
    <div className='h-[86vh] w-screen flex items-center justify-center'>
      <DashBoardLayout />
    </div>
   </>
  )
}
