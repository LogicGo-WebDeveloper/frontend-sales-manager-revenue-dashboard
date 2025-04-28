import { useState } from 'react'
import './App.css'
import { Routes , Route, useLocation } from 'react-router-dom'
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
import Setting from '../src/pages/setting/index'
import SettingProfile from './pages/setting/profile'
import SettingInvoice from './pages/setting/invoice'
import SettingPayment from './pages/setting/payment'
import ContactUs from './pages/contact-us'
import OpenTicket from './pages/open-ticket'
import PurchaseTransaction from './pages/purchase-transaction'
import NewLead from './pages/new-lead'
import CommonLayout from './components/commonLayout'
import Header from './components/header'

function App() {
  const [count, setCount] = useState(0)
  const location = useLocation()

  // Check if current route is a dashboard route
  const isDashboardRoute = Object.values(ROUTES.DASHBOARD).some(route => 
    location.pathname.startsWith(route)
  )

  return (
    <div className="flex flex-col min-h-screen">
      {isDashboardRoute && <Header />}
      <CommonLayout>
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
            <Route path={ROUTES.DASHBOARD.SETTING} element={<Setting />}>
              <Route index element={<SettingProfile />} />
              <Route path={ROUTES.DASHBOARD.SETTING_PROFILE} element={<SettingProfile />} />
              <Route path={ROUTES.DASHBOARD.SETTING_INVOICE} element={<SettingInvoice />} />
              <Route path={ROUTES.DASHBOARD.SETTING_PAYMENT} element={<SettingPayment />} />
            </Route>
            <Route path={ROUTES.DASHBOARD.CONTACT} element={<ContactUs />} />
            <Route path={ROUTES.DASHBOARD.OPEN_TICKET} element={<OpenTicket />} />
            <Route path={ROUTES.DASHBOARD.PURCHACE_TRANSACTION} element={<PurchaseTransaction />} />
            <Route path={ROUTES.DASHBOARD.NEW_LEAD} element={<NewLead />} />
          </Route>
        </Routes>
      </CommonLayout>
    </div>
  )
}

export default App
