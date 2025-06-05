import React from 'react'
import './App.css'
import { Routes, Route } from 'react-router-dom'
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
import SettingProfile from './pages/profile'
import SettingInvoiceList from './pages/invoice-list'
import SettingPayment from './pages/payment-method'
import ContactUs from './pages/contact-us'
import OpenTicket from './pages/open-ticket'
import PurchaseTransaction from './pages/purchase-transaction'
import NewLead from './pages/new-lead'
import ErrorPage from './pages/error-page'
import Invoice from './pages/invoice'
import ExampleComponent from './components/ExampleComponent'

function App() {
  
  return (
    <div className="flex flex-col min-h-screen">
      <Routes>
        {/* Auth Routes */}
        {/* <Route element={<UnAuthorizeLayout />}> */}
          <Route path={ROUTES.USER.SIGNUP} element={<Signup />} />
          <Route path={ROUTES.USER.LOGIN} element={<Login />} />
          <Route path={ROUTES.USER.VERIFY_OTP} element={<VerifyOtp />} />
          <Route path={ROUTES.USER.FORGET_PASSWORD} element={<ForgetPassword />} />
          <Route path={ROUTES.USER.CHANGE_PASSWORD} element={<ChangePassword />} />
          <Route path={ROUTES.USER.SUCCESS} element={<Success />} />
        {/* </Route> */}

        <Route path={ROUTES.DASHBOARD.OVERVIEW} element={<AuthorizePages />}>
          <Route path={ROUTES.DASHBOARD.OVERVIEW} element={<Overview />} />
          <Route path="/user" element={<ExampleComponent />} />
          <Route path={ROUTES.DASHBOARD.SETTING} element={<Setting />}>
            <Route index element={<SettingProfile />} />
            <Route path={ROUTES.DASHBOARD.SETTING_PROFILE} element={<SettingProfile />} />
            <Route path={ROUTES.DASHBOARD.SETTING_INVOICE_LIST} element={<SettingInvoiceList />} />
            <Route path={ROUTES.DASHBOARD.SETTING_INVOICE} element={<Invoice />} />
            <Route path={ROUTES.DASHBOARD.SETTING_PAYMENT} element={<SettingPayment />} />
          </Route>
          <Route path={ROUTES.DASHBOARD.CONTACT} element={<ContactUs />} />
          <Route path={ROUTES.DASHBOARD.RECENT_TICKETS} element={<ContactUs />} />
          <Route path={ROUTES.DASHBOARD.RESOLVED_TICKETS} element={<ContactUs />} />
          <Route path={ROUTES.DASHBOARD.OPEN_TICKET} element={<OpenTicket />} />
          <Route path={ROUTES.DASHBOARD.PURCHACE_TRANSACTION} element={<PurchaseTransaction />} />
          <Route path={ROUTES.DASHBOARD.NEW_LEAD} element={<NewLead />} />
        </Route>

        {/* Error Routes */}
        <Route path={ROUTES.ERROR.PAGE_NOT_FOUND} element={<ErrorPage status="404" title="404" subTitle="Sorry, the page you visited does not exist." buttonText="Back Home" />} />
        <Route path={ROUTES.ERROR.SERVER_ERROR} element={<ErrorPage status="500" title="500" subTitle="Sorry, something went wrong." buttonText="Back Home" />} />

        {/* Catch all route for 404 */}
        <Route path="*" element={<ErrorPage status="404" title="404" subTitle="Sorry, the page you visited does not exist." buttonText="Back Home" />} />
      </Routes>
    </div>
  )
}

export default App
