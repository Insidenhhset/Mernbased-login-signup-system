import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import HomePage from "../Home/HomePage";

function SetupPassword({ Email }) {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState(false);
  const navigate = useNavigate();
  const [showpass, setShowpass] = useState(false);
  const [confirmshowpass, setConfirmshowpass] = useState(false);

  const isValidLength = password.length >= 8;
  const hasUppercase = /[A-Z]/.test(password);
  const hasLowercase = /[a-z]/.test(password);
  const hasDigit = /\d/.test(password);
  const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);

  const handlePasswordchange = (e) => {
    setPassword(e.target.value);
  };

  const handlePasswordChange = (e) => {
    const newPassword = e.target.value;
    setPassword(newPassword);

    const passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/;

    if (newPassword.length < 8) {
      setError(true);
    } else if (!/[A-Z]/.test(newPassword)) {
      setError(true);
    } else if (!/[a-z]/.test(newPassword)) {
      setError(true);
    } else if (!/\d/.test(newPassword)) {
      setError(true);
    } else if (!/[\W_]/.test(newPassword)) {
      setError(true);
    } else {
      setError(false);
      console.log("Password is valid");
    }
  };

  const showpassword = () => {
    if (showpass) {
      setShowpass(false);
    } else {
      setShowpass(true);
    }
  };

  const confirmshowPassword = () => {
    if (confirmshowpass) {
      setConfirmshowpass(false);
    } else {
      setConfirmshowpass(true);
    }
  };

  const handlePasswordSubmit = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setError("Passwords do not match!");
      return;
    }

    try {
      const response = await axios.post(
        "http://localhost:3000/user/setup-password",
        {
          email: Email,
          password,
        }
      );

      if (response.data === "SUCCESS") {
        navigate("/login");
        console.log("Password Entered");
      } else {
        setError("Check your password again!");
      }
    } catch (error) {
      console.error("Error while saving password:", error);
      setError("An error occurred while saving the password.");
    }
  };
  return (
    <div>
      <h3
        className="sign"
        style={{
          width: "241px",
          fontWeight: "bold",
          fontSize: "28px",
          left: "21px",
        }}
      >
        Setup Password
      </h3>
      <p className="signin">
        This will take some effort, Relax and then get started!
      </p>
      <h3 className="password-label">Set-up your 8+ digits password</h3>
      <input
        type={`${showpass ? "text" : "password"}`}
        placeholder="Enter  your password"
        className={`inputBox`}
        onChange={handlePasswordchange}
        value={password}
      />
      <div
        className="show-passwordbtn"
        style={{ cursor: "pointer" }}
        onClick={showpassword}
      >
        <svg
          width="30"
          height="20"
          viewBox="0 0 30 20"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M29.9138 9.595C29.87 9.49625 28.8113 7.1475 26.4575 4.79375C23.3213 1.6575 19.36 0 15 0C10.64 0 6.67874 1.6575 3.54249 4.79375C1.18874 7.1475 0.124988 9.5 0.0862381 9.595C0.0293795 9.72289 0 9.86129 0 10.0012C0 10.1412 0.0293795 10.2796 0.0862381 10.4075C0.129988 10.5062 1.18874 12.8538 3.54249 15.2075C6.67874 18.3425 10.64 20 15 20C19.36 20 23.3213 18.3425 26.4575 15.2075C28.8113 12.8538 29.87 10.5062 29.9138 10.4075C29.9706 10.2796 30 10.1412 30 10.0012C30 9.86129 29.9706 9.72289 29.9138 9.595ZM15 18C11.1525 18 7.79124 16.6012 5.00874 13.8438C3.86705 12.7084 2.89572 11.4137 2.12499 10C2.89552 8.58617 3.86686 7.29147 5.00874 6.15625C7.79124 3.39875 11.1525 2 15 2C18.8475 2 22.2088 3.39875 24.9913 6.15625C26.1352 7.2912 27.1086 8.5859 27.8813 10C26.98 11.6825 23.0538 18 15 18ZM15 4C13.8133 4 12.6533 4.35189 11.6666 5.01118C10.6799 5.67047 9.91084 6.60754 9.45672 7.7039C9.00259 8.80026 8.88377 10.0067 9.11528 11.1705C9.34679 12.3344 9.91824 13.4035 10.7574 14.2426C11.5965 15.0818 12.6656 15.6532 13.8295 15.8847C14.9933 16.1162 16.1997 15.9974 17.2961 15.5433C18.3925 15.0892 19.3295 14.3201 19.9888 13.3334C20.6481 12.3467 21 11.1867 21 10C20.9983 8.40921 20.3657 6.88405 19.2408 5.75919C18.116 4.63433 16.5908 4.00165 15 4ZM15 14C14.2089 14 13.4355 13.7654 12.7777 13.3259C12.1199 12.8864 11.6072 12.2616 11.3045 11.5307C11.0017 10.7998 10.9225 9.99556 11.0769 9.21964C11.2312 8.44372 11.6122 7.73098 12.1716 7.17157C12.731 6.61216 13.4437 6.2312 14.2196 6.07686C14.9956 5.92252 15.7998 6.00173 16.5307 6.30448C17.2616 6.60723 17.8864 7.11992 18.3259 7.77772C18.7654 8.43552 19 9.20887 19 10C19 11.0609 18.5786 12.0783 17.8284 12.8284C17.0783 13.5786 16.0609 14 15 14Z"
            fill="white"
          />
        </svg>
      </div>

      <h3 className="confirm-password-label">Confirm New Password</h3>
      <input
        type={`${confirmshowpass ? "text" : "password"}`}
        placeholder="Confirm your password"
        className={`inputBox-1`}
        value={confirmPassword}
        onChange={(e) => setConfirmPassword(e.target.value)}
      />
      <div
        className="show-passwordbtn2"
        style={{ cursor: "pointer" }}
        onClick={confirmshowPassword}
      >
        <svg
          width="30"
          height="20"
          viewBox="0 0 30 20"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M29.9138 9.595C29.87 9.49625 28.8113 7.1475 26.4575 4.79375C23.3213 1.6575 19.36 0 15 0C10.64 0 6.67874 1.6575 3.54249 4.79375C1.18874 7.1475 0.124988 9.5 0.0862381 9.595C0.0293795 9.72289 0 9.86129 0 10.0012C0 10.1412 0.0293795 10.2796 0.0862381 10.4075C0.129988 10.5062 1.18874 12.8538 3.54249 15.2075C6.67874 18.3425 10.64 20 15 20C19.36 20 23.3213 18.3425 26.4575 15.2075C28.8113 12.8538 29.87 10.5062 29.9138 10.4075C29.9706 10.2796 30 10.1412 30 10.0012C30 9.86129 29.9706 9.72289 29.9138 9.595ZM15 18C11.1525 18 7.79124 16.6012 5.00874 13.8438C3.86705 12.7084 2.89572 11.4137 2.12499 10C2.89552 8.58617 3.86686 7.29147 5.00874 6.15625C7.79124 3.39875 11.1525 2 15 2C18.8475 2 22.2088 3.39875 24.9913 6.15625C26.1352 7.2912 27.1086 8.5859 27.8813 10C26.98 11.6825 23.0538 18 15 18ZM15 4C13.8133 4 12.6533 4.35189 11.6666 5.01118C10.6799 5.67047 9.91084 6.60754 9.45672 7.7039C9.00259 8.80026 8.88377 10.0067 9.11528 11.1705C9.34679 12.3344 9.91824 13.4035 10.7574 14.2426C11.5965 15.0818 12.6656 15.6532 13.8295 15.8847C14.9933 16.1162 16.1997 15.9974 17.2961 15.5433C18.3925 15.0892 19.3295 14.3201 19.9888 13.3334C20.6481 12.3467 21 11.1867 21 10C20.9983 8.40921 20.3657 6.88405 19.2408 5.75919C18.116 4.63433 16.5908 4.00165 15 4ZM15 14C14.2089 14 13.4355 13.7654 12.7777 13.3259C12.1199 12.8864 11.6072 12.2616 11.3045 11.5307C11.0017 10.7998 10.9225 9.99556 11.0769 9.21964C11.2312 8.44372 11.6122 7.73098 12.1716 7.17157C12.731 6.61216 13.4437 6.2312 14.2196 6.07686C14.9956 5.92252 15.7998 6.00173 16.5307 6.30448C17.2616 6.60723 17.8864 7.11992 18.3259 7.77772C18.7654 8.43552 19 9.20887 19 10C19 11.0609 18.5786 12.0783 17.8284 12.8284C17.0783 13.5786 16.0609 14 15 14Z"
            fill="white"
          />
        </svg>
      </div>
      <div className="passwordCriteriavalidate">
        <div
          className="box-style"
          style={{ height: "35px", marginTop: "10px" }}
        >
          <div
            className={`${
              isValidLength ? "ellipseRound" : "ellipseRound-error"
            } positioning1`}
          >
            {isValidLength && (
              <svg
                width="16"
                height="12"
                viewBox="0 0 16 12"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M0.988036 5.98494L0.988036 5.98494C0.835859 6.13591 0.75 6.34108 0.75 6.55545C0.75 6.76982 0.835859 6.97499 0.988036 7.12596L4.90776 11.0145C4.98308 11.0893 5.07241 11.1485 5.17059 11.1889C5.26877 11.2292 5.37395 11.25 5.48011 11.25C5.58628 11.25 5.69145 11.2292 5.78963 11.1889C5.88782 11.1485 5.97715 11.0893 6.05246 11.0145L15.012 2.12633C15.1641 1.97537 15.25 1.77019 15.25 1.55582C15.25 1.34146 15.1641 1.13628 15.012 0.985314L15.012 0.985314C14.8599 0.834417 14.654 0.75 14.4397 0.75C14.2255 0.75 14.0196 0.834417 13.8675 0.985314L13.8675 0.985321L5.48012 9.30652L2.13255 5.98496L2.13254 5.98494C1.98043 5.83404 1.77455 5.74963 1.56029 5.74963C1.34603 5.74963 1.14014 5.83404 0.988036 5.98494Z"
                  fill="white"
                  stroke="white"
                  strokeWidth="0.5"
                />
              </svg>
            )}
          </div>
          <div className="password-criteria">
            <p style={{ color: "#868686" }}>
              Password must be at least 8 characters long
            </p>
          </div>
        </div>

        <div className="box-style" style={{ height: "35px" }}>
          <div
            className={`${
              hasUppercase && hasLowercase
                ? "ellipseRound"
                : "ellipseRound-error"
            } positioning2`}
          >
            {hasUppercase && hasLowercase && (
              <svg
                width="16"
                height="12"
                viewBox="0 0 16 12"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M0.988036 5.98494L0.988036 5.98494C0.835859 6.13591 0.75 6.34108 0.75 6.55545C0.75 6.76982 0.835859 6.97499 0.988036 7.12596L4.90776 11.0145C4.98308 11.0893 5.07241 11.1485 5.17059 11.1889C5.26877 11.2292 5.37395 11.25 5.48011 11.25C5.58628 11.25 5.69145 11.2292 5.78963 11.1889C5.88782 11.1485 5.97715 11.0893 6.05246 11.0145L15.012 2.12633C15.1641 1.97537 15.25 1.77019 15.25 1.55582C15.25 1.34146 15.1641 1.13628 15.012 0.985314L15.012 0.985314C14.8599 0.834417 14.654 0.75 14.4397 0.75C14.2255 0.75 14.0196 0.834417 13.8675 0.985314L13.8675 0.985321L5.48012 9.30652L2.13255 5.98496L2.13254 5.98494C1.98043 5.83404 1.77455 5.74963 1.56029 5.74963C1.34603 5.74963 1.14014 5.83404 0.988036 5.98494Z"
                  fill="white"
                  stroke="white"
                  strokeWidth="0.5"
                />
              </svg>
            )}
          </div>
          <div className="password-criteria">
            <p style={{ color: "#868686" }}>
              Password must contain 1 Uppercase & 1 Lowercase letter
            </p>
          </div>
        </div>
        <div className="box-style" style={{ height: "35px" }}>
          <div
            className={`${
              hasDigit ? "ellipseRound" : "ellipseRound-error"
            } positioning3`}
          >
            {hasDigit && (
              <svg
                width="16"
                height="12"
                viewBox="0 0 16 12"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M0.988036 5.98494L0.988036 5.98494C0.835859 6.13591 0.75 6.34108 0.75 6.55545C0.75 6.76982 0.835859 6.97499 0.988036 7.12596L4.90776 11.0145C4.98308 11.0893 5.07241 11.1485 5.17059 11.1889C5.26877 11.2292 5.37395 11.25 5.48011 11.25C5.58628 11.25 5.69145 11.2292 5.78963 11.1889C5.88782 11.1485 5.97715 11.0893 6.05246 11.0145L15.012 2.12633C15.1641 1.97537 15.25 1.77019 15.25 1.55582C15.25 1.34146 15.1641 1.13628 15.012 0.985314L15.012 0.985314C14.8599 0.834417 14.654 0.75 14.4397 0.75C14.2255 0.75 14.0196 0.834417 13.8675 0.985314L13.8675 0.985321L5.48012 9.30652L2.13255 5.98496L2.13254 5.98494C1.98043 5.83404 1.77455 5.74963 1.56029 5.74963C1.34603 5.74963 1.14014 5.83404 0.988036 5.98494Z"
                  fill="white"
                  stroke="white"
                  strokeWidth="0.5"
                />
              </svg>
            )}
          </div>
          <div className="password-criteria">
            <p style={{ color: "#868686" }}>
              Password must contain atleast one digit like 1,2,3,4,5,6,etc.
            </p>
          </div>
        </div>
        <div className="box-style" style={{ height: "35px" }}>
          <div
            className={`${
              hasSpecialChar ? "ellipseRound" : "ellipseRound-error"
            } positioning4`}
          >
            {hasSpecialChar && (
              <svg
                width="16"
                height="12"
                viewBox="0 0 16 12"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M0.988036 5.98494L0.988036 5.98494C0.835859 6.13591 0.75 6.34108 0.75 6.55545C0.75 6.76982 0.835859 6.97499 0.988036 7.12596L4.90776 11.0145C4.98308 11.0893 5.07241 11.1485 5.17059 11.1889C5.26877 11.2292 5.37395 11.25 5.48011 11.25C5.58628 11.25 5.69145 11.2292 5.78963 11.1889C5.88782 11.1485 5.97715 11.0893 6.05246 11.0145L15.012 2.12633C15.1641 1.97537 15.25 1.77019 15.25 1.55582C15.25 1.34146 15.1641 1.13628 15.012 0.985314L15.012 0.985314C14.8599 0.834417 14.654 0.75 14.4397 0.75C14.2255 0.75 14.0196 0.834417 13.8675 0.985314L13.8675 0.985321L5.48012 9.30652L2.13255 5.98496L2.13254 5.98494C1.98043 5.83404 1.77455 5.74963 1.56029 5.74963C1.34603 5.74963 1.14014 5.83404 0.988036 5.98494Z"
                  fill="white"
                  stroke="white"
                  strokeWidth="0.5"
                />
              </svg>
            )}
          </div>
          <div className="password-criteria">
            <p style={{ color: "#868686" }}>
              Password must contain atleast one special character like !, @, #,
              $, etc.
            </p>
          </div>
        </div>
        <div className="verticalLine"></div>
      </div>
      <button
        onClick={handlePasswordSubmit}
        type="submit"
        className={`savebtn ${
          password === confirmPassword && !error && password != ""
            ? "valid"
            : "invalid"
        }`}
        disabled={password != confirmPassword}
        style={{ position: "absolute", top: "510px" }}
      >
        <span className="savenext">Save</span>
      </button>
    </div>
  );
}

export default SetupPassword;
