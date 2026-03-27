import React, {useState} from 'react'
import { useAppContext } from '../context/AppContext'
import { handleSuccess, handleError } from '../utils/toasts.js'
import { useNavigate } from 'react-router-dom'

const apiUrl = import.meta.env.VITE_BACKEND_URI;

function CreateProjectForm() {
  const { user, storeProject } = useAppContext()
  const [projectInfo, setProjectInfo] = useState({ projectName: '', githubUrl: '' })
  const navigate = useNavigate()

  const project = localStorage.getItem('project')

  const handlechange = (e) => {
    const { name, value } = e.target
    setProjectInfo(prev => ({ ...prev, [name]: value }))
  }
  const handleSumbit = async (e) => {
    e.preventDefault()
    const { projectName, githubUrl } = projectInfo
    const email = user?.email
    try{
        const uri = `${apiUrl}/project/create-project`
        const response = await fetch(uri,{
            method:'POST',
            credentials: 'include',
            headers: {
            'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                projectName: projectName,
                githubUrl: githubUrl,
                email: email
            })
        })
        const res = await response.json()
        storeProject(res.project)
        handleSuccess("Project is being uploaded")
        setTimeout( () => {
          navigate('/project')
        }, 1000 )
    }catch(e){
        handleError(e)
    }
  }

  const goToProj = () => {
    navigate('/project')
  }

  return (
    <>
    {project?(
    <div className='flex items-center justify-center h-[93vh] bg-gradient-to-br from-blue-50 to-indigo-100'>
      <div className='w-full max-w-md bg-white rounded-lg shadow-lg p-8'>
        <h1 className='text-3xl font-bold text-gray-800 mb-6 text-center'>You Already Have a Project</h1>
        <p className='text-gray-600 text-center mb-8'>You already have an active project. Click below to view and manage it.</p>
        <button onClick={goToProj} className='w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2.5 rounded-lg transition duration-200'>Go to Project</button>
      </div>
    </div>  
    ):(
    <div className='flex items-center justify-center h-[93vh] bg-gradient-to-br from-blue-50 to-indigo-100'>
      <div className='w-full max-w-md bg-white rounded-lg shadow-lg p-8'>
        <h1 className='text-3xl font-bold text-gray-800 mb-8 text-center'>Create Project</h1>
        <form onSubmit={handleSumbit} className='space-y-6'>
          <div className='flex flex-col'>
              <label htmlFor='projectName' className='text-sm font-semibold text-gray-700 mb-2'>Project Name</label>
              <input
              value={projectInfo.projectName}
              onChange={handlechange}
              type='text'
              name='projectName'
              autoFocus
              placeholder='Enter project name'
              className='px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition'
              />
          </div>
          <div className='flex flex-col'>
              <label htmlFor='githubUrl' className='text-sm font-semibold text-gray-700 mb-2'>GitHub Url</label>
              <input
              value={projectInfo.githubUrl}
              onChange={handlechange}
              type='text'
              name='githubUrl'
              autoFocus
              placeholder='https://github.com/user/repo'
              className='px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition'
              />
          </div>
          <button type='submit' className='w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2.5 rounded-lg transition duration-200'>Create</button>
        </form>    
      </div>
    </div>      
    )}
    </>

  )
}

export default CreateProjectForm
