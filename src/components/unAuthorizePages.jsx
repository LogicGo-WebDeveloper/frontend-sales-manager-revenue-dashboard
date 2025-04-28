import React, { useEffect, useState } from 'react'
import { Outlet, Navigate } from 'react-router-dom'
import { ROUTES } from '../config/route.const'
import Header from './header'

const UnAuthorizePages = () => {
  const [token, setToken] = useState(null)

  useEffect(() => {
    const storedToken = localStorage.getItem('token')
    setToken(storedToken)
  }, [])

  if (token) {
    return <Navigate to={ROUTES.USER.HOME} replace />
  }

  return (
    <div>
      {/* <div>Header</div> */}
      {/* <Header /> */}
      <Outlet />
      {/* <div>Footer</div> */}
    </div>
  )
}

export default UnAuthorizePages
