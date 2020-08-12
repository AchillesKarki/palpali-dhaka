import { ShopActionTypes } from './shop.types';

const INITIAL_STATE = {
  products: [],
  isLoading: false,
  errorMessage: null,
  productsFilters: {
    price: [],
    rating: [],
  },
};

const shopReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case ShopActionTypes.FETCH_SHOP_PRODUCTS_START:
      return {
        ...state,
        isLoading: true,
      };

    case ShopActionTypes.FETCH_SHOP_PRODUCTS_SUCCESS:
      return {
        ...state,
        isLoading: false,
        products: action.payload,
      };

    case ShopActionTypes.FETCH_SHOP_PRODUCTS_FAILURE:
      return {
        ...state,
        isLoading: false,
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
