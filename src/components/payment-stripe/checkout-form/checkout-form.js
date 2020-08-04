import React, { useState } from 'react';
import { connect } from 'react-redux';
import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';
import { createStructuredSelector } from 'reselect';

import { selectTotalCartAmount } from '../../../redux/cart/cart.selector';

import './checkout-form.scss';

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

const CheckoutForm = ({ closeStripePaymentModal, totalCartAmount }) => {
  const [error, setError] = useState(null);
  const stripe = useStripe();
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
    const card = elements.getElement(CardElement);
    const result = await stripe.createToken(card);
    if (result.error) {
      setError(result.error.message);
    } else {
      setError(null);
      stripeTokenHandler(result.token);
    }
  };

  return (
    <form onSubmit={handleStripeFormSubmit} className='stripe-checkout-form'>
      <label htmlFor='card-element' className='stripe-checkout-form-label'>
        Credit or Debit Card
      </label>
      <CardElement
        id='card-element'
        options={CARD_ELEMENT_OPTIONS}
        onChange={handleChange}
        className='stripe-checkout-form-card-element'
      />
      <div className='stripe-checkout-form-address'>*Your product will be delivered to your given profile address.</div>
      {error && (
        <div className='card-errors' role='alert'>
          {error}
        </div>
      )}
      <div className='stripe-checkout-form-footer'>
        <button type='submit' className='btn btn-primary btn-medium'>
          Pay ${totalCartAmount}
        </button>
        <button type='button' className='btn btn-outline btn-medium' onClick={closeStripePaymentModal}>
          Close
        </button>
      </div>
    </form>
  );
};

// POST the token ID to your backend.
// remove after redux implementation
async function stripeTokenHandler(token) {
  const response = await fetch('/charge', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ token: token.id }),
  });

  return response.json();
}

const mapStateToProps = createStructuredSelector({
  totalCartAmount: selectTotalCartAmount,
});

export default connect(mapStateToProps)(CheckoutForm);
