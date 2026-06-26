import React, { createContext, useEffect, useState } from 'react'
import { getLocalStorage, setLocalStorage, updateEmployeesStorage } from '../utils/localStorage'

export const AuthContext = createContext()

const AuthProvider = ({ children }) => {
    // localStorage.clear()

    const [userData, setUserData] = useState(null)

    useEffect(() => {
        setLocalStorage()
        const {employees} = getLocalStorage()
        setUserData(employees)
    }, [])

    useEffect(() => {
        if (userData) {
            updateEmployeesStorage(userData)
        }
    }, [userData])

    return (
        <div>
            <AuthContext.Provider value={[userData,setUserData]}>
                {children}
            </AuthContext.Provider>
        </div>
    )
}

export default AuthProvider
