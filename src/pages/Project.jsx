import React from "react";
import { useAppContext } from "../context/AppContext";
import CreateProjectForm from "../components/CreateProjectForm";
import ProjectInfoSec from "../components/ProjectInfoSec";
import LogViewer from "../components/LogViewer";

function Project() {
  
  const {user} = useAppContext()
  const projectLogs = localStorage.getItem('project')
  return (
    <>
    {user?.project? (
        <div className="h-screen flex flex-col bg-gray-100 ml-[280px] mr-[280px]">
            {/* Main Content */}
            <div className="flex-1 flex flex-col p-6 gap-4">
                {/* Project Info (40%) */}
                <ProjectInfoSec project={user.project} />
                {/* Logs (60%) */}
                <LogViewer email={user.email} />
                
            </div>
        </div>    
    ):(
        <div className='flex items-center justify-center h-[93vh] bg-gradient-to-br from-gray-50 to-blue-50'>
           <div className='text-center'>
             <h1 className='text-4xl font-bold text-gray-800 mb-4'>No Projects Yet</h1>
             <p className='text-lg text-gray-600 mb-8'>Get started by creating your first project</p>
             <a href='/create-project' className='inline-block bg-blue-600 hover:bg-blue-700 text-white font-semibold px-8 py-3 rounded-lg transition duration-200 shadow-md hover:shadow-lg'>
               Create Project
             </a>
           </div>
        </div>
    )}
    </>
  );
}

export default Project;