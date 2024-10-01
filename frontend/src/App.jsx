import React, { useEffect, useState } from "react";
import "./App.css";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import PageNotFound from "./signup/PageNotFound";
import Signup from "./signup/signup";
import Login from "./Login/Login";
import HomePage from "./Home/HomePage";
import ForgotPassword from "./Login/ForgotPassword";
import ResetPassword from "./Login/ResetPassword";
import OtpInputUI from "./signup/OtpInputUI";
import SetupPassword from "./signup/SetupPassword";

function App() {
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  const handleSize = () => {
    setIsMobile(window.innerWidth < 768);
  };

  useEffect(() => {
    window.addEventListener("resize", handleSize);
    return () => window.removeEventListener("resize", handleSize);
  }, []);

  return (
    <div className="App">
      {isMobile ? (
        <h2 className="mobile-warning" style={{ textAlign: "center" }}>
          Please use the desktop version to view this application.
        </h2>
      ) : (
        <BrowserRouter>
          <Routes>
            <Route path="/signup" element={<Signup />} />
            <Route path="/HomePage" element={<HomePage />} />
            <Route path="/login" element={<Login />} />
            <Route path="/otp" element={<OtpInputUI />} />
            <Route path="/ResetPassword" element={<ResetPassword />} />
            <Route path="/ForgotPassword" element={<ForgotPassword />} />
            <Route path="/setup-password" element={<SetupPassword />} />
            <Route path="/" element={<Navigate to={"/signup"} />} />
            <Route path="*" element={<PageNotFound />} />
          </Routes>
        </BrowserRouter>
      )}
    </div>
  );
}

export default App;
