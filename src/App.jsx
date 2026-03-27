import {Route, Routes } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

import Home from './pages/home'
import Signup from './pages/signup'
import Login from './pages/login' 
import NavBar from './components/NavBar'
import Project from './pages/Project'
import CreateProjectForm from './components/CreateProjectForm'
import DeleteProject from './components/DeleteProject'
import { useAppContext } from './context/AppContext'

function App() {
  const {PrivateRoute} = useAppContext()
  return (
    <>
    <ToastContainer />
    <NavBar/>
    <Routes>
      <Route path='/' element={<Home/>} />
      <Route path='/signup' element={<Signup/>} />
      <Route path='/login' element={<Login/>}/>
      <Route path='/project' element={<Project/>} />
      <Route path='/create-project' element={<PrivateRoute element={<CreateProjectForm/>} />} />
      <Route path='/delete-project' element={<DeleteProject/>} />
    </Routes>
    </>
  )
}

export default App
