import React from 'react'

const date = new Date()
const year = date.getFullYear

const Footer = () => {
  return (
    <div className='w-full h-[80px] bg-black text-white text-2xl font-semibold flex justify-center items-center'>
        &copy; {year} All Right Reserved
    </div>
  )
}

export default Footer