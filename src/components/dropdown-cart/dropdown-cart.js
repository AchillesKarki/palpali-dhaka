import React from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import { selectUserCart } from '../../redux/cart/cart.selector';

import CartItem from '../cart-item/cart-item';

import './dropdown-cart.scss';

const DropdownCart = ({ userCart: { cartItems }, history }) => {
  return (
    <div className='dropdown padded'>
      <div className='dropdown-items-wrapper cart-items-wrapper'>
        {cartItems.length ? (
          cartItems.map((cartItem) => <CartItem key={cartItem.id} cartItem={cartItem} className='dropdown-item' />)
        ) : (
          <span className='empty-message'>No Items In The Cart</span>
        )}
      </div>
      <button
        disabled={!cartItems.length}
        className='btn btn-primary btn-small u-margin-top-small'
        onClick={() => history.push('/checkout')}
      >
        Checkout
      </button>
    </div>
  );
};

const mapStateToProps = createStructuredSelector({
  userCart: selectUserCart,
});

export default withRouter(connect(mapStateToProps)(DropdownCart));
