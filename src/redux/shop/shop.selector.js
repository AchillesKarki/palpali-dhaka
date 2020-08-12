import { createSelector } from 'reselect';

const ShopSelector = (state) => state.shop;

export const selectShopProducts = createSelector(ShopSelector, (shop) => shop.products);

export const selectIsLoading = createSelector(ShopSelector, (shop) => shop.isLoading);

export const selectProductsFilters = createSelector(ShopSelector, (shop) => shop.productsFilters);
