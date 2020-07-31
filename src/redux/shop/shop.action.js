import { ShopActionTypes } from './shop.types';

export const getShopCollections = (index) => ({
  type: ShopActionTypes.GET_SHOP_COLLECTIONS,
  payload: {
    index,
  },
});

export const getFilteredShopCollections = (filter) => ({
  type: ShopActionTypes.GET_FILTERED_SHOP_COLLECTIONS,
  payload: {
    filter,
  },
});
