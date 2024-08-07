import React from 'react'
import { useAuth } from '../../context/AuthContext'
import { Navigate, Outlet } from 'react-router-dom'

const PrivateRoute = ({ allowedRoles }) => {
  const { user } = useAuth()
  const isAllowed = allowedRoles
    .map(role => role.toLowerCase())
    .includes(user.role.toLowerCase())

  return isAllowed ? <Outlet /> : <Navigate to='/dashboard' />
}

export default PrivateRoute
