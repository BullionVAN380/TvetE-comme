import React, { useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom' // ✅ for navigation
import { ShopContext } from '../Context/ShopContext'
import './CartItems.css'
import remove_icon from '../Assets/cart_cross_icon.png'

const CartItems = () => {
  const { getTotalCartAmount, all_product, cartItems, removeToCart } = useContext(ShopContext);
  const [promoCode, setPromoCode] = useState("");
  const navigate = useNavigate();

  //Handle Proceed to Checkout
  const handleCheckout = () => {
    if (getTotalCartAmount() === 0) {
      alert("Your cart is empty! Please add items before checkout.");
    } else {
      navigate("/checkout"); // change to your actual checkout route
    }
  };

  // Handle Promo Code Submit
  const handlePromoSubmit = () => {
    if (!promoCode) {
      alert("Please enter a promo code!");
      return;
    }
    // You can add validation logic here
    alert(`Promo code "${promoCode}" applied!`);
    setPromoCode(""); // clear input
  };

  return (
    <div className='cartitems'>
      <div className="cartitems-format-main">
        <p>Product</p>
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
            <div key={e.id}>
              <div className="cartitems-fomat cartitems-format-main">
                <img src={e.image} className='carticon-product-icon' alt="" />
                <p>{e.name}</p>
                <p>Ksh{e.new_price}</p>
                <button className='cartitems-quantity'>{cartItems[e.id]}</button>
                <p>Ksh{e.new_price * cartItems[e.id]}</p>
                <img
                  className='cartitem-remove-icon'
                  src={remove_icon}
                  onClick={() => removeToCart(e.id)}
                  alt=""
                />
              </div>
              <hr />
            </div>
          )
        }
        return null;
      })}

      <div className="cartitem-down">
        <div className="cartitem-total">
          <h1>Cart Total</h1>
          <div>
            <div className="cartitem-total-item">
              <p>Subtotal</p>
              <p>Ksh{getTotalCartAmount()}</p>
            </div>
            <hr />
            <div className="cartitem-total-item">
              <p>Shipping Fee</p>
              <p>Free</p>
            </div>
            <hr />
            <div className="cartitem-total-item">
              <h3>Total</h3>
              <h3>Ksh{getTotalCartAmount()}</h3>
            </div>
          </div>
          <button onClick={handleCheckout}>PROCEED TO CHECKOUT</button>
        </div>

        <div className="cartitem-promocode">
          <p>If you have a promocode, please enter it here..</p>
          <div className="cartitem-promobox">
            <input
              type="text"
              placeholder='Your Promocode'
              value={promoCode}
              onChange={(e) => setPromoCode(e.target.value)}
            />
            <button onClick={handlePromoSubmit}>SUBMIT</button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CartItems
