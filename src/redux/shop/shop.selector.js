import { createSelector } from 'reselect';

const ShopSelector = (state) => state.shop;

export const selectShopCollections = createSelector(ShopSelector, (shop) => shop.collections);
