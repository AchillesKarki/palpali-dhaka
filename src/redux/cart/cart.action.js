import { CartActionTypes } from './cart-types';

export const closeCartDropdown = () => ({
  type: CartActionTypes.CLOSE_CART_DROPDOWN,
});

export const toggleChartDropdown = () => ({
  type: CartActionTypes.TOGGLE_CART_DROPDOWN,
});

export const addCartItem = (item) => ({
  type: CartActionTypes.ADD_CART_ITEM,
  payload: item,
});

export const removeCartItem = (item) => ({
  type: CartActionTypes.REMOVE_CART_ITEM,
  payload: item,
});

export const clearCartItem = (item) => ({
  type: CartActionTypes.CLEAR_CART_ITEM,
  payload: item,
});
