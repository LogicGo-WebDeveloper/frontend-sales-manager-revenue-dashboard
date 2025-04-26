import React, { useRef, useState } from "react";
import { Form } from "antd";
import AuthLayout from "../../components/auth-layout";
import PrimaryButton from "../../components/common/primary.button";
import "../verify-otp/style.css";

const VerifyOtp = () => {
    const [otp, setOtp] = useState(["", "", "", ""]);
    const inputRefs = [useRef(), useRef(), useRef(), useRef()];

    const handleChange = (index, e) => {
        const value = e.target.value;
        if (!/^[0-9]$/.test(value) && value !== "") return;

        const newOtp = [...otp];
        newOtp[index] = value;
        setOtp(newOtp);

        // Move to next input if value is entered
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
        console.log("OTP Submitted:", otp.join(""));
    };

    return (
        <AuthLayout>
            <div className="w-full max-w-md ">

                {/* Title & Subtext */}
                <div className="mb-8">
                    <h2 className="text-2xl font-bold text-[#122751] mb-1">
                        Verify Your Email Address
                    </h2>
                    <p className="text-sm text-[#8D94A3]">
                        We sent a code to <span className="font-medium text-[#122751]">WilsonLab@gmail.com</span>
                    </p>
                </div>

                {/* OTP Form */}
                <Form onFinish={handleSubmit} className="flex flex-col items-center">
                    <div className="otp-input-group">
                        {otp.map((digit, index) => (
                            <input
                                key={index}
                                type="text"
                                maxLength="1"
                                value={digit}
                                ref={inputRefs[index]}
                                onChange={(e) => handleChange(index, e)}
                                onKeyDown={(e) => handleKeyDown(index, e)}
                                className="otp-input"
                            />
                        ))}
                    </div>

                    {/* Verify Button */}
                    <PrimaryButton htmlType="submit" className="w-full mt-5">
                        Verify Code
                    </PrimaryButton>
                </Form>
            </div>
        </AuthLayout>
    );
};

export default VerifyOtp;
