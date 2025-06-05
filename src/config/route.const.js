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
        SETTING_INVOICE: '/setting/invoice/:invoiceId',
        SETTING_PAYMENT: '/setting/payment',
        OPEN_TICKET: '/ticket/:ticketId',
        PURCHACE_TRANSACTION: '/purchase-transaction',
        NEW_LEAD: '/lead',
        RECENT_TICKETS: '/contact-us/recent-tickets',
        RESOLVED_TICKETS: '/contact-us/resolved-tickets'
    },
    ERROR: {
        PAGE_NOT_FOUND: '*',
        SERVER_ERROR: '/server-error'
    }
}
