import React from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import './checkout-page.scss';
import CheckoutItem from '../../components/checkout-item/checkout-item';

import { selectCartItems, selectTotalCartItems, selectTotalCartAmount } from '../../redux/cart/cart.selector';

const CheckoutPage = ({ cartItems, totalCartItems, totalCartAmount }) => {
  return (
    <div className='checkout-page'>
      <div className='checkout-page-table'>
        <div className='checkout-page-table-head'>
          <table>
            <thead>
              <tr>
                <th className='table-header-cell column1'>Product Item</th>
                <th className='table-header-cell column2'>Quantity</th>
                <th className='table-header-cell column3'>Price</th>
                <th className='table-header-cell column4'>Action</th>
              </tr>
            </thead>
          </table>
        </div>
        <div className='checkout-page-table-body'>
          {cartItems.length ? (
            <table>
              <tbody>
                {cartItems.map((cartItem) => (
                  <CheckoutItem key={cartItem.id} cartItem={cartItem} />
                ))}
              </tbody>
            </table>
          ) : (
            <div className='no-items-message'>
              <span>Currently, There Are No Items In Your Cart.</span>
              <span className='happy'>Happy Shopping!!!!</span>
            </div>
          )}
        </div>
        <div className='checkout-page-table-footer'>
          <div></div>
          <div className='footer-label'>
            Subtotal ({totalCartItems} items):
            <span className='price'>${totalCartAmount}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = createStructuredSelector({
  cartItems: selectCartItems,
  totalCartItems: selectTotalCartItems,
  totalCartAmount: selectTotalCartAmount,
});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(CheckoutPage);
