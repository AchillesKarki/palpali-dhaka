import { ShopActionTypes } from './shop.types';
import { getShopCollections, getFilteredShopCollections } from '../../utils';

const INITIAL_STATE = {
  collections: [],
};

const shopReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case ShopActionTypes.GET_SHOP_COLLECTIONS:
      return {
        ...state,
        collections: getShopCollections(action.payload.index),
      };

    case ShopActionTypes.GET_FILTERED_SHOP_COLLECTIONS:
      return {
        ...state,
        collections: getFilteredShopCollections(action.payload.filter),
      };

    default:
      return state;
  }
};

export default shopReducer;
