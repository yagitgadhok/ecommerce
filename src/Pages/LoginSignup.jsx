import React from "react";
import "./CSS/LoginSigup.css";

export const LoginSignup = () => {
  return (
    <div className="loginsignup">
      <div className="loginsignup-container">
        <h1>Sign Up</h1>
        <div className="loginsignup-fields">
          <input type="text" placeholder="Your Name"></input>
          <input type="email" placeholder="Your Email"></input>
          <input type="password" placeholder="Your Password"></input>
        </div>
        <button>Continue</button>
        <p className="loginsignup-login">
          Already Have an account? <span>Login here</span>
        </p>
        <div className="loginsignup-agree">
          <input type="checkbox" name="" id=""></input>
          <p>Continue, and agree to use it within the terms and policy</p>
        </div>
      </div>
    </div>
  );
};
