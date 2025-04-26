import React from 'react'
import { Outlet, Navigate, useLocation } from 'react-router-dom'
import { ROUTES } from '../config/route.const'

const AuthorizePages = () => {
  const location = useLocation()

  const token = localStorage.getItem('token')

  if (!token) {
    return <Navigate to={ROUTES.USER.LOGIN} state={{ from: location }} replace />
  }

  return (
    <div>
      <div>Header</div>
        <Outlet />
      <div>Footer</div>
    </div>
  )
}

export default AuthorizePages
