import React from 'react'
import { useNavigate } from 'react-router-dom'

function ProjectInfoSec({project}) {
  const navigate = useNavigate()
  const handleDelete = () => {
    navigate('/delete-project')
  }

  return (
    <div className="h-[40%] bg-white rounded-2xl shadow-md p-6 overflow-auto">
        <h1 className="text-2xl font-semibold mb-4">Project Info</h1>
        <div className="space-y-2 text-gray-700">
            <p>
            <span className="font-medium">GitHub URL: </span>
            <span className="text-blue-600">{project.git_url}</span>
            </p>
            <p>
            <span className="font-medium">Name: </span>
            {project.name}
            </p>
            <p>
            <span className="font-medium">Url: </span>
            {project.proj_url}
            </p>
            <p>
            <span className="font-medium">Created At: </span>
            {new Date(project.createdAt).toLocaleDateString()}
            </p>
            <p>
            <span className="font-medium">Updated At: </span>
            {new Date(project.updatedAt).toLocaleDateString()}
            </p>
        </div>
        {/* Actions */}
        <div className="flex gap-4 mt-6">
            <button onClick={handleDelete} className="px-4 py-2 rounded-lg bg-red-500 text-white hover:bg-red-600 transition">
            Delete Project
            </button>
            <button className="px-4 py-2 rounded-lg bg-blue-500 text-white hover:bg-blue-600 transition">
            Update Project
            </button>
        </div>
    </div>
  )
}

export default ProjectInfoSec
