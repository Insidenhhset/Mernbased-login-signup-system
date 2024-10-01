// import React, { useState, useRef, useEffect } from "react";
// import SetupPassword from "./SetupPassword";

// function OtpInputHandler({
//   onOtpSubmit,
//   actualOtp = "123456", // This should be the actual OTP to compare against
//   error,
//   isValidOtp,
//   setIsSignupComplete,
// }) {
//   const [otp, setOtp] = useState(new Array(6).fill(""));
//   const [otpError, setOtpError] = useState(false); // Initially, no error is shown
//   const inputRefs = useRef([]);

//   const handleOtpChange = (element, index) => {
//     const newOtp = [...otp];
//     if (/^[0-9]$/.test(element.value) || element.value === "") {
//       newOtp[index] = element.value;
//       setOtp(newOtp);

//       if (element.value && index < 5) {
//         inputRefs.current[index + 1].focus(); // Focus next input
//       }

//       // Check if the user has entered all 6 digits
//       if (newOtp.join("").length === 6 && !newOtp.includes("")) {
//         // Check entire OTP once all digits are entered
//         setOtpError(newOtp.join("") !== actualOtp); // Update error status if full OTP is incorrect
//       } else {
//         setOtpError(false); // No error until all digits are filled
//       }
//     }
//   };

//   const handleKeyDown = (e, index) => {
//     if (e.key === "Backspace" && !otp[index] && index > 0) {
//       inputRefs.current[index - 1].focus();
//     }
//   };

//   const handlePaste = (e) => {
//     const pasteData = e.clipboardData.getData("text").slice(0, 6);
//     const newOtp = [...otp];
//     pasteData.split("").forEach((char, i) => {
//       if (/^[0-9]$/.test(char)) {
//         newOtp[i] = char;
//       }
//     });
//     setOtp(newOtp);
//     inputRefs.current[Math.min(pasteData.length - 1, 5)].focus(); // Focus last input after paste

//     // Validate OTP after paste
//     if (pasteData.length === 6 && !newOtp.includes("")) {
//       setOtpError(newOtp.join("") !== actualOtp);
//     }
//   };

//   const handleOtpSubmit = (e) => {
//     e.preventDefault();
//     if (!otpError && otp.join("").length === 6) {
//       onOtpSubmit(otp.join(""));
//       setIsSignupComplete(true);
//     }
//   };

//   useEffect(() => {
//     if (error) {
//       setOtp(new Array(6).fill("")); // Reset OTP on error
//       inputRefs.current[0].focus(); // Focus first input after error
//     }
//   }, [error]);

//   return (
//     <form className="otp" onSubmit={handleOtpSubmit} onPaste={handlePaste}>
//       {otp.map((digit, index) => (
//         <React.Fragment key={index}>
//           <input
//             type="text"
//             maxLength="1"
//             className={`otp-input ${
//               otpError && otp.join("").length === 6 ? "otp-error" : ""
//             }`} // Apply 'otp-error' class only if all OTP digits are entered and incorrect
//             value={digit}
//             onChange={(e) => handleOtpChange(e.target, index)}
//             onKeyDown={(e) => handleKeyDown(e, index)}
//             ref={(ref) => (inputRefs.current[index] = ref)}
//             onWheel={(e) => e.target.blur()}
//           />
//           {index < 5 && (
//             <span
//               className={`dash ${
//                 otpError && otp.join("").length === 6 ? "dash-error" : ""
//               }`}
//             ></span> // Apply 'dash-error' class only if all OTP digits are entered and incorrect
//           )}
//         </React.Fragment>
//       ))}
//       <button
//         type="submit"
//         className={`otpbtn ${
//           !otpError && otp.join("").length === 6 ? "valid" : "invalid"
//         }`}
//         disabled={otp.join("").length !== 6 || otpError} // Button is enabled only when all digits are entered and OTP is correct
//       >
//         <span className="otptext">Confirm & Signup</span>
//       </button>
//       {otpError && otp.join("").length === 6 && (
//         <div className="error-message-otp">
//           Invalid OTP entered. Please re-check your email and enter!
//         </div>
//       )}
//       {error && <div className="error-message">{error}</div>}
//     </form>
//   );
// }

// export default OtpInputHandler;

import React, { useState, useRef, useEffect } from "react";

function OtpInputHandler({ onOtpSubmit, error }) {
  const [otp, setOtp] = useState(new Array(6).fill(""));
  const [otpError, setOtpError] = useState(false);
  const inputRefs = useRef([]);

  const handleOtpChange = (element, index) => {
    const newOtp = [...otp];
    if (/^[0-9]$/.test(element.value) || element.value === "") {
      newOtp[index] = element.value;
      setOtp(newOtp);

      if (element.value && index < 5) {
        inputRefs.current[index + 1].focus();
      }
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputRefs.current[index - 1].focus();
    }
  };

  const handlePaste = (e) => {
    const pasteData = e.clipboardData.getData("text").slice(0, 6);
    const newOtp = [...otp];
    pasteData.split("").forEach((char, i) => {
      if (/^[0-9]$/.test(char)) {
        newOtp[i] = char;
      }
    });
    setOtp(newOtp);
    inputRefs.current[Math.min(pasteData.length - 1, 5)].focus();
  };

  const handleOtpSubmit = (e) => {
    e.preventDefault();
    if (!otpError && otp.join("").length === 6) {
      onOtpSubmit(otp.join("")); // Submit the OTP as a string
    }
  };

  useEffect(() => {
    if (error) {
      setOtp(new Array(6).fill("")); // Reset OTP on error
      inputRefs.current[0].focus(); // Focus on the first input
    }
  }, [error]);

  return (
    <form className="otp" onSubmit={handleOtpSubmit} onPaste={handlePaste}>
      {otp.map((digit, index) => (
        <React.Fragment key={index}>
          <input
            type="text"
            maxLength="1"
            className={`otp-input ${
              otpError && otp.join("").length === 6 ? "otp-error" : ""
            }`}
            value={digit}
            onChange={(e) => handleOtpChange(e.target, index)}
            onKeyDown={(e) => handleKeyDown(e, index)}
            ref={(ref) => (inputRefs.current[index] = ref)}
            onWheel={(e) => e.target.blur()}
          />
          {index < 5 && (
            <span
              className={`dash ${
                otpError && otp.join("").length === 6 ? "dash-error" : ""
              }`}
            ></span>
          )}
        </React.Fragment>
      ))}
      <button
        type="submit"
        className={`otpbtn ${
          !otpError && otp.join("").length === 6 ? "valid" : "invalid"
        }`}
        disabled={otp.join("").length !== 6 || otpError}
      >
        <span className="otptext">Confirm & Signup</span>
      </button>
      {otpError && otp.join("").length === 6 && (
        <div className="error-message-otp">
          Invalid OTP entered. Please re-check your email and enter!
        </div>
      )}
      {error && <div className="error-message">{error}</div>}
    </form>
  );
}

export default OtpInputHandler;
