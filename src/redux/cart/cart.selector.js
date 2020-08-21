import { createSelector } from 'reselect';

const CartSelector = (state) => state.cart;

export const selectUserCart = createSelector(CartSelector, (cart) => cart.userCart);

export const selectToggleCart = createSelector(CartSelector, (cart) => cart.toggleCart);

export const selectIsCartLoading = createSelector(CartSelector, (cart) => cart.isCartLoading);

export const selectTotalCartItems = createSelector(selectUserCart, (userCart) =>
  userCart.cartItems.reduce((acc, cartItem) => acc + cartItem.quantity, 0)
);

export const selectTotalCartAmount = createSelector(selectUserCart, (userCart) =>
  userCart.cartItems.reduce((acc, cartItem) => acc + cartItem.quantity * cartItem.price, 0)
);
