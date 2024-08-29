import React from "react";
import "./NewsLetter.css";

export const NewsLetter = () => {
  return (
    <div className="newsletter">
      <h1>Get Exclusive offers on your Email</h1>
      <p>Get the latest updates on new products and upcoming sales</p>
      <div>
        <input type="email" placeholder="Enter your email" />
        <button>Subscribe</button>
      </div>
    </div>
  );
};
