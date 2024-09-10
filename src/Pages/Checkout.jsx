import { Field, Formik, Form } from "formik";
import React from "react";
import "./CSS/Chceckout.css";

export const Checkout = () => {
  return (
    <div className="checkout">
      <h1>Checkout</h1>
      <Formik
        initialValues={{
          name: "",
          email: "",
          phone: "",
          street: "",
          state: "",
          pinCode: "",
        }}
        onSubmit={(formData) => {
          console.log("Checkout", formData);
        }}
      >
        <Form className="form-fields">
          <Field name="name" type="text" placeholder="Enter FullName"></Field>
          <Field name="email" type="email" placeholder="Enter Email"></Field>
          <Field
            name="phone"
            type="number"
            inputmode="numeric"
            placeholder="Enter Phone"
          ></Field>
          <Field name="street" type="text" placeholder="Enter Street"></Field>
          <Field name="state" type="Text" placeholder="Enter State"></Field>
          <Field
            name="pincode"
            type="Number"
            placeholder="Enter Pincode"
          ></Field>
          <button type="submit">Checkout</button>
        </Form>
      </Formik>
    </div>
  );
};
