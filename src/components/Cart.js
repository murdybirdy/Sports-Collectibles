import React from "react";
import { useNavigate } from 'react-router-dom';

function Cart({ cartItems, token, setCartItems, currentUser }) {
  console.log(cartItems);
  const navigate = useNavigate();

  let total = cartItems.reduce(function(tot, arr) {
    return tot + arr.price;
  }, 0);

  const getCartItems = async () => {
    try {
      const response = await fetch(`/api/cart/${currentUser.id}`);
      const result = await response.json();
      console.log(result);
      setCartItems(result);

    } catch (error) {
      console.log(error);
      throw error;
    }
  };

  const handleDelete = async (itemId, token) => {
    try {
      const response = await fetch(`/api/cart/${itemId}`, {
        method: "DELETE",
        headers: {
          'Content-Type': 'appplication/json',
          'Authorization': `Bearer ${token}`
        },
      });
      getCartItems();

    } catch (error) {
      console.error(error);
    }
  }

  return (
    <span className="cart-container">
      <h2>My Cart</h2>
      {cartItems.map((cartItem) => (
        <div className="cart">
          <img src={cartItem.image_path} />
          <h2>{cartItem.name}</h2>
          <button onClick={() => handleDelete(cartItem.id, token)}>Delete From Cart</button>
          <h2>$ {cartItem.price}</h2>
        </div>
      ))}
      <h2>Total: $ {total}</h2>
      <button className="checkoutBtn"onClick={() => navigate("/checkout")}>Checkout</button>
    </span>
  )
};

export default Cart;