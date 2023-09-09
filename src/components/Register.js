import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./Register.css"; // Import your custom CSS for styling

const Register = () => {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [passwordMatch, setPasswordMatch] = useState(false);

  const handlePasswordChange = (e) => {
    const newPassword = e.target.value;
    setPassword(newPassword);
    setPasswordMatch(newPassword === confirmPassword);
  };

  const handleConfirmPasswordChange = (e) => {
    const newConfirmPassword = e.target.value;
    setConfirmPassword(newConfirmPassword);
    setPasswordMatch(newConfirmPassword === password);
  };

  const handlePhoneChange = (e) => {
    const newPhone = e.target.value;
    setPhone(newPhone);
  };

  const isEmailValid = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const isPhoneValid = (phone) => {
    const phoneRegex = /^\d{10}$/;
    return phoneRegex.test(phone);
  };

  const isFormValid = () => {
    return (
      name.trim() !== "" &&
      isEmailValid(email) &&
      isPhoneValid(phone) &&
      password.trim() !== "" &&
      confirmPassword.trim() !== "" &&
      passwordMatch
    );
  };

  const submit = async (e) => {
    e.preventDefault();

    if (!isFormValid()) {
      return;
    }

    try {
      await axios.post("register", {
        name,
        email,
        password,
        // phone,
      });

      navigate("/login");
    } catch (error) {
      console.error("Registration failed:", error);
    }
  };

  return (
    <div className="register-container">
      <h1 className="register-heading">Please Register</h1>
      <form className="register-form" onSubmit={submit}>
        <div className={`form-group ${!isFormValid() ? "error" : ""}`}>
          <label htmlFor="name">Name</label>
          <input
            type="text"
            id="name"
            placeholder="Your Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div className={`form-group ${!isEmailValid(email) ? "error" : ""}`}>
          <label htmlFor="email">Email Address</label>
          <input
            type="email"
            id="email"
            placeholder="name@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className={`form-group ${!isPhoneValid(phone) ? "error" : ""}`}>
          <label htmlFor="phone">Phone Number</label>
          <input
            type="tel"
            id="phone"
            placeholder="Enter Phone Number"
            value={phone}
            onChange={handlePhoneChange}
            required
          />
        </div>
        <div className={`form-group ${!passwordMatch ? "error" : ""}`}>
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            placeholder="Password"
            value={password}
            onChange={handlePasswordChange}
            required
          />
        </div>
        <div className={`form-group ${!passwordMatch ? "error" : ""}`}>
          <label htmlFor="confirmPassword">Confirm Password</label>
          <input
            type="password"
            id="confirmPassword"
            placeholder="Confirm Password"
            value={confirmPassword}
            onChange={handleConfirmPasswordChange}
            required
          />
          <div className="password-match-indicator">
            {passwordMatch ? "Passwords Match" : "Passwords Do Not Match"}
          </div>
        </div>
        <button
          className="register-submit-button"
          type="submit"
          disabled={!isFormValid()}
          title={!isFormValid() ? "Form is incomplete or invalid" : ""}
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default Register;
