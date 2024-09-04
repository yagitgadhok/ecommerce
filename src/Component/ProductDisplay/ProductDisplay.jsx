import React, { useContext, useEffect, useState } from "react";
import "./ProductDisplay.css";
import star_icon from "../../Assets/star_icon.png";
import star_dull_icon from "../../Assets/star_dull_icon.png";
import { ShopContext } from "../../Context/ShopContext";
import api from "../../Services/User.service";

export const ProductDisplay = (props) => {
  const { product } = props;
  const { addToCart } = useContext(ShopContext);
  const [data, setData] = useState();

  // useEffect(async () => {
  //   try {
  //     const response = await api.get("users");
  //     setData(response.data);
  //   } catch (err) {
  //     console.error(err);
  //   }
  // });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await api.get("users");
        setData(response.data);
        console.log(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  console.log(window.location.href);

  return (
    <div className="productdisplay">
      <div className="productdisplay-left">
        <div className="productdisplay-img-list">
          <img src={product.image} alt=""></img>
          <img src={product.image} alt=""></img>
          <img src={product.image} alt=""></img>
          <img src={product.image} alt=""></img>
        </div>
        <div className="productdisplay-img">
          <img
            className="productdisplay-main-img"
            src={product.image}
            alt=""
          ></img>
        </div>
      </div>
      <div className="productdisplay-right">
        <h1>{product.name}</h1>
        <div className="productdisplay-right-stars">
          <img src={star_icon} alt="" />
          <img src={star_icon} alt="" />
          <img src={star_icon} alt="" />
          <img src={star_icon} alt="" />
          <img src={star_dull_icon} alt="" />
          <p>120</p>
        </div>
        <div className="productdisplay-right-price">
          <div className="productdisplay-right-price-new">
            ₹{product.new_price}
          </div>
          <div className="productdisplay-right-price-old">
            ₹{product.old_price}
          </div>
        </div>
        <div className="productdisplay-right-description">
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Suscipit
          quod porro ducimus aperiam, sequi hic sunt magni, modi non tempore,
          numquam a. Delectus itaque reiciendis numquam non accusantium ipsa nam
          praesentium earum.
        </div>
        <div className="productdisplay-right-size">
          <h1>Select size</h1>
          <div className="productdisplay-right-sizes">
            <div>XS</div>
            <div>S</div>
            <div>M</div>
            <div>L</div>
            <div>XL</div>
          </div>
        </div>
        <button
          onClick={() => {
            addToCart(product.id);
          }}
        >
          Add to Cart
        </button>
        <p className="productdisplay-right-category">
          <span>Category:</span>Women , T-Shirt, Crop Top
        </p>
        <p className="productdisplay-right-category">
          <span>Tags:</span>Modern , Latest
        </p>
      </div>
    </div>
  );
};
