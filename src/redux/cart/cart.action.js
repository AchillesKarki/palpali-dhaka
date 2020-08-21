import { CartActionTypes } from './cart-types';
import {
  fetchCartItemsFromDatabase,
  addCartItemToDatabase,
  removeCartItemFromDatabase,
  clearItemFromDataBase,
  clearWholeCartFromDataBase,
} from '../../utility/cart-utils';

export const closeCartDropdown = () => ({
  type: CartActionTypes.CLOSE_CART_DROPDOWN,
});

export const toggleCartDropdown = () => ({
  type: CartActionTypes.TOGGLE_CART_DROPDOWN,
});

export const clearWholeCart = () => ({
  type: CartActionTypes.CLEAR_WHOLE_CART,
});

export const asyncCartRequestStart = () => ({
  type: CartActionTypes.ASYNC_CART_REQUEST_START,
});

export const asyncCartRequestSuccess = (userCart) => ({
  type: CartActionTypes.ASYNC_CART_REQUEST_SUCCESS,
  payload: userCart,
});

export const asyncCartRequestFailure = (errorMessage) => ({
  type: CartActionTypes.ASYNC_CART_REQUEST_FAILURE,
  payload: errorMessage,
});

export const fetchCartItemsStartAsync = () => {
  return async (dispatch) => {
    dispatch(asyncCartRequestStart());
    const apiResponse = await fetchCartItemsFromDatabase();

    if (apiResponse.type === 'success') {
      dispatch(asyncCartRequestSuccess(apiResponse.userCart));
    } else {
      dispatch(asyncCartRequestFailure(apiResponse.errorMessage));
    }
  };
};

export const addCartItemStartAsync = (newCartItem) => {
  return async (dispatch) => {
    dispatch(asyncCartRequestStart());
    const apiResponse = await addCartItemToDatabase(newCartItem);

    if (apiResponse.type === 'success') {
      dispatch(fetchCartItemsStartAsync());
    } else {
      dispatch(asyncCartRequestFailure(apiResponse.errorMessage));
    }
  };
};

export const removeCartItemStartAsync = (newCartItem) => {
  return async (dispatch) => {
    dispatch(asyncCartRequestStart());
    const apiResponse = await removeCartItemFromDatabase(newCartItem);

    if (apiResponse.type === 'success') {
      dispatch(fetchCartItemsStartAsync());
    } else {
      dispatch(asyncCartRequestFailure(apiResponse.errorMessage));
    }
  };
};

export const clearCartItemStartAsync = (newCartItem) => {
  return async (dispatch) => {
    dispatch(asyncCartRequestStart());
    const apiResponse = await clearItemFromDataBase(newCartItem);

    if (apiResponse.type === 'success') {
      dispatch(fetchCartItemsStartAsync());
    } else {
      dispatch(asyncCartRequestFailure(apiResponse.errorMessage));
    }
  };
};

export const clearWholeCartStartAsync = () => {
  return async (dispatch) => {
    dispatch(asyncCartRequestStart());
    const apiResponse = await clearWholeCartFromDataBase();

    if (apiResponse.type === 'success') {
      dispatch(fetchCartItemsStartAsync());
    } else {
      dispatch(asyncCartRequestFailure(apiResponse.errorMessage));
    }
  };
};
