import React from "react";
import { useNavigate } from "react-router-dom";

function PageNotFound() {
  const navigate = useNavigate();
  return (
    <div>
      <h2>400 Page Not Found</h2>
      <button onClick={() => navigate("/signup")}>Login</button>
    </div>
  );
}

export default PageNotFound;
