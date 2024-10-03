import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../CSS/ForgetPassword.css";

export const ForgetPassword = () => {
  const [email, setEmail] = useState();

  const handleSubmit = async (event) => {
    event.preventDefault();
    // const headers = { token: localStorage.getItem("token") };

    try {
      const response = await axios
        .post(
          "http://localhost:3000/api/users/forget-password",
          { email: email },
          { withCredentials: true }
        )
        .then((res) => {
          console.log(res);
          // navigate("/reset-password");
        });
      console.log(response);
    } catch (err) {}
  };

  return (
    <div className="forgetpassword">
      <div className="forgetpassword-container">
        <h1>Forget Password</h1>
        <form action="">
          <div className="forgetpassword-fields">
            <div>
              <input
                type="email"
                placeholder="Your Email"
                name="email"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
              ></input>
            </div>
          </div>

          <button type="submit" onClick={handleSubmit}>
            Continue
          </button>
        </form>
      </div>
    </div>
  );
};
