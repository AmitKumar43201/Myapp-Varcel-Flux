import React, {useState} from 'react'
import { Link, useNavigate } from 'react-router-dom'

import { handleSuccess, handleError } from '../utils/toasts.js'
import { useAppContext } from '../context/AppContext.jsx'

const apiUrl = import.meta.env.VITE_BACKEND_URI;

function signup() {
  const navigate = useNavigate()
  const {storeUser} = useAppContext()
  const [signupInfo, setSignupInfo] = useState({
        name: '',
        email:'',
        password: ''
    })
  const handlechange = (e) => {
        const {name, value} = e.target;
        const copySignupInfo = {...signupInfo}
        copySignupInfo[name] = value
        setSignupInfo(copySignupInfo)
    }

  const handleSumbit = async (e) => {

    e.preventDefault()
    const {name, email, password} = signupInfo
    if (!name || !email || !password) {
      return handleError('name, email, or password is missing')
    }

    try {
      const uri = `${apiUrl}/auth/signup`
      const response = await fetch(uri,{
        method:'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(signupInfo)
      })

      console.log('Data sent',JSON.stringify(signupInfo))
      const res = await response.json()
      console.log('response from server: ',res)
      
      if (response.ok) {
        handleSuccess(res.message || 'Signup Successful!')
        setSignupInfo({name: '', email: '', password: ''})
        storeUser(res)
        setTimeout(() => navigate('/'), 1000)
      } else {
        handleError(res.message || 'Signup failed')
      }

    } catch (err) {
      console.error('Error:', err)
      handleError(err.message || 'An error occurred during signup')
    }
  }

  return (
    <div className='flex items-center justify-center h-[93vh] bg-gradient-to-br from-green-50 to-emerald-100'>
      <div className='w-full max-w-md bg-white rounded-lg shadow-lg p-8'>
        <h1 className='text-3xl font-bold text-gray-800 mb-8 text-center'>Signup</h1>
        <form onSubmit={handleSumbit} className='space-y-6'>
          <div className='flex flex-col'>
              <label htmlFor='name' className='text-sm font-semibold text-gray-700 mb-2'>Name</label>
              <input
              value={signupInfo.name}
              onChange={handlechange}
              type='text'
              name='name'
              autoFocus
              className='px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none transition'
              />
          </div>
          <div className='flex flex-col'>
              <label htmlFor='email' className='text-sm font-semibold text-gray-700 mb-2'>Email</label>
              <input
              value={signupInfo.email}
              onChange={handlechange}
              type='text'
              name='email'
              autoFocus
              className='px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none transition'
              />
          </div>
          <div className='flex flex-col'>
              <label htmlFor='password' className='text-sm font-semibold text-gray-700 mb-2'>Password</label>
              <input
              value={signupInfo.password}
              onChange={handlechange}
              type='text'
              name='password'
              autoFocus
              className='px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none transition'
              />
          </div>
          <button type='submit' className='w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-2.5 rounded-lg transition duration-200'>Signup</button>
          <div className='text-center'>
            <span className='text-sm text-gray-600'>Already have an account?</span>
            <Link to='/login' className='text-green-600 hover:text-green-700 font-semibold ml-1'>Login</Link>  
          </div>
        </form>    
      </div>
    </div>
  )
}

export default signup
