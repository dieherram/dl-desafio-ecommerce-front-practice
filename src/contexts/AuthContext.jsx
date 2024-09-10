// AuthContext.js
import { createContext, useState, useContext, useEffect } from 'react'
import axios from 'axios'
import PropTypes from 'prop-types'

const AuthContext = createContext()
const localStorage = window.localStorage
const BACKEND_URL = 'https://back-9x5b.onrender.com/'

export function AuthProvider ({ children }) {
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    // Check localStorage for authentication status on mount
    const storedAuth = localStorage.getItem('isAuthenticated')
    return storedAuth ? JSON.parse(storedAuth) : false
  })
  const [currentUser, setCurrentUser] = useState(() => {
    // Check localStorage for current user on mount
    const storedUser = localStorage.getItem('currentUser')
    return storedUser ? JSON.parse(storedUser) : null
  })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  // Login Function
  const login = async (email, password) => {
    setLoading(true)
    setError(null)

    try {
      const response = await axios.post(BACKEND_URL + 'login', { email, password })

      console.log(response)
      const token = response.data.token
      const userData = response.data.user
      console.log(userData)

      // Store token and user data in localStorage
      localStorage.setItem('token', token)
      localStorage.setItem('currentUser', JSON.stringify(userData))

      // Update authentication state
      localStorage.setItem('isAuthenticated', 'true')
      setIsAuthenticated(true)
      setCurrentUser(userData)

      // Successful login
      return true
    } catch (error) {
      setError(error.response.data.message)
      console.error('Login error:', error)
      setLoading(false)

      // Failed login
      throw new Error(error.response.data.message)
    } finally {
      setLoading(false)
    }
  }

  // Signup Function
  const signup = async (nombre, apellido, email, password) => {
    // Basic validation (add more as needed)
    if (!email || !password || !nombre || !apellido) {
      throw new Error('Nombre, Apellido, Email and password are required.')
    }

    try {
      const response = await axios.post(BACKEND_URL + 'signup', {
        nombre,
        apellido,
        email,
        password,
        role: 'user'
      })

      if (response.status === 201) {
        // Successful signup
        const newUser = response.data.user // Assuming the backend returns the created user data
        localStorage.setItem('currentUser', JSON.stringify(newUser))
        setCurrentUser(newUser)
        return true
      } else {
        // Handle non-201 status codes if needed
        throw new Error('Signup failed. Please try again later.')
      }
    } catch (error) {
      // Handle signup errors, e.g., network errors, validation errors from the backend
      console.error('Signup error:', error)
      if (error.response && error.response.data && error.response.data.message) {
        throw new Error(error.response.data.message) // Throw backend error message
      } else {
        throw new Error('Signup failed. Please try again later.') // Throw generic error message
      }
    }
  }

  const logout = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('currentUser')
    localStorage.removeItem('isAuthenticated')
    setIsAuthenticated(false)
    setCurrentUser(null)
  }

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout, signup, currentUser }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth () {
  return useContext(AuthContext)
}

AuthProvider.propTypes = {
  children: PropTypes.node.isRequired
}
