import React, { useState } from "react";
import formValidation from "./Validation";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import "../CSS/LoginSigup.css";

export const Login = () => {
  const [values, setValues] = useState({
    email: "",
    password: "",
  });
  const [checked, setCheck] = useState(false);

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
        "http://localhost:3000/api/auth/login",
        {
          email: values.email,
          password: values.password,
        },
        {
          withCredentials: true, // Important for sending cookies with requests
        }
      );
      // Handle successful login
      const token = response.data.token;
      localStorage.setItem("token", token);
      localStorage.setItem("user", response.data.user.name);
      localStorage.setItem("userId", response.data.user.id);
      localStorage.setItem("role", response.data.user.role);
      console.log("Login successful:", response.data);
      navigate("/");
      // Optionally, redirect to another page
      // window.location.href = '/dashboard';
    } catch (error) {
      // Handle error during login
      alert("Login failed");
    }
  };

  const handleInput = (event) => {
    const newObj = { ...values, [event.target.name]: event.target.value };
    setValues(newObj);
  };

  return (
    <div className="loginsignup">
      <div className="loginsignup-container">
        <h1>Login</h1>
        <form action="" onSubmit={handleLogin}>
          <div className="loginsignup-fields">
            <div>
              <input
                type="email"
                placeholder="Your Email"
                name="email"
                onChange={handleInput}
              ></input>
              {errors.email && <p style={{ color: "red" }}>{errors.email}</p>}
            </div>

            <div>
              <input
                type="password"
                placeholder="Your Password"
                name="password"
                onChange={handleInput}
              ></input>
              {errors.password && (
                <p style={{ color: "red" }}>{errors.password}</p>
              )}
            </div>
          </div>

          <div className="forget-password">
            <Link to="/forget-password">Forget Password?</Link>
          </div>

          <p className="loginsignup-login">
            Don't have an account{" "}
            <Link to="/signup">
              <span>Signup here</span>
            </Link>
          </p>
          <div className="loginsignup-agree">
            <input
              type="checkbox"
              name=""
              id=""
              onChange={() => {
                setCheck(!checked);
              }}
            ></input>
            <p>Continue, and agree to use it within the terms and policy</p>
          </div>
          <button type="submit" disabled={!checked}>
            Continue
          </button>
        </form>
      </div>
    </div>
  );
};
