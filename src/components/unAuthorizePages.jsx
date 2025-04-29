import React, { useEffect, useState } from 'react'
import { Outlet, Navigate } from 'react-router-dom'
import { ROUTES } from '../config/route.const'

const UnAuthorizePages = () => {
  // const [token, setToken] = useState(null)

  // useEffect(() => {
  //   const storedToken = localStorage.getItem('token')
  //   setToken(storedToken)
  // }, [])

  // if (token) {
  //   return <Navigate to={ROUTES.USER.HOME} replace />
  // }

  const token = localStorage.getItem('token')
  console.log('token from authpages', token)

  if (token) {
    return <Navigate to={ROUTES.DASHBOARD.OVERVIEW} />
  }

  return (
    <div>
      <Outlet />
    </div>
  )
}

export default UnAuthorizePages
