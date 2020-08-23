import { createSelector } from 'reselect';

const ShopSelector = (state) => state.shop;

export const selectShopProducts = createSelector(ShopSelector, (shop) => shop.products);

export const selectNewShopProducts = createSelector(ShopSelector, (shop) => shop.newProducts);

export const selectSingleShopProduct = createSelector(ShopSelector, (shop) => shop.singleProduct);

export const selectIsShopLoading = createSelector(ShopSelector, (shop) => shop.isShopLoading);

export const selectProductsFilters = createSelector(ShopSelector, (shop) => shop.productsFilters);
