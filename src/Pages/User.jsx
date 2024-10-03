import React, { useEffect, useState } from "react";
import "./CSS/User.css";
import axios from "axios";
import edit_icon from "../Assets/pen.png";
export const User = () => {
  //   const user_data = JSON.parse(localStorage.getItem("userData"));
  //   let data = {};
  const [editDetail, setEditDetail] = useState(false);
  const token = localStorage.getItem("token");
  const [profileData, setProfileData] = useState({
    name: "",
    email: "",
    phone: "",
    shopName: "",
  });
  const userId = localStorage.getItem("userId");
  // const [address, setAddress] = useState({
  //   street: "",
  //   pinCode: "",
  //   city: "",
  // });

  useEffect(() => {
    const headers = { token: token };
    axios
      .get(`http://localhost:3000/api/users/${userId}`, { headers })
      .then((res) => {
        console.log(res.data);
        const data = res.data;
        setProfileData({
          name: data.name,
          email: data.email,
          phone: data.phone,
          shopName: data.shopName,
        });
      });
    console.log(profileData);
  }, []);

  const handleInput = (event) => {
    const { name, value } = event.target;
    setProfileData((prevState) => ({
      ...prevState,
      address: {
        ...prevState.address,
        [name]: value,
      },
      [name]: value,
    }));
  };

  const handleAddress = (event) => {
    const { name, value } = event.target;
    setProfileData((prevState) => ({
      ...prevState,
      address: {
        ...prevState.address,
        [name]: value,
      },
    }));
  };

  const updateDetail = async (event) => {
    event.preventDefault();
    try {
      const headers = { token: token };
      const req = {
        name: profileData.name,
        email: profileData.email,
        phone: profileData.phone,
        shopName: profileData.shopName,
      };
      const response = await axios.put(
        `http://localhost:3000/api/users/${userId}`,
        req,
        { headers },
        { withCredentials: true }
      );
      console.log(response, "res");
      console.log(req, "req");
      setEditDetail(!editDetail);
    } catch (err) {
      console.log(err);
    }
  };

  //   console.log(data, "user");
  return (
    <div className="user">
      <div className="header">
        <h1>User Profile</h1>
        <button className="edit-button">
          <img
            className="edit-icon"
            src={edit_icon}
            alt=""
            onClick={() => {
              setEditDetail(true);
            }}
          />
        </button>
      </div>
      {editDetail ? (
        <div className="form-container">
          <form action="" onSubmit={updateDetail}>
            <div className="user-fields">
              <div>
                <input
                  type="text"
                  placeholder="Your Name"
                  name="name"
                  value={profileData.name}
                  onChange={handleInput}
                ></input>
                {/* {errors.name && <p style={{ color: "red" }}>{errors.name}</p>} */}
              </div>
              <div>
                <input
                  type="email"
                  placeholder="Your Email"
                  name="email"
                  value={profileData.email}
                  onChange={handleInput}
                ></input>
                {/* {errors.email && <p style={{ color: "red" }}>{errors.email}</p>} */}
              </div>
              <div>
                <input
                  type="number"
                  placeholder="Your Phone Number"
                  name="phone"
                  value={profileData.phone}
                  onChange={handleInput}
                ></input>
              </div>
              <div>
                <input
                  type="text"
                  placeholder="Your Shop Name"
                  name="shopName"
                  value={profileData.shopName}
                  onChange={handleInput}
                ></input>
              </div>
            </div>
            <button className="update-button" type="submit">
              Update
            </button>
            <button
              className="cancel-button"
              onClick={() => {
                setEditDetail(false);
              }}
            >
              Cancel
            </button>
          </form>
        </div>
      ) : (
        <div className="user-container">
          <ul className="list-left">
            <li>
              <span>Username: </span>
            </li>
            <li>
              <span>Email: </span>
            </li>
            <li>
              <span>Phone Number: </span>
            </li>
            <li>
              <span>Shop Name: </span>
            </li>
          </ul>
          <ul className="list-right">
            <li>
              <span>{profileData.name}</span>
            </li>
            <li>
              <span>{profileData.email}</span>
            </li>
            <li>
              <span>{profileData.phone}</span>
            </li>
            <li>
              <span>{profileData.shopName}</span>
            </li>
          </ul>
        </div>
      )}
    </div>
  );
};
