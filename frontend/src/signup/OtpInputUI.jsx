import React, { useState } from "react";
import OtpInputHandler from "./OtpInputHandler"; // Ensure this component handles OTP input correctly
import googleimg from "../assets/googleimg.png"; // Ensure you have the correct image path
import microsoft from "../assets/microsoftimg.png"; // Ensure you have the correct image path
import { useNavigate } from "react-router-dom"; // If using react-router for navigation

const OtpInputUI = ({ onBack, handleOtpsubmit, error }) => {
  const navigate = useNavigate();
  const [otpError, setOtpError] = useState("");

  const handleOtpSubmit = (otp) => {
    console.log("OTP received:", otp); // Log the OTP to check if it's passed correctly
    handleOtpsubmit(otp); // If you have any further logic for handling OTP submission
  };

  return (
    <div>
      <div className="otpclass" onClick={onBack} style={{ cursor: "pointer" }}>
        <div className="backArrow">
          {
            <svg
              width="18"
              height="15"
              viewBox="0 0 18 15"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M0.219376 8.03104L6.96937 14.781C7.11011 14.9218 7.30098 15.0008 7.5 15.0008C7.69902 15.0008 7.88989 14.9218 8.03063 14.781C8.17136 14.6403 8.25042 14.4494 8.25042 14.2504C8.25042 14.0514 8.17136 13.8605 8.03063 13.7198L2.56031 8.25042H17.25C17.4489 8.25042 17.6397 8.1714 17.7803 8.03075C17.921 7.8901 18 7.69933 18 7.50042C18 7.3015 17.921 7.11074 17.7803 6.97009C17.6397 6.82943 17.4489 6.75042 17.25 6.75042H2.56031L8.03063 1.28104C8.17136 1.14031 8.25042 0.94944 8.25042 0.750417C8.25042 0.551394 8.17136 0.360523 8.03063 0.219792C7.88989 0.0790615 7.69902 0 7.5 0C7.30098 0 7.11011 0.0790615 6.96937 0.219792L0.219376 6.96979C0.149643 7.03945 0.0943222 7.12216 0.0565796 7.21321C0.018837 7.30426 -0.000589371 7.40186 -0.000589371 7.50042C-0.000589371 7.59898 0.018837 7.69657 0.0565796 7.78762C0.0943222 7.87867 0.149643 7.96139 0.219376 8.03104Z"
                fill="white"
              />
            </svg>
          }
        </div>
      </div>
      <h3 className="sign" style={{ position: "absolute", left: "70px" }}>
        Enter OTP
      </h3>
      <p className="signin" style={{ position: "absolute", left: "70px" }}>
        Fill in the 6-digit OTP you received in your email
      </p>
      <h4 className="email">
        OTP<span className="mandatory">*</span>
      </h4>
      <div>
        <div className="otp">
          <OtpInputHandler onOtpSubmit={handleOtpSubmit} error={otpError} />
        </div>
      </div>

      {/* Divider with OR */}
      <div className="hror">
        <hr className="hrline" />
        <p className="or">OR</p>
        <hr className="hrline" />
      </div>

      {/* Social Media Login */}
      <div className="socialmedialogin">
        <div
          className="googleLogin"
          onClick={() => console.log("Google login clicked")}
        >
          <img src={googleimg} alt="Google logo icon" className="googlelogin" />
        </div>
        <div
          className="microsoftLogin"
          onClick={() => console.log("Microsoft login clicked")}
        >
          <img
            src={microsoft}
            alt="Microsoft logo icon"
            className="microsoftlogin"
          />
        </div>
      </div>

      {/* Note Section */}
      <div className="note">
        <span className="notespan">Note: </span>
        <p className="notepara">
          Signing up via Google saves your time ~20 seconds
        </p>
      </div>

      {/* Already have an account? */}
      <div className="alreadyhaveaccount">
        <h3 className="alreadyacc">
          Already have an account?{" "}
          <span className="redirecttologin" onClick={() => navigate("/Login")}>
            Log In
          </span>
        </h3>
      </div>
    </div>
  );
};

export default OtpInputUI;
