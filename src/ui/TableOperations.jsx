import React from 'react'

export default function TableOperations({children}) {
  return (
    <div className='flex flex-col md:flex-row items-center mt-2 md:mt-0 w-[98%] gap-[0.5rem] md:gap-[1.6rem] justify-end'>
      {children}
    </div>
  )
}
