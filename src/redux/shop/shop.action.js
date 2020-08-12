import { fetchProductsFromDatabase } from '../../utility/shop-utils';
import { ShopActionTypes } from './shop.types';

export const fetchProductsStart = () => ({
  type: ShopActionTypes.FETCH_SHOP_PRODUCTS_START,
});

export const fetchProductsSuccess = (products) => ({
  type: ShopActionTypes.FETCH_SHOP_PRODUCTS_SUCCESS,
  payload: products,
});

export const fetchProductsFailure = (errorMessage) => ({
  type: ShopActionTypes.FETCH_SHOP_PRODUCTS_FAILURE,
  payload: errorMessage,
});

export const fetchProductsStartAsync = (productType, filters = null) => {
  return async (dispatch) => {
    dispatch(fetchProductsStart());
    const apiResponse = await fetchProductsFromDatabase(productType, filters);

    if (apiResponse.type === 'success') {
      dispatch(fetchProductsSuccess(apiResponse.products));
    } else {
      dispatch(fetchProductsFailure(apiResponse.errorMessage));
    }
  };
};

export const setProductsFilters = (filterType, filterValue) => ({
  type: ShopActionTypes.SET_PRODUCTS_FILTERS,
  payload: { filterType, filterValue },
});

export const clearProductsFilters = () => ({
  type: ShopActionTypes.CLEAR_PRODUCTS_FILTERS,
});
