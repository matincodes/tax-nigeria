import React from 'react'
import { useAuth } from '../../context/AuthContext'
import { Navigate } from 'react-router-dom'

const PrivateRoute = ({ allowedRoles, children }) => {
  const { user } = useAuth()
  const isAllowed = allowedRoles
    .map(role => role.toLowerCase())
    .includes(user.role.toLowerCase())

  return isAllowed ? <>{children}</> : <Navigate to='/login' />
}

export default PrivateRoute
