import React from "react";
import { useNavigate } from "react-router-dom";
import AuthLayout from "../components/auth-layout";
import PrimaryButton from "../components/common/primary.button";
import successIcon from "../assets/images/success-icon.png"; // Add your success icon here

const Success = () => {
    const navigate = useNavigate();

    return (
        <AuthLayout>
            <div className="flex flex-col items-center text-center justify-center h-full pb-[40%]">
                <img src={successIcon} alt="Success" className="w-[110px] h-[110px] mb-4" />

                <div className="w-full">
                    <h2 className="text-xl font-bold text-[#122751] mb-1">Account Created Successfully!</h2>
                    
                    <p className="text-sm text-[#8D94A3]">
                        Welcome back! Start your success journey with RevenueSync.
                    </p>
                </div>

                <div className="mt-5 w-full">
                    <PrimaryButton onClick={() => navigate("/")}>Let's Start</PrimaryButton>
                </div>
            </div>
        </AuthLayout>
    );
};

export default Success;
