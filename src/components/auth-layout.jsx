import React from 'react';
import authModuleImage from "../assets/images/auth-module-image.png";
import authIcon from "../assets/images/auth-icon.png"

const AuthLayout = ({ children }) => {
    return (
        <div className="flex min-h-screen overflow-hidden">
            {/* Left Side - Auth Form */}
            <div className="w-full lg:w-1/2 flex justify-center p-6 sm:p-10">
                <div className="w-full max-w-lg">
                    <div className="flex items-center mb-7">
                        <img
                            src={authIcon}
                            alt="icon"
                            className="w-6 h-6 sm:w-[24px] sm:h-[26px] relative top-1"
                        />
                        <span className="text-xl sm:text-xl font-bold text-[#122751] mt-5">
                            evenueSync
                        </span>
                    </div>
                    {children}
                </div>
            </div>

            <div className="hidden lg:flex w-1/2 h-screen p-6">
                <img
                    src={authModuleImage}
                    alt="Dashboard Preview"
                    className="w-full h-full  rounded-lg"
                />
            </div>
        </div>
    );
};

export default AuthLayout;
