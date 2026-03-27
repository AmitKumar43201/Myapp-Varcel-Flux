import React, {useEffect}  from 'react'
import { useNavigate } from 'react-router-dom'
import { useAppContext } from '../context/AppContext'

function NavBar() {
  const {user, clearUser} = useAppContext()
  const navigate = useNavigate()
  const handleLogout = () => {
    clearUser()
    setTimeout(() => {
      navigate('/')
    }, 1000)
  }

  useEffect( () => {
    const user = localStorage.getItem('name')
    console.log('loggedin user: ', user)
  }, [])

  return (
    <div>
      <nav className='flex bg-amber-50 flex-row h-[7vh] items-center justify-between px-[400px]' >
        <div>
          <a href='/' ><p className='text-lg font-bold' >Varcel-Flux</p></a>
        </div>
        <div><a href='/project' >Projects</a></div>
        <div className='flex flex-row items-center justify-evenly gap-2.5' >
          {user ? (
             <button onClick={handleLogout} >Logout</button>
          ):(
          <>  
          <a href='/signup' >Signup</a>
          <a href='/login' >Login</a>
          </>
          )}
        </div>
      </nav>
    </div>
  )
}

export default NavBar
