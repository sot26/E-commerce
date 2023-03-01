import React, { useState } from 'react'
import {FaBars, FaShoppingCart, FaTimes, FaUserCircle} from 'react-icons/fa'
import { Link } from 'react-router-dom'

const Header = () => {

    const [nav, setNav] = useState(false)
  
    function navClick(){
        setNav(!nav)
    }
  return (
    <div className='h-[80px] bg-black text-white '>
        <div className='flex justify-between px-12 items-center h-full '>
            <div>
                <p className='text-[30px] font-semibold'>SOTshop</p>
            </div>
            <div className='lg:flex items-center text-[20px] hidden'>
                <button className='p-2 bg-blue-700 rounded-lg'>Admin</button>
                <Link to='/'>
                    <div className='px-2 hover:text-orange-600'>Home</div>
                </Link>
                <Link to='/contact'>
                    <div className='px-2 hover:text-orange-600'>Contact Us</div>
                </Link>
            </div>
            <div className='lg:flex items-center text-[20px] hidden '>
                {/* <span className='flex items-center px-2'>
                    <FaUserCircle />
                    <p>Hi, </p>
                </span>
                <p className='px-2'>My Orders</p> */}
                <span className='flex'>
                    <Link>
                        <p className='px-2 hover:text-orange-600'>Login</p>
                    </Link>
                    <Link>
                        <p className='px-2 hover:text-orange-600'>Register</p>
                    </Link>
                    <Link>
                        <p className='px-2 hover:text-orange-600'>My Orders</p>
                    </Link>
                </span>
                <span className='flex items-center px-2 relative hover:text-orange-600 '>
                    <FaShoppingCart />
                    <p className='absolute top-[-15px] right-[-5px] text-[18px]'>1</p>
                </span>
            </div>
            <div className='flex'>
                <span className='flex items-center pr-4 relative hover:text-orange-600 '>
                    <FaShoppingCart size={20} />
                    <p className='absolute top-[-15px] right-[5px] text-[18px]'>1</p>
                </span>
                <div onClick={navClick} className="lg:hidden z-20 px-2">
                {!nav ? <FaBars size={20} className="cursor-pointer"/> : <FaTimes size={20} className="cursor-pointer"/>}
                </div>
            </div>
            
            <ul onClick={navClick} className={!nav ? 'hidden' : 'absolute top-0 left-0 w-full h-[100vh] text-white bg-black opacity-50  py-10 shadow-md font-bold shadow-[#354259]' }>
               <div className='bg-black h-[100vh]'>
                <li className="py-6 text-3xl">
                    <a href='./register' className="cursor-pointer">Register</a>
                </li>
                <li className="py-6 text-3xl">
                    <a href='/login' className="cursor-pointer">Sign In</a>
                </li>
                <li className="py-6 text-3xl">
                    <a href='/contact' className="cursor-pointer">Help</a>
                </li>
               </div>
           </ul>
        </div>
    </div>
  )
}

export default Header