import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const Login = ({ navigate, setLoggedIn, isAuthenticated }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:4000/api/login",
        { email, password }
      );
      if (response.data) {
        localStorage.setItem("user", JSON.stringify(response.data));
        setLoggedIn(true);
        navigate("/list");
      }
      
    } catch (error) {
      console.error(error);
      setErrorMessage("incorrect email or password");
    }
  };

  return (
    <div>
      <h2>Login</h2>
      {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}
      {isAuthenticated ? (
        // If authenticated, show a message or redirect to another page
        <p>You are already logged in.</p>
      ) : (
        // If not authenticated, show the login form
        <form onSubmit={handleSubmit}>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button type="submit">Login</button>
        </form>
      )}
      <Link to="/signup">Don't have an account? Sign up</Link>
    </div>
  );
};

export default Login;
