import { ShopActionTypes } from './shop.types';

const INITIAL_STATE = {
  products: [],
  newProducts: [],
  singleProduct: null,
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
      const productKey = action.payload.newArrival ? 'newProducts' : 'products';
      return {
        ...state,
        isShopLoading: false,
        [productKey]: action.payload.products,
      };

    case ShopActionTypes.ASYNC_SINGLE_PRODUCT_SHOP_REQUEST_SUCCESS:
      return {
        ...state,
        isShopLoading: false,
        singleProduct: action.payload,
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
