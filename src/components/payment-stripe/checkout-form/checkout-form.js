import React, { useState } from 'react';
import { connect } from 'react-redux';
import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';
import { createStructuredSelector } from 'reselect';

import { selectTotalCartAmount } from '../../../redux/cart/cart.selector';

import './checkout-form.scss';
import { handleStripePaymentStartAsync } from '../../../redux/payment/payment.action';

const CARD_ELEMENT_OPTIONS = {
  style: {
    base: {
      color: '#32325d',
      fontFamily: '"Montserrat", "Roboto", sans-serif',
      fontSmoothing: 'antialiased',
      fontSize: '16px',
      '::placeholder': {
        color: '#aab7c4',
      },
    },
    invalid: {
      color: '#fa755a',
      iconColor: '#fa755a',
    },
  },
};

const CheckoutForm = ({ closeStripePaymentModal, totalCartAmount, handleStripePayment }) => {
  const [error, setError] = useState(null);
  const stripeInstance = useStripe();
  const elements = useElements();

  /**
   * Handle real-time validation errors from the card Element
   * @param {Object} event the change event
   */
  const handleChange = (event) => {
    if (event.error) {
      setError(event.error.message);
    } else {
      setError(null);
    }
  };

  /**
   * Handle form submission
   * @param {Object} event the form submit event
   */
  const handleStripeFormSubmit = async (event) => {
    event.preventDefault();
    await handleStripePayment(elements.getElement(CardElement), stripeInstance);
    closeStripePaymentModal();
  };

  return (
    <form onSubmit={handleStripeFormSubmit} className='stripe-checkout-form'>
      <label htmlFor='card-element' className='stripe-checkout-form-label'>
        Credit or Debit Card
      </label>
      <p className='demo-card-info'>
        *Use <span className='card-details'> 4242-4242-4242-4242 | 04/24 | 444 | 44444 </span> as card details.
      </p>
      <CardElement
        id='card-element'
        options={CARD_ELEMENT_OPTIONS}
        onChange={handleChange}
        className='stripe-checkout-form-card-element'
      />
      <div className='stripe-checkout-form-address'>
        *Your orders will be delivered to your given profile delivery address.
      </div>
      {error && (
        <div className='card-errors' role='alert'>
          {error}
        </div>
      )}
      <div className='stripe-checkout-form-footer'>
        <button type='submit' className='btn btn-primary btn-medium'>
          Pay ${totalCartAmount}
        </button>
        <button type='button' className='btn btn-outline-secondary btn-medium' onClick={closeStripePaymentModal}>
          Close
        </button>
      </div>
    </form>
  );
};

const mapStateToProps = createStructuredSelector({
  totalCartAmount: selectTotalCartAmount,
});

const mapDispatchToProps = (dispatch) => ({
  handleStripePayment: (cardInfo, stripeInstance) => dispatch(handleStripePaymentStartAsync(cardInfo, stripeInstance)),
});

export default connect(mapStateToProps, mapDispatchToProps)(CheckoutForm);
