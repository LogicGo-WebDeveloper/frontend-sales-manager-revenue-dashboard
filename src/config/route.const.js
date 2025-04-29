export const ROUTES = {
    ADMIN : {
        HOME : '/admin'
    },
    USER: {
        // HOME: '/',
        LOGIN: '/login',
        SIGNUP: '/signup',
        VERIFY_OTP: '/verify-otp',
        FORGET_PASSWORD: '/forget-password',
        CHANGE_PASSWORD: '/change-password',
        SUCCESS: '/success'
    },
    DASHBOARD: {
        OVERVIEW: '/',
        CONTACT: '/contact-us',
        SETTING: '/setting',
        SETTING_PROFILE: '/setting/profile',
        SETTING_INVOICE_LIST: '/setting/invoice-list',
        SETTING_INVOICE: '/setting/invoice',
        SETTING_PAYMENT: '/setting/payment',
        OPEN_TICKET: '/ticket',
        PURCHACE_TRANSACTION: '/purchase-transaction',
        NEW_LEAD: '/lead',
    },
    ERROR: {
        PAGE_NOT_FOUND: '*',
        SERVER_ERROR: '/server-error'
    }
}
