import { fetchProductsFromDatabase, fetchSingleProductFromDatabase } from '../../utility/shop-utils';
import { ShopActionTypes } from './shop.types';

export const setProductsFilters = (filterType, filterValue) => ({
  type: ShopActionTypes.SET_PRODUCTS_FILTERS,
  payload: { filterType, filterValue },
});

export const clearProductsFilters = () => ({
  type: ShopActionTypes.CLEAR_PRODUCTS_FILTERS,
});

export const asyncShopRequestStart = () => ({
  type: ShopActionTypes.ASYNC_SHOP_REQUEST_START,
});

export const asyncShopRequestSuccess = (products) => ({
  type: ShopActionTypes.ASYNC_SHOP_REQUEST_SUCCESS,
  payload: products,
});

export const asyncSingleProductShopRequestSuccess = (product) => ({
  type: ShopActionTypes.ASYNC_SINGLE_PRODUCT_SHOP_REQUEST_SUCCESS,
  payload: product,
});

export const asyncShopRequestFailure = (errorMessage) => ({
  type: ShopActionTypes.ASYNC_SHOP_REQUEST_FAILURE,
  payload: errorMessage,
});

export const fetchProductsStartAsync = (productType, filters = null) => {
  return async (dispatch) => {
    dispatch(asyncShopRequestStart());
    const apiResponse = await fetchProductsFromDatabase(productType, filters);

    if (apiResponse.type === 'success') {
      dispatch(asyncShopRequestSuccess(apiResponse));
    } else {
      dispatch(asyncShopRequestFailure(apiResponse.errorMessage));
    }
  };
};

export const fetchSingleProductStartAsync = (productId) => {
  return async (dispatch) => {
    dispatch(asyncShopRequestStart());
    const apiResponse = await fetchSingleProductFromDatabase(productId);

    if (apiResponse.type === 'success') {
      dispatch(asyncSingleProductShopRequestSuccess(apiResponse.product));
    } else {
      dispatch(asyncShopRequestFailure(apiResponse.errorMessage));
    }
  };
};
