import React, { useState } from "react";
import EmailSignUp from "./EmailSignUp";
import OtpInputUI from "./OtpInputUI";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import SetupPassword from "./SetupPassword";

function HandleEmailInput() {
  const [email, setEmail] = useState("");
  const [OTP, setOtp] = useState("");
  const [otpGenerated, setOtpGenerated] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const [isSignupComplete, setIsSignupComplete] = useState(false);

  const handleGenerateOtp = (inputEmail) => {
    setEmail(inputEmail);
    setOtpGenerated(true); // Switch to OTP input UI
  };

  const handleBack = () => {
    setOtpGenerated(false); // Go back to email input UI
  };

  const handleOtpsubmit = async (otp) => {
    setOtp(otp); // Capture the entered OTP
    try {
      console.log("Received email:", email); // Check the received email
      const response = await axios.post(
        "http://localhost:3000/user/verifyotp", // Ensure this matches your backend
        {
          email,
          otp: OTP,
        }
      );
      if (response.data.status === "SUCCESS") {
        console.log("OTP is correct, proceed with signup");
        setIsSignupComplete(true);
        setError("");
      } else if (response.data.status === "OTP-VERIFY-FAIL") {
        setError("Invalid OTP. Please try again.");
      }
    } catch (error) {
      console.error("Error verifying OTP:", error);
      setError("An error occurred while verifying OTP.");
    }
  };

  return (
    <div className="SignUpBox">
      {isSignupComplete ? (
        <SetupPassword Email={email} />
      ) : !otpGenerated ? (
        <EmailSignUp onGenerateOtp={handleGenerateOtp} />
      ) : (
        <OtpInputUI
          onBack={handleBack}
          handleOtpsubmit={handleOtpsubmit}
          error={error}
        />
      )}
    </div>
  );
}

export default HandleEmailInput;
