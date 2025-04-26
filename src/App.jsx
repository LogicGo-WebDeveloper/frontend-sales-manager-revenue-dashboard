import { useState } from 'react'
import './App.css'
import { Routes , Route } from 'react-router-dom'
import Signup from './pages/signup'
import Login from './pages/login'
import VerifyOtp from './pages/verify-otp/verify-otp'
import ForgetPassword from './pages/forget-password'
import ChangePassword from './pages/change-password'
import Success from './pages/success'
import { ROUTES } from './config/route.const'
import UnAuthorizeLayout from './components/unAuthorizePages'
import AuthorizePages from './components/authorizePages'
import Overview from './pages/overview'
import Setting from './pages/setting'
import ContactUs from './pages/contact-us'
import OpenTicket from './pages/open-ticket'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Routes>

        <Route element={<AuthorizePages />}>

        </Route>

        <Route element={<UnAuthorizeLayout />}>
          <Route path={ROUTES.USER.SIGNUP} element={<Signup />} />
          <Route path={ROUTES.USER.LOGIN} element={<Login />} />
          <Route path={ROUTES.USER.VERIFY_OTP} element={<VerifyOtp />} />
          <Route path={ROUTES.USER.FORGET_PASSWORD} element={<ForgetPassword />} />
          <Route path={ROUTES.USER.CHANGE_PASSWORD} element={<ChangePassword />} />
          <Route path={ROUTES.USER.SUCCESS} element={<Success />} />

          <Route path={ROUTES.DASHBOARD.OVERVIEW} element={<Overview />} />
          <Route path={ROUTES.DASHBOARD.SETTING} element={<Setting />} />
          <Route path={ROUTES.DASHBOARD.CONTACT} element={<ContactUs />} />
          <Route path={ROUTES.DASHBOARD.OPEN_TICKET} element={<OpenTicket />} />
        </Route>

      </Routes>
    </>
  )
}

export default App
