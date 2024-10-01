import React from "react";
import { useLocation } from "react-router-dom";

function SignupEmailEntered() {
  const location = useLocation();
  const { email } = location.state || {}; // Access the email correctly

  const handleSubmit = (e) => {
    e.preventDefault();
    // Here you can add your logic for generating OTP, if needed
    alert("OTP is generated for: " + email); // Show an alert with the email
  };

  return <div>{handleSubmit}</div>;
}

export default SignupEmailEntered;
