export const QUERY_KEYS = {
    AUTH : {
        LOGIN : "login",
        SIGNUP : "signup",
        VERIFY_EMAIL_OTP : "verify-otp",
        RESEND_EMAIL_OTP : "resend-otp",
        FORGOT_PASSWORD : "forgot-password",
        CHANGE_PASSWORD : "change-password",
        PROFILE : "profile",
    },
    SUPPORT_TICKET : {
        CREATE : "create-ticket",
        GET : "tickets",
        GET_SINGLE : "ticket",
        DELETE : "delete-ticket",
        REPLY : "reply-ticket",
    },
    PROMOCODE : {
        CREATE : "create-promocode",
        LIST : "list-promocode",
        DELETE : "delete-promocode"
    },
    PAYMENT_METHOD : {
        CREATE : "add-account",
        LIST : "account",
        DELETE : "delete-account",
        UPDATE : "update-account"
    }
}

export const QUERY_METHODS = {
    GET : "get",
    POST : "post",
    PUT : "put",
    DELETE : "delete",
    PATCH : "patch"
}