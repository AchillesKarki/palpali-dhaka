import React from 'react';

import ProductsTab from '../../components/products-tab/products-tab';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import withSpinner from '../../hoc/withSpinner/with-spinner';

import { selectShopProducts, selectIsShopLoading } from '../../redux/shop/shop.selector';
import { selectIsCartLoading } from '../../redux/cart/cart.selector';
import { selectCurrentUser } from '../../redux/user/user.selector';

import './shop-page.scss';

const ShopPage = ({ currentUser, match, products }) => {
  return (
    <div className='shop-page'>
      {!currentUser && <span className='not-signed-in-text'>Please Sign In To Use The Cart.</span>}
      <ProductsTab product={match.params.product} products={products} />
    </div>
  );
};

const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser,
  products: selectShopProducts,
  isShopLoading: selectIsShopLoading,
  isCartLoading: selectIsCartLoading,
});

export default connect(mapStateToProps)(withSpinner(ShopPage));
