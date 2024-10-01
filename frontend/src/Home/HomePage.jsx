import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";

function HomePage() {
  const navigate = useNavigate();
  const location = useLocation();
  const [email, setEmail] = useState("");
  const [refreshToken, setRefreshToken] = useState("");

  // Fetch email and refreshToken from the state passed via navigation
  useEffect(() => {
    if (location.state) {
      if (location.state.email) {
        setEmail(location.state.email); // Set the email passed during navigation
      }
      if (location.state.refreshToken) {
        setRefreshToken(location.state.refreshToken); // Set the refreshToken passed during navigation
      }
    }
  }, [location.state]);
  const handleLogout = async () => {
    try {
      const response = await fetch("http://localhost:3000/user/signout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ refreshToken }), // Pass refreshToken in the logout request
      });

      const data = await response.json(); // Parse the JSON response

      if (response.ok && data.status === "SUCCESS") {
        console.log("Logout successful:", data.message); // Log the success message
        navigate("/Login"); // Navigate to Login page
      } else {
        console.error("Logout failed:", data.message); // Log failure message
      }
    } catch (error) {
      console.error("Error during logout:", error);
    }
  };

  // Render HomePage content
  return (
    <div
      style={{
        backgroundColor: "rgb(237, 230, 230)",
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <div
        className="card"
        style={{
          width: "18rem",
          backgroundColor: "#fff",
          border: "1px solid #ccc",
          boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
          padding: "20px",
          borderRadius: "10px",
          textAlign: "center",
          color: "#000",
        }}
      >
        <h5
          style={{
            fontSize: "1.5rem",
            fontWeight: "bold",
            marginBottom: "10px",
          }}
        >
          Welcome to the Home
        </h5>
        <p>Email: {email}</p>
        <button
          style={{
            marginTop: "15px",
            padding: "10px 20px",
            backgroundColor: "#007bff",
            color: "#fff",
            border: "none",
            cursor: "pointer",
            borderRadius: "5px",
          }}
          onClick={handleLogout}
        >
          Logout
        </button>
      </div>
    </div>
  );
}

export default HomePage;
