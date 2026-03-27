import React, {useState} from 'react'
import { Link, useNavigate } from 'react-router-dom'

import { handleSuccess, handleError } from '../utils/toasts.js'
import { useAppContext } from '../context/AppContext.jsx'


const apiUrl = import.meta.env.VITE_BACKEND_URI;


function login() {

  const navigate = useNavigate()

  const [loginInfo, setLoginInfo] = useState({
        email:'',
        password: ''
    })

  const {storeUser} = useAppContext()

  const handlechange = (e) => {
        const {name, value} = e.target;
        const copyLoginInfo = {...loginInfo}
        copyLoginInfo[name] = value
        setLoginInfo(copyLoginInfo)
    }
  
  const handleSumbit = async (e) => {
    e.preventDefault()
    const {email, password} = loginInfo
    if (!email || !password) {
      return handleError('email, or password is missing')
    }
    try {

      const uri = `${apiUrl}/auth/signin`
      const response = await fetch(uri,{
        method:'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(loginInfo)
      })

      console.log('Data sent',JSON.stringify(loginInfo))
      const res = await response.json()
      console.log('response from server: ',res)

      const {success, message, email, name, jwToken, } = res
      if (success) {
        handleSuccess(message)
        setLoginInfo({email: '', password: ''})
        console.log("user info: ", res)
        storeUser(res)
        setTimeout(() => navigate('/'), 1000)
      }
    } catch (err) {
      console.error('Error:', err)
      handleError(err.message || 'An error occurred during signup')
    }
  }

  return (
    <div className='flex items-center justify-center h-[93vh] bg-gradient-to-br from-blue-50 to-indigo-100'>
      <div className='w-full max-w-md bg-white rounded-lg shadow-lg p-8'>
        <h1 className='text-3xl font-bold text-gray-800 mb-8 text-center'>Login</h1>
        <form onSubmit={handleSumbit} className='space-y-6'>
          <div className='flex flex-col'>
              <label htmlFor='email' className='text-sm font-semibold text-gray-700 mb-2'>Email</label>
              <input
              value={loginInfo.email}
              onChange={handlechange}
              type='text'
              name='email'
              autoFocus
              placeholder='example@gmail.com'
              className='px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition'
              />
          </div>
          <div className='flex flex-col'>
              <label htmlFor='password' className='text-sm font-semibold text-gray-700 mb-2'>Password</label>
              <input
              value={loginInfo.password}
              onChange={handlechange}
              type='text'
              name='password'
              autoFocus
              placeholder='******'
              className='px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition'
              />
          </div>
          <button type='submit' className='w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2.5 rounded-lg transition duration-200'>Login</button>
          <div className='text-center'>
            <span className='text-sm text-gray-600'>Don't have an account?</span>
            <Link to='/signup' className='text-blue-600 hover:text-blue-700 font-semibold ml-1'>Signup</Link>  
          </div>
        </form>    
      </div>
    </div>
  )
}

export default login
