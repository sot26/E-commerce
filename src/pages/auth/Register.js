import React from 'react'
import { Link } from 'react-router-dom'
import register from '../../assets/register.png'

const Register = () => {
  return (
    <div className='w-full h-full'>
    <div className='w-full flex items-center justify-center px-10 h-[100vh]'>
      <div className=' shadow-xl rounded-xl w-auto'>
      <div className='px-4'>
        <p className='text-5xl font-semibold text-orange-600 text-center py-4'>Register</p>
        <form className='flex flex-col min-w-[300px] sm:w-[400px] text-2xl'>
          <input type='text' placeholder='Username' className='p-2 border-2 h-[45px] my-3 rounded-lg' required/>
          <input type='password' placeholder='Password' className='p-2 border-2 h-[45px] my-3 rounded-lg' required/>
          <input type='password' placeholder='Confirm password' className='p-2 border-2 h-[45px] my-3 rounded-lg' required/>
          <button className='bg-blue-600 h-[40px] text-white text-2xl font-semibold rounded-lg my-2'>Register</button>
        </form>
        <p className='text-2xl pt-3 pb-6'>Don't have an account, <Link to='/login' className='font-bold'>Login</Link></p>
      </div>
      </div>
      <div className='hidden md:flex h-[600px]'>
        <img src={register} alt='register' className=''/>
      </div>
    </div>
  </div>
  )
}

export default Register