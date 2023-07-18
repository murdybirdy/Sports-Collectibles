import React from "react";

function Checkout({ cartItems }) {
  return (
    <div className="checkoutContainer">
      <h1 className="checkoutSuccessful">CHECKOUT SUCCESSFUL!</h1>
      <h2 className="checkoutMsg">Your items will be shipped soon!</h2>
    </div>
  )
}

export default Checkout;