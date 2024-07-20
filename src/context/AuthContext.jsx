import React, { createContext, useState, useEffect, useContext } from 'react'

const AuthContext = createContext()

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [accessToken, setAccessToken] = useState(null)
  const [isAuthenticated, setIsAuthenticated] = useState(false)

  useEffect(() => {
    // Check if the user is already logged in
    const storedUser = localStorage.getItem('user')
    const storedAccessToken = localStorage.getItem('accessToken')
    if (storedUser && storedAccessToken) {
      setUser(JSON.parse(storedUser))
      setAccessToken(storedAccessToken)
    }
  }, [])

  const login = async (email, password) => {
    try {
      const response = await fetch(
        'https://assettrack.com.ng/api/account/login',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ username: email, password }),
        },
      )

      if (!response.ok) {
        // throw new Error('Login failed')
        setIsAuthenticated(false)
        return false
      }

      const data = (await response.json()).userDetail
      const user = {
        id: data.id,
        role: data.rolesLst[0]?.toLowerCase(),
        name: `${data.firstName} ${data.lastName}`,
        email: data.email,
        emailConfirmed: data.emailConfirmed,
        isActive: data.isActive,
        phoneNumber: data.phoneNumber,
        phoneNumberConfirmed: data.phoneNumberConfirmed,
        twoFactorEnabled: data.twoFactorEnabled,
      }
      setUser(user)
      setAccessToken(data.accessToken)
      localStorage.setItem('user', JSON.stringify(user))
      localStorage.setItem('accessToken', data.accessToken)
      localStorage.setItem('refreshToken', data.refreshToken) // Store the refresh token
      setIsAuthenticated(true)
      return true
    } catch (error) {
      console.error(error)
    }
  }

  const logout = () => {
    setUser(null)
    setAccessToken(null)
    setIsAuthenticated(false)
    localStorage.removeItem('user')
    localStorage.removeItem('accessToken')
    localStorage.removeItem('refreshToken')
  }

  const refreshAccessToken = async () => {
    const refreshToken = localStorage.getItem('refreshToken')
    const response = await fetch('/api/refresh', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ refreshToken }),
    })

    if (!response.ok) {
      throw new Error('Failed to refresh access token')
    }

    const data = await response.json()
    setAccessToken(data.accessToken)
    localStorage.setItem('accessToken', data.accessToken)
  }

  const authFetch = async (url, options = {}) => {
    if (!accessToken) {
      await refreshAccessToken()
    }

    const response = await fetch(url, {
      ...options,
      headers: {
        ...options.headers,
        Authorization: `Bearer ${accessToken}`,
      },
    })

    if (response.status === 401) {
      await refreshAccessToken()
      return authFetch(url, options)
    }

    return response
  }

  return (
    <AuthContext.Provider
      value={{ user, isAuthenticated, login, logout, authFetch }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext)
