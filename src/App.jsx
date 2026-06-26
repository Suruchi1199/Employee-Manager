import React, { useContext, useEffect, useState } from 'react'
import Login from './components/Auth/Login'
import EmployeeDashboard from './components/Dashboard/EmployeeDashboard'
import AdminDashboard from './components/Dashboard/AdminDashboard'
import { AuthContext } from './context/AuthProvider'
import { buildTaskState, calculateTaskCounts } from './utils/localStorage'

const App = () => {

  const [user, setUser] = useState(null)
  const [loggedInUserEmail, setLoggedInUserEmail] = useState('')
  const [userData, setUserData] = useContext(AuthContext)

  const loggedInUserData = user === 'employee'
    ? userData?.find((employee) => employee.email === loggedInUserEmail) || null
    : null

  useEffect(()=>{
    const loggedInUser = localStorage.getItem('loggedInUser')
    
    if(loggedInUser){
      const parsedUser = JSON.parse(loggedInUser)
      setUser(parsedUser.role)
      setLoggedInUserEmail(parsedUser.email || '')
    }

  },[])


  const handleLogin = (email, password) => {
    if (email == 'admin@example.com' && password == '123') {
      setUser('admin')
      setLoggedInUserEmail('')
      localStorage.setItem('loggedInUser', JSON.stringify({ role: 'admin' }))
    } else if (userData) {
      const employee = userData.find((e) => email == e.email && e.password == password)
      if (employee) {
        setUser('employee')
        setLoggedInUserEmail(employee.email)
        localStorage.setItem('loggedInUser', JSON.stringify({ role: 'employee', email: employee.email }))
      } else {
        alert("Invalid Credentials")
      }
    }
    else {
      alert("Invalid Credentials")
    }
  }

  const updateEmployeeTasks = (employeeId, taskIndex, status) => {
    setUserData((prevData) => (prevData || []).map((employee) => {
      if (employee.id !== employeeId) {
        return employee
      }

      const updatedTasks = employee.tasks.map((task, currentIndex) => (
        currentIndex === taskIndex ? buildTaskState(status, task) : task
      ))

      return {
        ...employee,
        tasks: updatedTasks,
        taskCounts: calculateTaskCounts(updatedTasks),
      }
    }))
  }


  return (
    <>
      {!user ? <Login handleLogin={handleLogin} /> : ''}
      {user == 'admin' ? <AdminDashboard changeUser={setUser} /> : (user == 'employee' && loggedInUserData ? <EmployeeDashboard changeUser={setUser} data={loggedInUserData} updateEmployeeTasks={updateEmployeeTasks} /> : null) }
    </>
  )
}

export default App
