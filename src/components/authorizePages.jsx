import React from 'react'
import { Outlet, Navigate, useLocation } from 'react-router-dom'
import { ROUTES } from '../config/route.const'
import Header from './header';

const AuthorizePages = () => {
  const location = useLocation()

  const token = localStorage.getItem('token')

  if (!token) {
    return <Navigate to={ROUTES.USER.LOGIN} />
  }

  return (
    <>
      <Header />
      <div className="bg-[#F4F5F6] flex-1">
        <div className="px-6 md:px-40 py-4">
          <Outlet />
        </div>
      </div>
    </>
  )
}

export default AuthorizePages
