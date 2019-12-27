import CartActionTypes from "./cart.types";

export const toggleCartHidden = () => ({
  type: CartActionTypes.TOGGLE_CART_HIDDEN
});

export const addItem = newItem => ({
  type: CartActionTypes.ADD_ITEM,
  payload: newItem
});

export const removeItem = item => ({
  type: CartActionTypes.REMOVE_ITEM,
  payload: item
});

export const removeProduct = item => ({
  type: CartActionTypes.REMOVE_PRODUCT,
  payload: item
});
