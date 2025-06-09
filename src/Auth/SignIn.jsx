import React, { useEffect, useRef, useState } from "react";
import { FaEye, FaEyeSlash, FaEnvelope, FaLock } from "react-icons/fa";
import { FiX } from "react-icons/fi";
import axiosInstance from "../Auth/axiosInstance";
import Swal from "sweetalert2";
import { useAuth } from "../Auth/AuthContex";
import SignUp from "./Signup";
import { Dialog } from "primereact/dialog";
import ForgetPassword from "./ForgetPassword";

const SignIn = ({ onClose }) => {
  const { login } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [step, setStep] = useState("login");
  const [otp, setOtp] = useState(Array(6).fill(""));
  const [isSignUpModalOpen, setIsSignUpModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [cooldown, setCooldown] = useState(0);
  const inputsRef = useRef([]);
  const [visible, setVisible] = useState(false);

  // Start the cooldown timer
  useEffect(() => {
    let timer;
    if (cooldown > 0) {
      timer = setTimeout(() => setCooldown(cooldown - 1), 1000);
    }
    return () => clearTimeout(timer);
  }, [cooldown]);

  // Format time from seconds to MM:SS
  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs < 10 ? "0" : ""}${secs}`;
  };

  // Shared OTP generation logic
  const submitGenerateOtp = async () => {
    try {
      setLoading(true);
      const payload = { email, password };
      const response = await axiosInstance.post("/auth/generateOtp", payload);
      Swal.fire({
        icon: "success",
        title: "OTP Sent",
        text: response.data.message || "OTP has been sent to your email.",
      });
      setStep("otp");
      setCooldown(90); // 1 minute 30 seconds cooldown
      setTimeout(() => inputsRef.current[0]?.focus(), 100);
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: error.response?.data?.message || "Failed to generate OTP.",
      });
    } finally {
      setLoading(false);
    }
  };

  // Initial login submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    await submitGenerateOtp();
  };

  // OTP input change
  const handleOtpChange = (e, index) => {
    const { value } = e.target;
    if (/^[0-9]?$/.test(value)) {
      const newOtp = [...otp];
      newOtp[index] = value;
      setOtp(newOtp);
      if (value && index < 5) inputsRef.current[index + 1]?.focus();
    }
  };

  // Handle backspace in OTP inputs
  const handleOtpKeyDown = (e, index) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      const newOtp = [...otp];
      newOtp[index - 1] = "";
      setOtp(newOtp);
      inputsRef.current[index - 1]?.focus();
    }
  };

  // Paste full OTP
  const handlePaste = (e) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData("text").trim();
    if (/^\d{6}$/.test(pastedData)) {
      const newOtp = pastedData.split("").slice(0, 6);
      setOtp(newOtp);
      inputsRef.current[5]?.focus();
    }
  };

  // OTP submit to login
  const handleOtpSubmit = async (e) => {
    e.preventDefault();
    const logInOtp = otp.join("");
    try {
      setLoading(true);
      const payload = { email, password, logInOtp };
      const response = await axiosInstance.post("/auth/login", payload);
      Swal.fire({
        icon: "success",
        title: "Logged In",
        text: response.data.message || "Login successful.",
      });
      login({
        email: response.data.dto.user.email,
        firstName: response.data.dto.user.firstName,
        lastName: response.data.dto.user.lastName,
        userId: response.data.dto.user.userId,
        phoneNumber: response.data.dto.user.phoneNumber,
        profilePic: response.data.dto.user.profilePic,
        jwtToken: response.data.dto.jwtToken,
        attendanceId: response.data.dto.attendanceId,
      });
      onClose();
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Invalid OTP",
        text: error.response?.data?.message || "OTP verification failed.",
      });
    } finally {
      setLoading(false);
    }
  };

  // Resend OTP uses same logic
  const resendOtp = async () => {
    if (cooldown <= 0) {
      await submitGenerateOtp();
    }
  };

  const openSignUpModal = () => setIsSignUpModalOpen(true);
  const closeSignUpModal = () => setIsSignUpModalOpen(false);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  useEffect(() => {
    document.body.style.overflow = isSignUpModalOpen ? "hidden" : "auto";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isSignUpModalOpen]);

  const showForgetModal = async () => {
    // await onClose();       // Waits for modal to fully close
    setVisible(true); // Then opens the Forget Password modal
  };

  return (
    <>
      <div className="relative w-full max-w-md mx-4">
        <button
          onClick={onClose}
          className="absolute top-2 right-2 hover:text-gray-500 z-10 cursor-pointer"
        >
          <FiX size={24} />
        </button>
        <div className="bg-white p-6 rounded-lg">
          {step === "login" ? (
            <>
              <h2 className="text-2xl font-bold text-center mb-6">Login</h2>
              <form onSubmit={handleSubmit}>
                <div className="mb-4">
                  <label htmlFor="email" className="block mb-2 font-medium">
                    Email address
                  </label>
                  <div className="relative">
                    <FaEnvelope className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                    <input
                      type="email"
                      id="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#96b49e]"
                      placeholder="you@example.com"
                      required
                    />
                  </div>
                </div>
                <div className="mb-4">
                  <label htmlFor="password" className="block mb-2 font-medium">
                    Password
                  </label>
                  <div className="relative">
                    <FaLock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                    <input
                      type={showPassword ? "text" : "password"}
                      id="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="w-full pl-10 pr-10 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#96b49e]"
                      placeholder="••••••••"
                      required
                    />
                    <button
                      type="button"
                      className="absolute right-3 top-1/2 transform -translate-y-1/2"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? (
                        <FaEyeSlash className="text-gray-400 hover:text-gray-300 cursor-pointer" />
                      ) : (
                        <FaEye className="text-gray-400 hover:text-gray-300 cursor-pointer" />
                      )}
                    </button>
                  </div>
                </div>
                {/* <div className="flex items-center justify-end mb-6">
                  <button
                    onClick={showForgetModal}
                    className="text-sm text-blue-700 hover:text-blue-400 cursor-pointer "
                  >
                    Forgot Password?
                  </button>
                </div> */}
                <button
                  type="submit"
                  className="w-full bg-[#bce1c6]  py-3 px-4 text-gray-900 cursor-pointer rounded-lg hover:bg-[#96b49e]  transition duration-200 font-medium mb-4"
                >
                  {loading ? "Please wait..." : "Login"}
                </button>
                <p className="text-center text-sm">
                  Don't have an account?{" "}
                  <span
                    onClick={openSignUpModal}
                    className="font-medium text-blue-700 hover:text-blue-400 cursor-pointer"
                  >
                    Sign Up
                  </span>
                </p>
              </form>
            </>
          ) : (
            <>
              <h2 className="text-2xl font-bold text-center mb-6">Enter OTP</h2>
              <form
                onSubmit={handleOtpSubmit}
                className="flex justify-center space-x-2 mb-6"
              >
                {otp.map((digit, idx) => (
                  <input
                    key={idx}
                    type="text"
                    inputMode="numeric"
                    maxLength={1}
                    value={digit}
                    onChange={(e) => handleOtpChange(e, idx)}
                    onKeyDown={(e) => handleOtpKeyDown(e, idx)}
                    onPaste={handlePaste}
                    ref={(el) => (inputsRef.current[idx] = el)}
                    className="w-10 h-12 text-center text-xl border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#96b49e]"
                    required
                  />
                ))}
              </form>
              <button
                onClick={handleOtpSubmit}
                className="w-full bg-[#bce1c6] cursor-pointer py-3 px-4 rounded-lg hover:bg-[#96b49e]  transition duration-200 font-medium mb-4"
              >
                {loading ? "Verifying..." : "Verify OTP"}
              </button>
              <p
                onClick={resendOtp}
                className={`text-center text-sm ${
                  cooldown > 0
                    ? "text-gray-500"
                    : "text-blue-700 hover:text-blue-400 cursor-pointer"
                }`}
              >
                {cooldown > 0
                  ? `Resend OTP in ${formatTime(cooldown)}`
                  : "Resend OTP"}
              </p>
            </>
          )}
        </div>
      </div>

      {isSignUpModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <SignUp onClose={closeSignUpModal} />
        </div>
      )}

      {/* forget Modal */}

      <Dialog
        visible={visible}
        modal={false}
        style={{ width: "50vw", height: "60vh" }}
        onHide={() => {
          if (!visible) return;
          setVisible(false);
        }}
      >
        <ForgetPassword />
      </Dialog>
    </>
  );
};

export default SignIn;
