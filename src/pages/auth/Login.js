import React from 'react'
import { FaGoogle } from 'react-icons/fa'
import { Link } from 'react-router-dom'
import login from '../../assets/login.png'

const Login = () => {
  return (
    <div className='w-full h-full'>
      <div className='w-full flex items-center justify-center px-10 h-[100vh]'>
        <div className='hidden md:flex h-[600px]'>
          <img src={login} alt='login' className=''/>
        </div>
        <div className=' shadow-xl rounded-xl w-auto'>
        <div className='px-4'>
          <p className='text-5xl font-semibold text-orange-600 text-center py-4'>Login</p>
          <form className='flex flex-col min-w-[300px] sm:w-[400px] text-2xl'>
            <input type='text' placeholder='Username' className='p-2 border-2 h-[45px] my-3 rounded-lg' required/>
            <input type='password' placeholder='Password' className='p-2 border-2 h-[45px] my-3 rounded-lg' required/>
            <button className='bg-blue-600 h-[40px] text-white text-xl font-semibold rounded-lg my-2'>Login</button>
          </form>
          <Link to='/reset'><p className='text-xl py-3'>Forget Password</p></Link>
          <p className='text-center text-xl'>--or--</p>
          <button className='flex bg-orange-600 h-[40px] text-white w-full items-center justify-center text-xl font-semibold mt-3 mb-6 rounded-lg'><FaGoogle size={30} className='px-2' />Login With Google</button>
          <p className='text-xl pt-3 pb-6'>Don't have an account, <Link to='/register' className='font-bold'>Register</Link></p>
        </div>
        </div>
      </div>
    </div>
  )
}

export default Login