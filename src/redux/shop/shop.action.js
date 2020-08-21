import { fetchProductsFromDatabase } from '../../utility/shop-utils';
import { ShopActionTypes } from './shop.types';

export const asyncShopRequestStart = () => ({
  type: ShopActionTypes.ASYNC_SHOP_REQUEST_START,
});

export const asyncShopRequestSuccess = (products) => ({
  type: ShopActionTypes.ASYNC_SHOP_REQUEST_SUCCESS,
  payload: products,
});

export const asyncShopRequestFailure = (errorMessage) => ({
  type: ShopActionTypes.ASYNC_SHOP_REQUEST_FAILURE,
  payload: errorMessage,
});

export const setProductsFilters = (filterType, filterValue) => ({
  type: ShopActionTypes.SET_PRODUCTS_FILTERS,
  payload: { filterType, filterValue },
});

export const clearProductsFilters = () => ({
  type: ShopActionTypes.CLEAR_PRODUCTS_FILTERS,
});

export const fetchProductsStartAsync = (productType, filters = null) => {
  return async (dispatch) => {
    dispatch(asyncShopRequestStart());
    const apiResponse = await fetchProductsFromDatabase(productType, filters);

    if (apiResponse.type === 'success') {
      dispatch(asyncShopRequestSuccess(apiResponse.products));
    } else {
      dispatch(asyncShopRequestFailure(apiResponse.errorMessage));
    }
  };
};
