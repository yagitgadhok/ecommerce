import React, { useEffect, useState } from "react";
import "../CSS/LoginSigup.css";
import formValidation from "./Validation";
import { Link } from "react-router-dom";
import instance from "../../Services/User.service";
import api from "../../Services/User.service";

export const LoginSignup = () => {
  // const api = instance();
  const [myData, setMyData] = useState();
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await api.get("auth/login");
        setMyData(response.data);
      } catch (err) {
        console.error(err);
      }
    };
  });
  const [values, setValues] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({});
  const handleInput = (event) => {
    const newObj = { ...values, [event.target.name]: event.target.value };
    setValues(newObj);
  };
  const handleValidation = (event) => {
    event.preventDefault();
    setErrors(formValidation(values));
  };
  return (
    <div className="loginsignup">
      <div className="loginsignup-container">
        <h1>Sign Up</h1>
        <form action="" onSubmit={handleValidation}>
          <div className="loginsignup-fields">
            <div className="form-fields">
              <input
                type="text"
                placeholder="Your Name"
                name="name"
                onChange={handleInput}
              ></input>
              {errors.name && <p style={{ color: "red" }}>{errors.name}</p>}
            </div>
            <div className="form-fields">
              <input
                type="email"
                placeholder="Your Email"
                name="email"
                onChange={handleInput}
              ></input>
              {errors.email && <p style={{ color: "red" }}>{errors.email}</p>}
            </div>
            <div className="form-fields">
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
          <button type="submit">Continue</button>
        </form>
        <p className="loginsignup-login">
          Already Have an account?{" "}
          <Link to="/login">
            <span>Login here</span>
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
