import React, { useState } from "react";
import formValidation from "./Validation";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

export const Login = () => {
  const [values, setValues] = useState({
    email: "",
    password: "",
  });
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const [errors, setErrors] = useState({});

  const handleValidation = (event) => {
    event.preventDefault();
    setErrors(formValidation(values));
  };

  const handleLogin = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post(
        "https://medical-api-git-main-ayush-saxenas-projects-03883bbf.vercel.app/api/auth/login",
        {
          email,
          password,
        },
        {
          withCredentials: true, // Important for sending cookies with requests
        }
      );
      // Handle successful login
      const token = response.data.token;
      localStorage.setItem("token", token);
      console.log("Login successful:", response.data);
      navigate("/");
      // Optionally, redirect to another page
      // window.location.href = '/dashboard';
    } catch (error) {
      // Handle error during login
      console.log(error);
    }
  };

  return (
    <div className="loginsignup">
      <div className="loginsignup-container">
        <h1>Login</h1>
        <form action="" onSubmit={handleLogin}>
          <div className="loginsignup-fields">
            <div className="form-fields">
              <input
                type="email"
                placeholder="Your Email"
                name="email"
                value={email}
                onChange={(event) => {
                  setEmail(event.target.value);
                }}
              ></input>
              {errors.email && <p style={{ color: "red" }}>{errors.email}</p>}
            </div>
            <div className="form-fields">
              <input
                type="password"
                placeholder="Your Password"
                name="password"
                value={password}
                onChange={(event) => {
                  setPassword(event.target.value);
                }}
              ></input>
              {errors.password && (
                <p style={{ color: "red" }}>{errors.password}</p>
              )}
            </div>
          </div>
          <button type="submit">Continue</button>
        </form>
        <p className="loginsignup-login">
          Don't have an account{" "}
          <Link to="/signup">
            <span>Signup here</span>
          </Link>
        </p>
        <div className="loginsignup-agree">
          <input type="checkbox" name="" id=""></input>
          <p>Continue, and agree to use it within the terms and policy</p>
        </div>
      </div>
    </div>
  );
};
