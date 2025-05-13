import React, { useEffect, useRef, useState } from "react";
import { Form, message as antdMessage } from "antd";
import AuthLayout from "../../components/auth-layout";
import PrimaryButton from "../../components/common/primary.button";
import "../verify-otp/style.css";
import { Link, Navigate, useLocation, useNavigate } from "react-router-dom";
import { ROUTE_PATH } from "../../config/api-routes.config";
import { useMutate } from "../../hooks/useQuery";
import Loader from "../../components/common/Loader";
import { ROUTES } from "../../config/route.const";
import LoadingButton from "../../components/common/loading-button";
import { delay } from "../../utils/delay";
import { QUERY_KEYS, QUERY_METHODS } from "../../config/query.const";

const VerifyOtp = () => {
    const location = useLocation();
    const { email, from } = location.state || {};
    
    if (!email) {
        return <Navigate to={ROUTES.USER.SIGNUP} replace />;
    }
    
    const [otp, setOtp] = useState(["", "", "", ""]);
    const [otpError, setOtpError] = useState(false);
    const inputRefs = [useRef(), useRef(), useRef(), useRef()];
    const navigate = useNavigate();
    const [messageApi, contextHolder] = antdMessage.useMessage();
    const [showLoader, setShowLoader] = useState(false);


    const { mutate: verifyOtpMutation, isLoading } = useMutate(QUERY_KEYS.AUTH.VERIFY_EMAIL_OTP, QUERY_METHODS.POST, ROUTE_PATH.AUTH.VERIFY_EMAIL_OTP,
        {
            onSuccess: async (data) => {
                await delay(1000);
                setShowLoader(false);
                if (from === 'signup') {
                    navigate(ROUTES.USER.LOGIN);
                } else if (from === 'forgot-password') {
                    navigate(ROUTES.USER.CHANGE_PASSWORD, {
                        state: {
                            email: email,
                            from: 'reset-password'
                        }
                    });
                } else {
                    navigate(ROUTES.USER.LOGIN);
                }
            },
            onError: (error) => {
                setShowLoader(false);
                setOtpError(true);
                setTimeout(() => setOtpError(false), 500);
                messageApi.error(error.response?.data?.message || 'OTP verification failed. Please try again.');
                console.log("error>>>>>>", error);
            }
        }
    );

    // resend otp mutation
    const { mutate: resendOtpMutation } = useMutate(QUERY_KEYS.AUTH.RESEND_EMAIL_OTP, QUERY_METHODS.POST, ROUTE_PATH.AUTH.RESEND_EMAIL_OTP, {
        onSuccess: (data) => {
            messageApi.open({
                type: 'success',
                content: 'OTP resent successfully!',
                duration: 2
            });
        },
        onError: (error) => {
            messageApi.error(error.response?.data?.message || 'OTP resend failed. Please try again.');
            console.log("error>>>>>>", error);
        }
    });


    const handleChange = (index, e) => {
        const value = e.target.value;
        if (!/^[0-9]$/.test(value) && value !== "") return;

        const newOtp = [...otp];
        newOtp[index] = value;
        setOtp(newOtp);

        if (value && index < 3) {
            inputRefs[index + 1].current.focus();
        }
    };

    const handleKeyDown = (index, e) => {
        if (e.key === "Backspace") {
            if (otp[index] === "" && index > 0) {
                inputRefs[index - 1].current.focus();
            }
            const newOtp = [...otp];
            newOtp[index] = "";
            setOtp(newOtp);
        }
    };

    const handleSubmit = () => {
        const otpCode = otp.join("");
        if (otpCode.length !== 4 || otp.includes("")) {
            setOtpError(true);
            setTimeout(() => setOtpError(false), 500);
            messageApi.error('Please enter a valid OTP');
            return;
        }

        const payload = {
            email: email,
            otp: parseInt(otpCode)
        };

        setShowLoader(true);
        verifyOtpMutation(payload);
    };


    const handleOtpResend = () => {

        setOtp(["", "", "", ""]);
        inputRefs[0].current.focus();

        const payload = {
            email: email,
            type: "email"
        };

        resendOtpMutation(payload);
    }
    
    return (
        <>
            {contextHolder}
            <AuthLayout>
                <div className="w-full max-w-md ">

                    {/* Title & Subtext */}
                    <div className="mb-8">
                        <h2 className="text-2xl font-bold text-[#122751] mb-1">
                            Verify Your Email Address
                        </h2>
                        <p className="text-sm text-[#8D94A3]">
                            We sent a code to <span className="font-medium text-[#122751]">{email}</span>
                        </p>
                    </div>

                    {/* OTP Form */}
                    <Form onFinish={handleSubmit} className="flex flex-col items-center">
                        <div className={`otp-input-group${otpError ? ' shake' : ''}`}>
                            {otp.map((digit, index) => (
                                <input
                                    key={index}
                                    type="text"
                                    maxLength="1"
                                    value={digit}
                                    ref={inputRefs[index]}
                                    onChange={(e) => handleChange(index, e)}
                                    onKeyDown={(e) => handleKeyDown(index, e)}
                                    className={`otp-input${otpError ? ' error' : ''}`}
                                    disabled={isLoading}
                                />
                            ))}
                        </div>

                        {/* Verify Button */}
                        <PrimaryButton
                            htmlType="submit"
                            className="w-full mt-5"
                            disabled={isLoading || showLoader}
                        >
                            {showLoader ? (
                                <LoadingButton size="small" />
                            ) : (
                                'Verify Code'
                            )}
                        </PrimaryButton>
                    </Form>

                    {/* Resend OTP */}
                    <div className="mt-6 text-xs text-[#122751] flex items-center justify-center gap-1  ">
                        Didn't receive the code?{" "}
                        <button
                            onClick={handleOtpResend}
                            type="button"
                            className="text-[#2363E3] font-medium cursor-pointer"
                            disabled={isLoading}
                        >
                            Click to resend
                        </button>
                    </div>
                </div>
            </AuthLayout>
        </>
    );
};

export default VerifyOtp;
