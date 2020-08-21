import { CartActionTypes } from './cart-types';

const INITIAL_STATE = {
  toggleCart: false,
  isCartLoading: false,
  errorMessage: null,
  userCart: {
    cartItems: [],
  },
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

    case CartActionTypes.CLEAR_WHOLE_CART:
      return {
        ...state,
        userCart: {
          cartItems: [],
        },
      };

    case CartActionTypes.ASYNC_CART_REQUEST_START:
      return {
        ...state,
        isCartLoading: true,
      };

    case CartActionTypes.ASYNC_CART_REQUEST_SUCCESS:
      return {
        ...state,
        isCartLoading: false,
        userCart: action.payload,
      };

    case CartActionTypes.ASYNC_CART_REQUEST_FAILURE:
      return {
        ...state,
        isCartLoading: false,
        errorMessage: action.payload,
      };

    default:
      return state;
  }
};

export default cartReducer;
