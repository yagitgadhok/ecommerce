import { Field, Formik, Form } from "formik";
import React, { useEffect, useState } from "react";
import "./CSS/Chceckout.css";
import axios from "axios";
import address_icon from "../Assets/address.png";
import { useNavigate } from "react-router-dom";

export const Checkout = () => {
  const navigate = useNavigate();
  const userId = localStorage.getItem("userId");
  const token = localStorage.getItem("token");
  //   let response = {};
  const [response, setResponse] = useState({
    name: "",
    email: "",
    phone: "",
    street: "",
    state: "",
    pinCode: "",
  });
  //   const getData = async () => {
  //     const headers = { token: token };
  //     try {
  //       let res = await axios.get(`http://localhost:3000/api/users/${userId}`, {
  //         headers,
  //       });
  //       //   console.log(res);
  //       setResponse(res);
  //     } catch (error) {
  //       console.log(error);
  //       alert("Api failing");
  //     }
  //   };
  useEffect(() => {
    const headers = { token: token };
    axios
      .get(`http://localhost:3000/api/users/${userId}`, {
        headers,
      })
      .then((res) => {
        // setResponse(res.data);
        const data = res.data;
        console.log(res);
        setResponse({
          name: data.name,
          email: data.email,
          phone: data.phone,
          street: data.addresses[0].street,
          state: data.addresses[0].city,
          pinCode: data.addresses[0].postalCode,
        });
      });
  }, [token, userId]);
  //getData();
  console.log(response);

  const addAddress = (event) => {
    navigate("/address");
  };

  return (
    <div className="checkout">
      <h1>Checkout</h1>
      <Formik
        enableReinitialize={true}
        initialValues={response}
        onSubmit={(formData) => {
          if (!formData) {
            console.log("Checkout", formData);
          }
          console.log("Checkout", formData);
        }}
      >
        <Form className="form-fields">
          <Field
            className="field"
            name="name"
            type="text"
            placeholder="Enter FullName"
          ></Field>
          <Field
            className="field"
            name="email"
            type="email"
            placeholder="Enter Email"
          ></Field>
          <Field
            className="field"
            name="phone"
            type="number"
            inputmode="numeric"
            placeholder="Enter Phone"
          ></Field>

          <button className="address-button" onClick={addAddress}>
            <img src={address_icon} alt="" className="address-icon" />
            <h4>Add Address</h4>
          </button>

          {/* <Field
            className="field"
            name="street"
            type="text"
            placeholder="Enter Street"
          ></Field>
          <Field
            className="field"
            name="state"
            type="Text"
            placeholder="Enter State"
          ></Field>
          <Field
            className="field"
            name="pinCode"
            type="Number"
            placeholder="Enter Pincode"
          ></Field> */}
          <button type="submit" className="checkout-button">
            Checkout
          </button>
        </Form>
      </Formik>
    </div>
  );
};
