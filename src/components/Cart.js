import React from "react";
import { useNavigate } from 'react-router-dom';
import { deleteFromCart, getCartItemsByUser, deleteProduct } from '../axios-services';

function Cart({ cartItems, token, setCartItems, currentUser }) {
  const navigate = useNavigate();

  let total = cartItems.reduce(function(tot, arr) { // Sums item prices in cart
    return tot + arr.price;
  }, 0);

  const getCartItems = async () => {
    setCartItems(await getCartItemsByUser(currentUser.id, token));
  };

  const handleDelete = async (itemId, token) => {
    await deleteFromCart(itemId, token);
    await getCartItems();
  };

  const checkout = () => {
    cartItems.map(cartItem => {
      deleteProduct(cartItem.productId, token);
      handleDelete(cartItem.id, token);
    });
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
      <button className="checkoutBtn"onClick={() => { checkout(), navigate("/checkout") }}>Checkout</button>
    </span>
  )
};

export default Cart;