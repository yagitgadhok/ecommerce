import React, { useEffect, useState } from "react";
import "../CSS/LoginSigup.css";
import formValidation from "./Validation";
import { Link, useNavigate } from "react-router-dom";
import instance from "../../Services/User.service";
import api from "../../Services/User.service";
import axios from "axios";

export const LoginSignup = () => {
  const navigate = useNavigate();
  // const api = instance();
  const [myData, setMyData] = useState();
  const [checked, setCheck] = useState(false);
  // const [name, setName] = useState("");
  // const [email, setEmail] = useState("");
  // const [password, setPassword] = useState("");
  // const [role, setRole] = useState("");
  // const [address, setAddress] = useState("");
  // const [pinCode, setPinCode] = useState("");
  // const [city, setCity] = useState("");
  // const [shopName, setShopName] = useState("");

  const handleSignup = async (event) => {
    event.preventDefault();
    try {
      // useEffect(() => {
      //   const fetchData = async () => {
      //     try {
      //       const response = await api.get("auth/register");
      //       setMyData(response.data);
      //     } catch (err) {
      //       console.error(err);
      //     }
      //   };
      // });

      const response = await axios.post(
        "http://localhost:3000/api/auth/register",
        {
          name: values.name,
          email: values.email,
          password: values.password,
          role: values.role,
          address: values.address,
          pinCode: values.pinCode,
          city: values.city,
          shopName: values.shopName,
        },
        {
          withCredentials: true,
        }
      );
      const token = response.data.token;
      localStorage.setItem("token", token);
      console.log(response.data, "Signup successful");
      navigate("/");
    } catch (err) {
      console.log(err);
    }
  };

  const [values, setValues] = useState({
    name: "",
    email: "",
    password: "",
    role: "",
    address: "",
    pinCode: "",
    city: "",
    shopName: "",
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
        <form action="" onSubmit={handleSignup}>
          <div className="loginsignup-fields">
            <div>
              <input
                type="text"
                placeholder="Your Name"
                name="name"
                onChange={handleInput}
              ></input>
              {errors.name && <p style={{ color: "red" }}>{errors.name}</p>}
            </div>
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
            <div>
              {/* <label htmlFor="dropdown">Role</label> */}
              <select id="dropdown" name="role" onChange={handleInput}>
                <option value="">Select Role</option>
                <option value="admin">Admin</option>
                <option value="user">User</option>
              </select>
            </div>
            <div>
              <input
                type="text"
                placeholder="Your Address"
                name="address"
                onChange={handleInput}
              ></input>
            </div>
            <div>
              <input
                type="text"
                placeholder="Your Pincode"
                name="pincode"
                onChange={handleInput}
              ></input>
            </div>
            <div>
              <input
                type="text"
                placeholder="Your City"
                name="city"
                onChange={handleInput}
              ></input>
            </div>
            {values.role === "admin" ? (
              <div>
                <input
                  type="text"
                  placeholder="Your Shop name"
                  name="shopName"
                  onChange={handleInput}
                ></input>
              </div>
            ) : (
              <></>
            )}
          </div>
          <p className="loginsignup-login">
            Already Have an account?{" "}
            <Link to="/login">
              <span>Login here</span>
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
