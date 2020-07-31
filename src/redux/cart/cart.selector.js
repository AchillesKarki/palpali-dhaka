import { createSelector } from 'reselect';

const CartSelector = (state) => state.cart;

export const selectCartItems = createSelector(CartSelector, (cart) => cart.cartItems);

export const selectToggleCart = createSelector(CartSelector, (cart) => cart.toggleCart);

export const selectTotalCartItems = createSelector(selectCartItems, (cartItems) =>
  cartItems.reduce((acc, cartItem) => acc + cartItem.quantity, 0)
);

export const selectTotalCartAmount = createSelector(selectCartItems, (cartItems) =>
  cartItems.reduce((acc, cartItem) => acc + cartItem.quantity * cartItem.price, 0)
);
