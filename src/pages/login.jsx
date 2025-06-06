import React, { useState } from "react";
import { Form, Input, message as antdMessage } from "antd";
import AuthLayout from "../components/auth-layout";
import { getValidationRule } from "../utils/validation";
import { Link, useNavigate } from "react-router-dom";
import PrimaryButton from "../components/common/primary.button";
import googleIcon from "../assets/images/google-icon.png";
import appleIcon from "../assets/images/apple-icon.png";
import { ROUTES } from "../config/route.const";
import { ROUTE_PATH } from "../config/api-routes.config";
import { useMutate } from "../hooks/useQuery";
import LoadingButton from "../components/common/loading-button";
import { delay } from "../utils/delay";
import { useDispatch } from "react-redux";
import { setUser } from "../store/slices/userSlice";
import { QUERY_KEYS, QUERY_METHODS } from "../config/query.const";

// Import Firebase Auth
import { auth, googleProvider } from "../config/firebase.config.js";
import { signInWithPopup } from "firebase/auth";

const Login = () => {
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const [messageApi, contextHolder] = antdMessage.useMessage();
  const [showLoader, setShowLoader] = useState(false);
  const dispatch = useDispatch();

  // Mutation for email/password login
  const { mutate: loginMutation, isLoading } = useMutate(
    QUERY_KEYS.AUTH.LOGIN,
    QUERY_METHODS.POST,
    ROUTE_PATH.AUTH.LOGIN,
    {
      onSuccess: async (data) => {
        await delay(1000);
        setShowLoader(false);

        const userRole = data.body?.user?.role;
        if (userRole !== "user") {
          messageApi.open({
            type: "error",
            content: "Access denied. Users only.",
            duration: 2,
          });
          return;
        }

        localStorage.setItem("token", data.body.token);
        dispatch(setUser(data.body.user));
        navigate(ROUTES.USER.SUCCESS);
      },
      onError: (error) => {
        setShowLoader(false);
        messageApi.open({
          type: "error",
          content:
            error.response?.data?.message || "Login failed. Please try again.",
          duration: 2,
        });
      },
    }
  );

  // Mutation for Google login
  const { mutate: googleLoginMutation } = useMutate(
    QUERY_KEYS.AUTH.GOOGLE_LOGIN,
    QUERY_METHODS.POST,
    ROUTE_PATH.AUTH.GOOGLE_LOGIN,
    {
      onSuccess: (data) => {
        const userRole = data.body?.user?.role;
        if (userRole !== "user") {
          messageApi.open({
            type: "error",
            content: "Access denied. Users only.",
            duration: 2,
          });
          return;
        }
        localStorage.setItem("token", data.body.token);
        dispatch(setUser(data.body.user));
        navigate(ROUTES.USER.SUCCESS);
      },
      onError: (error) => {
        messageApi.open({
          type: "error",
          content:
            error.response?.data?.message ||
            "Google login failed. Please try again.",
          duration: 2,
        });
      },
    }
  );

  // Handle email/password login form submission
  const onFinish = (values) => {
    setShowLoader(true);
    loginMutation({
      email: values.email,
      password: values.password,
    });
  };

  // Handle Google Sign-In click
  const handleGoogleLogin = async () => {
    try {
      // Sign in with Firebase popup
      const result = await signInWithPopup(auth, googleProvider);

      // Get Firebase ID token to send to backend
      const firebaseIdToken = await result.user.getIdToken();

      // Send token to backend for verification and login
      googleLoginMutation({ token: firebaseIdToken });
    } catch (error) {
      //   setShowLoader(false);
      messageApi.open({
        type: "error",
        content: error.message || "Google sign-in failed.",
        duration: 2,
      });
    }
  };

  return (
    <>
      {contextHolder}

      <AuthLayout>
        <div className="w-full max-w-lg ">
          {/* Title & Subtext */}
          <div className="mb-6">
            <h2 className="text-2xl font-semibold text-[#122751] mb-1">
              Log in to your account
            </h2>
            <p className="text-sm text-[#8D94A3]">
              Welcome back! Please enter your email address and password to log
              in
            </p>
          </div>

          {/* Form */}
          <Form
            layout="vertical"
            form={form}
            onFinish={onFinish}
            requiredMark={false}
          >
            <Form.Item
              label="Email"
              name="email"
              rules={getValidationRule("email", true)}
              className="form-item"
            >
              <Input
                placeholder="Enter your email"
                size="large"
                className="custom-placeholder"
              />
            </Form.Item>

            <Form.Item
              label="Password"
              name="password"
              rules={getValidationRule("password", true)}
              className="form-item"
            >
              <Input.Password
                placeholder="Enter your password"
                size="large"
                className="custom-placeholder"
              />
            </Form.Item>

            <div className="flex items-center justify-end mb-4 mt-[-6px]">
              <Link
                style={{ color: "#2363E3", fontWeight: "500" }}
                to={ROUTES.USER.FORGET_PASSWORD}
              >
                Forgot Password?
              </Link>
            </div>

            <Form.Item>
              <PrimaryButton htmlType="submit">
                {showLoader ? (
                  <LoadingButton size="small" />
                ) : (
                  "Sign in to RevenueSync"
                )}
              </PrimaryButton>
            </Form.Item>
          </Form>

          {/* Social Sign In Divider */}
          <div className="my-6 flex items-center justify-center gap-2 text-[#A3AED0] text-xs">
            <div className="flex-1 h-px bg-[#E5EAF2]" />
            <span>OR</span>
            <div className="flex-1 h-px bg-[#E5EAF2]" />
          </div>

          {/* Social Buttons */}
          <div className="flex gap-3 mb-6">
            <button
              onClick={handleGoogleLogin}
              disabled={showLoader}
              className="flex items-center justify-center gap-2 flex-1 border text-[#8D94A3] border-[#E0E5F2] rounded-md px-4 py-2 text-sm font-medium bg-white cursor-pointer hover:bg-gray-50"
              type="button"
            >
              <img src={googleIcon} alt="Google" className="w-5 h-5" />
              <span>Sign in with Google</span>
            </button>
            <button
              className="flex items-center justify-center gap-2 flex-1 border text-[#8D94A3] border-[#E0E5F2] rounded-md px-4 py-2 text-sm font-medium bg-white cursor-pointer"
              //   disabled
              type="button"
            >
              <img src={appleIcon} alt="Apple" className="w-5 h-5" />
              <span>Sign in with Apple</span>
            </button>
          </div>

          {/* Sign In Link */}
          <div className="text-center text-sm text-[#1B254B]">
            Don't have an account?{" "}
            <Link
              to={ROUTES.USER.SIGNUP}
              className="text-[#2363E3] font-medium"
            >
              Sign Up
            </Link>
          </div>
        </div>
      </AuthLayout>
    </>
  );
};

export default Login;
