import React, { useContext, useState } from "react";
import "./CartItems.css";
import { ShopContext } from "../../Context/ShopContext";
import remove_icon from "../../Assets/cart_cross_icon.png";
import { useNavigate } from "react-router-dom";

export const CartItems = () => {
  const { getTotalCartAmount, all_product, cartItems, removeFromCart } =
    useContext(ShopContext);
  const userId = localStorage.getItem("userId");

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [promoCode, setPromoCode] = useState("");

  const coupons = [
    { name: "SAVE10", discount: "10%" },
    { name: "SAVE20", discount: "20%" },
    { name: "SAVE10", discount: "10%" },
    { name: "SAVE20", discount: "20%" },
    { name: "SAVE10", discount: "10%" },
    { name: "SAVE20", discount: "20%" },
    { name: "SAVE10", discount: "10%" },
    { name: "SAVE20", discount: "20%" },
    { name: "SAVE10", discount: "10%" },
    { name: "SAVE20", discount: "20%" },
    { name: "SAVE10", discount: "10%" },
    { name: "SAVE20", discount: "20%" },
    { name: "SAVE10", discount: "10%" },
    { name: "SAVE20", discount: "20%" },
    { name: "SAVE10", discount: "10%" },
    { name: "SAVE20", discount: "20%" },
    { name: "SAVE10", discount: "10%" },
    { name: "SAVE20", discount: "20%" },
    { name: "SAVE10", discount: "10%" },
    { name: "SAVE20", discount: "20%" },
    { name: "SAVE10", discount: "10%" },
    { name: "SAVE20", discount: "20%" },
    { name: "SAVE10", discount: "10%" },
    { name: "SAVE20", discount: "20%" },
    { name: "SAVE10", discount: "10%" },
    { name: "SAVE20", discount: "20%" },
    { name: "SAVE10", discount: "10%" },
    { name: "SAVE20", discount: "20%" },
    { name: "SAVE10", discount: "10%" },
    { name: "SAVE20", discount: "20%" },
    { name: "SAVE10", discount: "10%" },
    { name: "SAVE20", discount: "20%" },
    { name: "SAVE10", discount: "10%" },
    { name: "SAVE20", discount: "20%" },
    { name: "SAVE10", discount: "10%" },
    { name: "SAVE20", discount: "20%" },
    { name: "SAVE10", discount: "10%" },
    { name: "SAVE20", discount: "20%" },
    { name: "SAVE10", discount: "10%" },
    { name: "SAVE20", discount: "20%" },
    { name: "SAVE10", discount: "10%" },
    { name: "SAVE20", discount: "20%" },
    { name: "SAVE10", discount: "10%" },
    { name: "SAVE20", discount: "20%" },
    { name: "SAVE10", discount: "10%" },
    { name: "SAVE20", discount: "20%" },
    { name: "SAVE10", discount: "10%" },
    { name: "SAVE20", discount: "20%" },
  ];

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleCouponClick = (couponName) => {
    setPromoCode(couponName);
    closeModal();
  };

  const navigate = useNavigate();
  return (
    <div className="cartitems">
      <div className="cartitems-format-main">
        <p>Products</p>
        <p>Title</p>
        <p>Price</p>
        <p>Quantity</p>
        <p>Total</p>
        <p>Remove</p>
      </div>
      <hr />
      {all_product.map((e) => {
        if (cartItems[e.id] > 0) {
          return (
            <div>
              <div className="cartitems-format cartitems-format-main">
                <img src={e.image} alt="" className="carticon-product-icon" />
                <p>{e.name}</p>
                <p>₹{e.new_price}</p>
                <button className="cartitems-quantity">
                  {cartItems[e.id]}
                </button>
                <p>₹{e.new_price * cartItems[e.id]}</p>
                <img
                  className="cartitems-remove-icon"
                  src={remove_icon}
                  onClick={() => {
                    removeFromCart(e.id);
                  }}
                  alt=""
                />
              </div>
              <hr />
            </div>
          );
        }
        return null;
      })}
      <div className="cartitems-down">
        <div className="cartitems-total">
          <h1>Cart Totals</h1>
          <div>
            <div className="cartitems-total-item">
              <p>Subtotal</p>
              <p>₹{getTotalCartAmount()}</p>
            </div>
            <hr />
            <div className="cartitems-total-item">
              <p>Shipping Fee</p>
              <p>Free</p>
            </div>
            <hr />
            <div className="cartitems-total-item">
              <h3>Total</h3>
              <h3>₹{getTotalCartAmount()}</h3>
            </div>
          </div>
          <button
            onClick={() => {
              if (userId) {
                navigate("/checkout");
              } else {
                alert("User Not Logged in");
              }
            }}
          >
            Proceed To Checkout
          </button>
        </div>
        <div className="cartitems-promocode">
          <p>If You have a promo code enter here</p>
          <div className="cartitems-promobox">
            <input type="text" placeholder="Enter Promo Code"></input>
            <button>Submit</button>
            <a
              onClick={openModal}
              className="text-blue-500 cursor-pointer add-coupon-link"
            >
              +Add coupon
            </a>
          </div>
          {isModalOpen && (
            <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
              <div className="bg-white p-6 rounded-lg shadow-lg w-96 max-h-96 overflow-y-auto">
                <h2 className="text-xl font-bold mb-4">
                  <ins>Select a Coupon</ins>
                </h2>
                <div className="table-container">
                  <table className="w-full border-collapse">
                    <thead className="sticky top-0 bg-white">
                      <tr>
                        <th className="border p-2">Coupon Name</th>
                        <th className="border p-2">Discount</th>
                      </tr>
                    </thead>
                    <tbody>
                      {coupons.map((coupon, index) => (
                        <tr
                          key={index}
                          onClick={() => handleCouponClick(coupon.name)}
                          className="cursor-pointer hover:bg-gray-200"
                        >
                          <td className="border p-2">{coupon.name}</td>
                          <td className="border p-2">{coupon.discount}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <button
                  onClick={closeModal}
                  className="mt-4 bg-purple-500 text-white p-2 rounded"
                >
                  Close
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
