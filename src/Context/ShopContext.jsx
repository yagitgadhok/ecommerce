import React, { createContext, useState } from "react";
import all_product from "../Assets/all_product";
import { redirect, useNavigate } from "react-router-dom";
import axios from "axios";

export const ShopContext = createContext(null);
// const getDeafaultCart = () => {
//   let cart = {};
//   for (let index = 0; index < all_product.length + 1; index++) {
//     cart[index] = 0;
//   }
//   return cart;
// };

const ShopContextProvider = (props) => {
  const [cartItems, setCartItems] = useState({});
  const headers = { token: localStorage.getItem("token") };
  // const navigate = useNavigate();

  //   const addToCart = (itemId) => {
  //     console.log(itemId);

  //     setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] + 1 }));

  //     console.log("cart items", cartItems);
  //   };

  const addToCart = (productId) => {
    const pi = String(productId);

    console.log("local", localStorage.getItem("token"), "header", headers);
    if (localStorage.getItem("token")) {
      redirect("/login");
    }
    setCartItems((prevItem) => {
      const newItem = { ...prevItem };
      try {
        const response = axios.post(
          `http://localhost:3000/api/cart`,
          {
            medicineId: { pi },
            quantity: 1,
          },
          {
            headers,
          }
        );
      } catch (err) {}
      if (newItem[productId]) {
        newItem[productId] += 1;
      } else {
        newItem[productId] = 1;
      }
      return newItem;
    });
  };

  const removeFromCart = (itemId) => {
    setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] - 1 }));
  };

  const getTotalCartAmount = () => {
    let totalAmount = 0;
    for (const item in cartItems) {
      if (cartItems[item] > 0) {
        let itemInfo = all_product.find(
          (product) => product.id === Number(item)
        );
        totalAmount += cartItems[item] * itemInfo.new_price;
      }
    }
    return totalAmount;
  };

  const getTotalCartItem = () => {
    let totalItem = 0;
    for (const item in cartItems) {
      if (cartItems[item] > 0) {
        totalItem += cartItems[item];
      }
    }
    return totalItem;
  };

  const contextValue = {
    all_product,
    cartItems,
    addToCart,
    removeFromCart,
    getTotalCartAmount,
    getTotalCartItem,
  };

  return (
    <ShopContext.Provider value={contextValue}>
      {props.children}
    </ShopContext.Provider>
  );
};

export default ShopContextProvider;
