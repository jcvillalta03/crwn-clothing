import React from "react";

import "./checkout-item.styles.scss";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import { removeProduct } from "../../redux/cart/cart.actions";
import {
  selectCartItems,
  selectCartTotal
} from "../../redux/cart/cart.selectors";

const CheckoutItem = ({ cartItem, removeProduct }) => {
  const { imageUrl, name, quantity, price } = cartItem;
  return (
    <div className="checkout-item">
      <div className="image-container">
        <img src={imageUrl} alt={name} />
      </div>
      <span className="name">{name}</span>
      <span className="quantity">{quantity}</span>
      <span className="price">${price}</span>
      <div className="remove-button" onClick={() => removeProduct(cartItem)}>
        &#10005;
      </div>
    </div>
  );
};

const mapDispatchToProps = dispatch => ({
  removeProduct: item => dispatch(removeProduct(item))
});

export default connect(null, mapDispatchToProps)(CheckoutItem);
