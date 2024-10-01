import React, { useState } from "react";
import erroricon from "../assets/erroricon.svg";
import googleimg from "../assets/googleimg.png";
import microsoft from "../assets/microsoftimg.png";
import { useNavigate } from "react-router-dom"; // If using react-router for navigation
import axios from "axios"; // Import axios for making API calls

const EmailSignUp = ({ onGenerateOtp }) => {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [isValidEmail, setIsValidEmail] = useState(false);
  const navigate = useNavigate();
  const password = "demo@1223";

  const handleChange = (e) => {
    const inputEmail = e.target.value;
    setEmail(inputEmail);

    const emailRegex = /^[a-zA-Z0-9._%+-]+@gmail\.com$/; // Adjust regex as needed

    if (inputEmail.length >= 5) {
      if (!emailRegex.test(inputEmail)) {
        setError("This email id seems incorrect. Please try again!");
        setIsValidEmail(false);
      } else {
        setError("");
        setIsValidEmail(true);
      }
    } else {
      setError("");
      setIsValidEmail(false);
    }
  };

  const handleGenerateOtp = async () => {
    if (isValidEmail) {
      console.log("Valid email");
      try {
        // Make an API call to check if the email exists and its verification status
        const response = await axios.post("http://localhost:3000/user/signup", {
          email,
          password,
        });

        if (response.data.status === "USER_EXIST") {
          setError("User already exist. please signin");
        } else if (response.data.status === "USER_NOT_VERIFIED") {
          onGenerateOtp(email); // Call the function to generate OTP for the existing user
        } else {
          setError("No account found with this email. Please sign up.");
        }
      } catch (error) {
        console.error("Error checking email:", error);
        setError("An unexpected error occurred. Please try again.");
      }
    }
  };

  return (
    <div>
      <h3 className="sign">Sign Up</h3>
      <p className="signin">
        Hello there! Looks like you are new here, Sign Up now.
      </p>
      <h4 className="email">
        Email<span className="mandatory">*</span>
      </h4>
      <div>
        <input
          type="text"
          placeholder="Enter your email id like abc1234@gmail.com"
          className={`inputBox ${error ? "error" : ""}`}
          onChange={handleChange}
          value={email}
        />
        {error && (
          <div className="erroricon">
            <img src={erroricon} alt="Error icon" />
          </div>
        )}
        {error && <div className="error-message">{error}</div>}
        <button
          onClick={handleGenerateOtp}
          type="button"
          className={`signinbtn ${isValidEmail ? "valid" : "invalid"}`}
          disabled={!isValidEmail}
        >
          <span className="signtext">Generate OTP</span>
        </button>
      </div>

      <div className="hror">
        <hr className="hrline" />
        <p className="or">OR</p>
        <hr className="hrline" />
      </div>

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

      <div className="note">
        <span className="notespan">Note: </span>
        <p className="notepara">
          Signing up via Google saves your time ~20 seconds
        </p>
      </div>

      <div className="alreadyhaveaccount">
        <h3 className="alreadyacc">
          Already have an account?{" "}
          <span className="redirecttologin" onClick={() => navigate("/login")}>
            Log In
          </span>
        </h3>
      </div>
    </div>
  );
};

export default EmailSignUp;
