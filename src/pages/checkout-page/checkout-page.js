import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import {
  selectIsPaymentLoading,
  selectSuccessMessage,
  selectErrorMessage,
  selectClosePaymentModal,
} from '../../redux/payment/payment.selector';
import { clearMessage } from '../../redux/payment/payment.action';
import {
  selectUserCart,
  selectTotalCartItems,
  selectTotalCartAmount,
  selectIsCartLoading,
} from '../../redux/cart/cart.selector';

import './checkout-page.scss';
import CheckoutItem from '../../components/checkout-item/checkout-item';
import ModalStripe from '../../components/modals/modal-stripe/modal-stripe';
import ModalPayPal from '../../components/modals/modal-paypal/modal-paypal';
import withSpinner from '../../hoc/withSpinner/with-spinner';
import withAlert from '../../hoc/withAlert/withAlert';

const CheckoutPage = ({ userCart: { cartItems }, totalCartItems, totalCartAmount, closePaymentModal }) => {
  const [stripeModalIsOpen, setStripeIsOpen] = useState(false);
  const [payPalModalIsOpen, setPayPalIsOpen] = useState(false);

  const openModal = (modalName) => {
    modalName === 'stripe' ? setStripeIsOpen(true) : setPayPalIsOpen(true);
  };

  const closeModal = (modalName) => {
    if (modalName) {
      modalName === 'stripe' ? setStripeIsOpen(false) : setPayPalIsOpen(false);
    } else {
      setStripeIsOpen(false);
      setPayPalIsOpen(false);
    }
  };

  useEffect(() => {
    if (closePaymentModal) {
      closeModal();
    }
  }, [closePaymentModal]);

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
        <div className='warning-label'>
          Please, do not use your original transaction details.
          <br /> Test account credentials are provided with respective payment gateway.
        </div>
        <div className='checkout-page-table-footer'>
          <div className='footer-label'>
            Subtotal ({totalCartItems} items):
            <span className='price'>${totalCartAmount}</span>
          </div>
        </div>
      </div>
      <div className='checkout-page-payment-options-text'>Payment Options:</div>
      <div className='checkout-page-payment-button-wrapper'>
        <button
          className='btn btn-primary'
          disabled={!totalCartItems}
          title={totalCartItems ? 'Proceed to Checkout With Stripe' : 'No Items In The Cart'}
          onClick={() => openModal('stripe')}
        >
          Stripe
        </button>
        <button
          className='btn btn-secondary'
          disabled={!totalCartItems}
          title={totalCartItems ? 'Proceed to Checkout With Stripe' : 'No Items In The Cart'}
          onClick={() => openModal('paypal')}
        >
          PayPal
        </button>
      </div>
      <ModalStripe modalIsOpen={stripeModalIsOpen} closeModal={() => closeModal('stripe')} />
      <ModalPayPal
        totalCartAmount={totalCartAmount}
        modalIsOpen={payPalModalIsOpen}
        closeModal={() => closeModal('paypal')}
      />
    </div>
  );
};

const mapStateToProps = createStructuredSelector({
  userCart: selectUserCart,
  totalCartItems: selectTotalCartItems,
  totalCartAmount: selectTotalCartAmount,
  isCartLoading: selectIsCartLoading,
  isPaymentLoading: selectIsPaymentLoading,
  successMessage: selectSuccessMessage,
  errorMessage: selectErrorMessage,
  closePaymentModal: selectClosePaymentModal,
});

const mapDispatchToProps = (dispatch) => ({
  clearMessage: () => dispatch(clearMessage()),
});

export default connect(mapStateToProps, mapDispatchToProps)(withAlert(withSpinner(CheckoutPage)));
