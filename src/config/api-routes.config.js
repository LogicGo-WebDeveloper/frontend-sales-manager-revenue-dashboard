export const DOMAIN = "http://134.209.70.84:8001"
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
        GOOGLE_LOGIN : `${API_USER}/auth/google-login`
    },
    USER : {
        PROFILE : `${API_USER}/user/profile`
    },
    SUPPORT_TICKET : {
        CREATE : `${API_USER}/support-ticket`,
        LIST : `${API_USER}/support-ticket/list`,
        DELETE : `${API_USER}/support-ticket`,
        REPLY : `${API_USER}/support-ticket/:ticketId/reply`,
        DELETE_REPLY : `${API_USER}/support-ticket/:ticketId/:replyId`,
        RESOLVE : `${API_USER}/support-ticket/:ticketId/status`
    },
    PROMOCODE : {
        CREATE : `${API_USER}/promocode/generate`,
        LIST : `${API_USER}/promocode/get`,
        DELETE : `${API_USER}/promocode/delete`
    },
    PAYMENT : {
        CREATE : `${API_USER}/payment`,
        LIST : `${API_USER}/payment`,
        ONE_PAYMENT : `${API_USER}/payment/:id`,
        UPDATE : `${API_USER}/payment/:id`,
        DELETE : `${API_USER}/payment`
    },
    INVOICE : {
        CREATE : `${API_USER}/invoice/create-invoice`,
        LIST : `${API_USER}/invoice/list`,
        ONE_INVOICE : `${API_USER}/invoice/list/:id`,
        UPDATE : `${API_USER}/invoice/:id`,
        DELETE : `${API_USER}/invoice`
    }
} 