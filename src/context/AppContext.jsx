import {createContext, useContext, useEffect, useState } from "react";
import { Navigate } from "react-router-dom";

const AppContext = createContext()

export const AppContextProvider = ({children}) => {
    const [isAuthenticated, setIsAuthenticated] = useState(() => {
        const name = localStorage.getItem('name')
        const email = localStorage.getItem('email')
        return !!(email && name)
    })
    const [user, setUser] = useState(null)

    useEffect( () => {
        const name = localStorage.getItem('name')
        const email = localStorage.getItem('email')
        if (email && name){
        setIsAuthenticated(true)
        }
    }, [user] )

    const PrivateRoute = ({element}) => {
    return isAuthenticated? element: <Navigate to='/login'/>
    }
    
    const storeProject = (data) => {
        localStorage.setItem('project', JSON.stringify(data))
        setUser(prev => ({ ...prev, project: data }))
    }

    const addProjectLogs = (message) => {
        const item = localStorage.getItem("project")
        if (item){
        const itemObj = JSON.parse(item)
        itemObj.logs.unshift(message)
        localStorage.removeItem("project")
        storeProject(itemObj)            
        }else{
            console.log("No project in local storage")
        }
    }

    const storeUser = (userData) => {
        const { name, email, project } = userData || {}
        if (name && email ) {
            localStorage.setItem('name', name)
            localStorage.setItem('email', email)
            if (project) {
                storeProject(project)
            } else {
                localStorage.removeItem('project')
            }
            setUser({ name, email, project })
        }
    }

    const clearUser = () => {
        localStorage.removeItem('name')
        localStorage.removeItem('email')
        localStorage.removeItem('project')
        setUser(null)
    }
    
    useEffect( () => {
        const name = localStorage.getItem('name')
        const email = localStorage.getItem('email')
        const projectString = localStorage.getItem('project')
        const project = projectString ? JSON.parse(projectString) : null
        if (name && email){
            setUser({name, email, project})
        }else{
            setUser(null)
        }
    }, [] )

    const value = {user, clearUser, storeUser, storeProject, PrivateRoute, addProjectLogs}
    return (
        <AppContext.Provider value={value} >
            {children}
        </AppContext.Provider>
    )
}

export const useAppContext = () => useContext(AppContext)