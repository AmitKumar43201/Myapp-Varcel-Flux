import React from 'react'
import { useNavigate } from 'react-router-dom'
import { handleSuccess, handleError } from '../utils/toasts'

const apiUrl = import.meta.env.VITE_BACKEND_URI;

function DeleteProject() {
  const navigate = useNavigate()
  const email = localStorage.getItem('email')
  const projectinfo = localStorage.getItem('project')
  const projObj = JSON.parse(projectinfo)
  const {slug} = projObj
  
  const handleCancel = () => {
    navigate('/project')    
  }
  const handleDelete = async () => {
    try{
        const uri = `${apiUrl}/project/delete-project`
        const response = await fetch(uri,{
            method:'POST',
            credentials: 'include',
            headers: {
            'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email: email,
                projectSlug: slug
            })
        })
        const res = await response.json()
        handleSuccess(res.message)
        localStorage.removeItem('project')
        navigate('/')
    }catch(e){
        msg = e.error || "delete unsuccessfull"
        handleError(msg)
    }
  }
  return (
    <div className='flex items-center justify-center h-[93vh] bg-gradient-to-br from-blue-50 to-indigo-100'>
      <div className='w-full max-w-md bg-white rounded-lg shadow-lg p-8'>
        <h1 className='text-3xl font-bold text-gray-800 mb-8 text-center'>Delete Project?</h1>
        <p className='text-gray-600 text-center mb-8'>Are you sure you want to delete this project? This action cannot be undone.</p>
        <div className='flex gap-4'>
            <button onClick={handleCancel} className='flex-1 bg-gray-300 hover:bg-gray-400 text-gray-800 font-semibold py-2.5 rounded-lg transition duration-200'>Cancel</button>
            <button onClick={handleDelete} className='flex-1 bg-red-600 hover:bg-red-700 text-white font-semibold py-2.5 rounded-lg transition duration-200'>Delete</button>
        </div>
      </div>
    </div>
  )
}

export default DeleteProject
