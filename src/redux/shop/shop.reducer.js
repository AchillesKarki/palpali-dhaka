import { ShopActionTypes } from './shop.types';

const INITIAL_STATE = {
  products: [],
  isShopLoading: false,
  errorMessage: null,
  productsFilters: {
    price: [],
    rating: [],
  },
};

const shopReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case ShopActionTypes.ASYNC_SHOP_REQUEST_START:
      return {
        ...state,
        isShopLoading: true,
      };

    case ShopActionTypes.ASYNC_SHOP_REQUEST_SUCCESS:
      return {
        ...state,
        isShopLoading: false,
        products: action.payload,
      };

    case ShopActionTypes.ASYNC_SHOP_REQUEST_FAILURE:
      return {
        ...state,
        isShopLoading: false,
        errorMessage: action.payload,
      };

    case ShopActionTypes.SET_PRODUCTS_FILTERS:
      const newProductFilters = { ...state.productsFilters, [action.payload.filterType]: action.payload.filterValue };

      return {
        ...state,
        productsFilters: newProductFilters,
      };

    case ShopActionTypes.CLEAR_PRODUCTS_FILTERS:
      return {
        ...state,
        productsFilters: {
          price: [],
          rating: [],
        },
      };

    default:
      return state;
  }
};

export default shopReducer;
