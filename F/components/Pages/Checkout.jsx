// src/Pages/Check
import './CSS/CheckOut.css'
import React, { useContext, useState } from "react";
import { ShopContext } from "../Context/ShopContext";
import { useNavigate } from "react-router-dom";

const Checkout = () => {
  const { getTotalCartAmount, cartItems, all_product } = useContext(ShopContext);
  const navigate = useNavigate();

  // form state
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    address: ""
  });

  // handle input changes
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // handle form submit (Place Order)
  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.name || !formData.email || !formData.phone || !formData.address) {
      alert("Please fill in all fields before placing your order.");
      return;
    }

    // collect order items
    const orderItems = all_product.filter((p) => cartItems[p.id] > 0);

    const order = {
      customer: formData,
      items: orderItems.map((p) => ({
        id: p.id,
        name: p.name,
        quantity: cartItems[p.id],
        price: p.new_price,
        total: p.new_price * cartItems[p.id],
      })),
      totalAmount: getTotalCartAmount(),
    };

    console.log("Order placed:", order); // later send this to backend
    alert("✅ Your order has been placed successfully!");

    // redirect to thank you / home page
    navigate("/");
  };

  return (
    <div className="checkout-container">
      <h1>Checkout</h1>

      <div className="checkout-summary">
        <h2>Order Summary</h2>
        <p>Cart Total: Ksh {getTotalCartAmount()}</p>
        <p>Shipping Fee: Free</p>
        <h3>Final Amount: Ksh {getTotalCartAmount()}</h3>
      </div>

      <form className="checkout-form" onSubmit={handleSubmit}>
        <h2>Billing Details</h2>
        <input
          type="text"
          name="name"
          placeholder="Full Name"
          value={formData.name}
          onChange={handleChange}
          required
        />
        <input
          type="email"
          name="email"
          placeholder="Email Address"
          value={formData.email}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="phone"
          placeholder="Phone Number"
          value={formData.phone}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="address"
          placeholder="Shipping Address"
          value={formData.address}
          onChange={handleChange}
          required
        />

        <button type="submit">PLACE ORDER</button>
      </form>
    </div>
  );
};

export default Checkout;
