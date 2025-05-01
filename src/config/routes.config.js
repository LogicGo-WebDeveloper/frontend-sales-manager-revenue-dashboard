export const DOMAIN = "http://localhost:8001"
export const ADMIN = "admin"
export const USER = "api"
export const VERSION_V1 = "v1"

export const API_USER = `${DOMAIN}/${USER}/${VERSION_V1}`
export const API_ADMIN = `${DOMAIN}/${ADMIN}/${VERSION_V1}`

export const ROUTE_PATH = {
    AUTH : {
        LOGIN : `${API_USER}/auth/login-by-email`,
        SIGNUP : `${API_USER}/auth/register-by-email`,
        VERIFY_EMAIL_OTP : `${API_USER}/auth/verify-email-otp`,
        RESEND_EMAIL_OTP : `${API_USER}/auth/resend-email-otp`,
        FORGOT_PASSWORD : `${API_USER}/auth/forgot-password`,
        CHANGE_PASSWORD : `${API_USER}/auth/reset-password`,
    },
    USER : {
        PROFILE : `${API_USER}/user/profile`
    }
} 