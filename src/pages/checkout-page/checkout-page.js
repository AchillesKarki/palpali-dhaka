import React, { useState } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import { selectCartItems, selectTotalCartItems, selectTotalCartAmount } from '../../redux/cart/cart.selector';

import './checkout-page.scss';
import CheckoutItem from '../../components/checkout-item/checkout-item';
import ModalStripe from '../../components/modal-stripe/modal-stripe';
import PaymentPayPal from '../../components/payment-paypal/payment-paypal';

const CheckoutPage = ({ cartItems, totalCartItems, totalCartAmount }) => {
  const [modalIsOpen, setIsOpen] = useState(false);

  const openModal = () => {
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
  };
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
      <div className='checkout-page-payment-options-text'>Payment Options:</div>
      <div className='checkout-page-payment-button-wrapper'>
        <button
          className='btn btn-primary btn-no-animation'
          disabled={!totalCartItems}
          title={totalCartItems ? 'Proceed to Checkout With Stripe' : 'No Items In The Cart'}
          onClick={openModal}
        >
          Stripe
        </button>
        <PaymentPayPal />
      </div>
      <ModalStripe modalIsOpen={modalIsOpen} closeModal={closeModal} />
    </div>
  );
};

const mapStateToProps = createStructuredSelector({
  cartItems: selectCartItems,
  totalCartItems: selectTotalCartItems,
  totalCartAmount: selectTotalCartAmount,
});

export default connect(mapStateToProps)(CheckoutPage);
