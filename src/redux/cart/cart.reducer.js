import { CartActionTypes } from './cart-types';
import { addItemToCart, removeItemFromCart, clearItemFromCart } from '../../utility/utils';

const INITIAL_STATE = {
  toggleCart: false,
  cartItems: [],
};

const cartReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case CartActionTypes.CLOSE_CART_DROPDOWN:
      return {
        ...state,
        toggleCart: false,
      };

    case CartActionTypes.TOGGLE_CART_DROPDOWN:
      return {
        ...state,
        toggleCart: !state.toggleCart,
      };

    case CartActionTypes.ADD_CART_ITEM:
      return {
        ...state,
        cartItems: addItemToCart(state.cartItems, action.payload),
      };

    case CartActionTypes.REMOVE_CART_ITEM:
      return {
        ...state,
        cartItems: removeItemFromCart(state.cartItems, action.payload),
      };

    case CartActionTypes.CLEAR_CART_ITEM:
      return {
        ...state,
        cartItems: clearItemFromCart(state.cartItems, action.payload),
      };

    default:
      return state;
  }
};

export default cartReducer;
