import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { Form, Alert } from "react-bootstrap";
import TermsAndConditions from "./TermsAndConditions";

const Login = () => {
  const [email, setEmail] = useState(""); // For student login
  const [username, setUsername] = useState(""); // For admin login
  const [password, setPassword] = useState("");
  const [checkboxChecked, setCheckboxChecked] = useState(false);
  const [error, setError] = useState("");
  const [activeTab, setActiveTab] = useState("student");
  const [showTermsModal, setShowTermsModal] = useState(false); // Modal visibility state
  const navigate = useNavigate();

  const handleLogin = async (e, userType) => {
    e.preventDefault();

    if (!checkboxChecked) {
      setError("You must agree to the terms and conditions.");
      return;
    }

    setError("");
    try {
      const endpoint =
        userType === "student"
          ? "http://localhost:5000/api/auth/login"
          : "http://localhost:5000/api/admin/login";

      const payload =
        userType === "student"
          ? { email, password }
          : { username, password };

      const response = await axios.post(endpoint, payload);
      const { token } = response.data;

      localStorage.setItem(userType === "student" ? "authToken" : "AdminToken", token);

      if (userType === "student") {
        navigate("/login/student/home");
      } else if (userType === "admin") {
        navigate("/login/admin/home1");
      }
    } catch (err) {
      setError(err.response?.data?.error || "Login failed. Please try again.");
    }
  };

  return (
    <div className="container d-flex flex-column align-items-center justify-content-center vh-100">
      <div
        className="card p-4 shadow-sm"
        style={{ borderRadius: "10px", maxWidth: "400px", width: "100%" }}
      >
        <div className="btn-group w-100 mb-4" role="group">
          <button
            type="button"
            className="btn"
            style={{
              borderTopLeftRadius: "10px",
              borderTopRightRadius: "0px",
              backgroundColor: activeTab === "student" ? "#FFA800" : "#F8F9FA",
              color: activeTab === "student" ? "#FFF" : "#000",
            }}
            onClick={() => setActiveTab("student")}
          >
            Student Login
          </button>
          <button
            type="button"
            className="btn"
            style={{
              borderTopRightRadius: "10px",
              borderTopLeftRadius: "0px",
              backgroundColor: activeTab === "admin" ? "#FFA800" : "#F8F9FA",
              color: activeTab === "admin" ? "#FFF" : "#000",
            }}
            onClick={() => setActiveTab("admin")}
          >
            Admin Login
          </button>
        </div>

        <h2
          className="text-center mb-4"
          style={{
            fontFamily: "Old Standard TT, serif",
            fontWeight: "bold",
            color: "#800000",
          }}
        >
          {activeTab === "student" ? "Student Login" : "Admin Login"}
        </h2>

        {error && (
          <Alert variant="danger" className="text-center">
            {error}
          </Alert>
        )}

        <form onSubmit={(e) => handleLogin(e, activeTab)}>
          {activeTab === "student" ? (
            <div className="mb-3">
              <label htmlFor="email" className="form-label">
                Email
              </label>
              <input
                type="email"
                className="form-control"
                id="email"
                placeholder="Enter Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
          ) : (
            <div className="mb-3">
              <label htmlFor="username" className="form-label">
                Username
              </label>
              <input
                type="text"
                className="form-control"
                id="username"
                placeholder="Enter Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </div>
          )}

          <div className="mb-3">
            <label htmlFor="password" className="form-label">
              Password
            </label>
            <input
              type="password"
              className="form-control"
              id="password"
              placeholder="Enter Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <Form.Group className="mb-3" controlId={`${activeTab}Terms`}>
            <Form.Check
              type="checkbox"
              label={
                <span>
                  You agree to the{" "}
                  <Link
                    to="#"
                    style={{ color: "#800000" }}
                    onClick={(e) => {
                      e.preventDefault();
                      setShowTermsModal(true); // Show modal on click
                    }}
                  >
                    terms and conditions
                  </Link>
                </span>
              }
              checked={checkboxChecked}
              onChange={(e) => setCheckboxChecked(e.target.checked)}
            />
          </Form.Group>

          <button
            type="submit"
            className="btn w-100"
            style={{ backgroundColor: "#FFA800" }}
          >
            Log in
          </button>
        </form>
      </div>

      {/* Include the Terms and Conditions Component */}
      <TermsAndConditions
        show={showTermsModal}
        handleClose={() => setShowTermsModal(false)}
      />
    </div>
  );
};

export default Login;
