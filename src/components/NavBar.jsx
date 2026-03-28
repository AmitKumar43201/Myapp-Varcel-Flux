import React, {useEffect}  from 'react'
import { useNavigate } from 'react-router-dom'
import { useAppContext } from '../context/AppContext'
import { Link } from 'react-router-dom'

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
          <Link to='/' ><p className='text-lg font-bold' >Varcel-Flux</p></Link>
        </div>
        <div><Link to='/project' >Projects</Link></div>
        <div className='flex flex-row items-center justify-evenly gap-2.5' >
          {user ? (
             <button onClick={handleLogout} >Logout</button>
          ):(
          <>  
          <Link to='/signup' >Signup</Link>
          <Link to='/login' >Login</Link>
          </>
          )}
        </div>
      </nav>
    </div>
  )
}

export default NavBar
