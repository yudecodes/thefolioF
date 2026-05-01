import React, { useState } from "react";
import "../style.css";  // fixed path
import Pic from '../assets/pic4-26.png';

function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (email === "test@example.com" && password === "123456") {
      alert("Login successful!");
    } else {
      alert("Invalid credentials");
    }
  };

  return (
    <section className="fade-in" style={{ maxWidth: "400px", margin: "50px auto" }}>
        <div>
        <center><img src={Pic} alt="Logo" width="200px"/></center>
      </div>
      <h2 style={{ textAlign: "center", marginBottom: "20px" }}>Login</h2>
      <form onSubmit={handleSubmit}>
        <label>Email</label>
        <input
          type="email"
          value={email}
          placeholder="Enter your email"
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <label>Password</label>
        <input
          type="password"
          value={password}
          placeholder="Enter your password"
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <button
          type="submit"
          style={{
            width: "100%",
            padding: "12px",
            background: "#002D62",
            color: "white",
            borderRadius: "8px",
            border: "none",
          }}
        >
          Login
        </button>
      </form>
    </section>
  );
}

export default LoginPage;
