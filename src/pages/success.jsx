import React, { useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import AuthLayout from "../components/auth-layout";
import PrimaryButton from "../components/common/primary.button";
import successIcon from "../assets/images/success-icon.png";
import { ROUTES } from "../config/route.const";
import { delay } from "../utils/delay";
import LoadingButton from "../components/common/loading-button";

const Success = () => {
    const navigate = useNavigate();
    const token = localStorage.getItem("token");
    if (!token) {
        return <Navigate to={ROUTES.USER.LOGIN} />;
    }

    const [showLoader, setShowLoader] = useState(false);

    const handleStartButton = async () => {
        setShowLoader(true);
        await delay(1000);
        navigate(ROUTES.DASHBOARD.OVERVIEW);
    }

    return (
        <AuthLayout>
            <div className="flex flex-col items-center text-center justify-center h-full ">
                <img src={successIcon} alt="Success" className="w-[110px] h-[110px] mb-4" />

                <div className="w-full">
                    <h2 className="text-xl font-bold text-[#122751] mb-1">Account Created Successfully!</h2>

                    <p className="text-sm text-[#8D94A3]">
                        Welcome back! Start your success journey with RevenueSync.
                    </p>
                </div>

                <div className="mt-5 w-full">
                    <PrimaryButton onClick={handleStartButton}>
                        {showLoader ? <LoadingButton /> : "Let's Start"}
                    </PrimaryButton>
                </div>
            </div>
        </AuthLayout>
    );
};

export default Success;
