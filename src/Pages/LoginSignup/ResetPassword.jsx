import axios from "axios";
import React, { useState } from "react";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import "../CSS/ResetPassword.css";

export const ResetPassword = () => {
  const [password, setPassword] = useState();
  const { token } = useParams();
  const navigate = useNavigate();

  const handlePassword = async (event) => {
    event.preventDefault();
    try {
      const response = await axios
        .post(
          `http://localhost:3000/api/users/reset-password/${token}`,
          {
            password: password,
          },
          { withCredentials: true }
        )
        .then((res) => {
          console.log(res);
          alert("Password changed successfully");
          navigate("/login");
        });
      console.log(response);
    } catch (err) {
      console.error(err);
    }
  };
  return (
    <div className="resetpassword">
      <div className="resetpassword-container">
        <h1>Reset Password</h1>
        <form action="">
          <div className="resetpassword-fields">
            <div>
              <input
                type="text"
                placeholder="Your New Password"
                name="password"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
              ></input>
            </div>
          </div>

          <button type="submit" onClick={handlePassword}>
            Continue
          </button>
        </form>
      </div>
    </div>
  );
};
