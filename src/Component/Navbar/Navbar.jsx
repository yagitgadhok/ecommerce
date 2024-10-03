import React, { useContext, useState } from "react";
import "./Navbar.css";

import logo from "../../Assets/logo.png";
import cart_icon from "../../Assets/cart_icon.png";
import user_icon from "../../Assets/user.png";
import { Link, useNavigate } from "react-router-dom";
import { ShopContext } from "../../Context/ShopContext";

export const Navbar = () => {
  const [menu, setMenu] = useState("shop");
  const { getTotalCartItem } = useContext(ShopContext);
  const navigate = useNavigate();

  const logout = () => {
    localStorage.clear();

    navigate("/");
  };

  const user_data = localStorage.getItem("user");
  // console.log(JSON.parse(user_data).name);
  return (
    <div className="navbar">
      <div className="nav-logo">
        <img src={logo} alt="logo" />
        <p> Brook </p>
      </div>
      <ul className="nav-menu">
        <li
          onClick={() => {
            setMenu("shop");
          }}
        >
          <Link style={{ textDecoration: "none" }} to="/">
            Shop
          </Link>
          {/* {menu === "shop" ? <hr /> : <></>} */}
        </li>
        <li
          onClick={() => {
            setMenu("men");
          }}
        >
          <Link style={{ textDecoration: "none" }} to="/mens">
            Men
          </Link>
          {/* {menu === "men" ? <hr /> : <></>} */}
        </li>
        <li
          onClick={() => {
            setMenu("women");
          }}
        >
          <Link style={{ textDecoration: "none" }} to="/womens">
            Women
          </Link>
          {/* {menu === "women" ? <hr /> : <></>} */}
        </li>
        <li
          onClick={() => {
            setMenu("kids");
          }}
        >
          <Link style={{ textDecoration: "none" }} to="/kids">
            Kids
          </Link>
          {/* {menu === "kids" ? <hr /> : <></>} */}
        </li>
      </ul>
      {localStorage.getItem("user") ? (
        <div className="nav-login">
          <h3>Hi,</h3>
          {localStorage.getItem("user")}
          <Link to="/">
            <button onClick={logout}>Logout</button>
          </Link>
          <Link to="/cart">
            <img src={cart_icon} alt=""></img>
          </Link>
          <div className="nav-cart-count">{getTotalCartItem()}</div>
        </div>
      ) : (
        <div className="nav-login">
          <Link to="/login">
            <button>Login</button>
          </Link>
          <Link to="/cart">
            <img src={cart_icon} alt=""></img>
          </Link>
          <div className="nav-cart-count">{getTotalCartItem()}</div>
        </div>
      )}
      <div className="nav-login">
        {localStorage.getItem("user") ? (
          <Link to="/user-profile">
            <img className="user-icon" src={user_icon} alt=""></img>
          </Link>
        ) : (
          <Link to="/login">
            <img className="user-icon" src={user_icon} alt=""></img>
          </Link>
        )}
      </div>
    </div>
  );
};
