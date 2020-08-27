import React from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';

import { STRIPE_PUBLIC_API_KEY } from '../../../config';
import CheckoutForm from './checkout-form/checkout-form';

import './payment-stripe.scss';

/**
 * Setup Stripe.js and the Elements provider
 */
const stripePromise = loadStripe(STRIPE_PUBLIC_API_KEY);

const PaymentStripe = ({ closeStripePaymentModal }) => {
  return (
    <Elements stripe={stripePromise}>
      <CheckoutForm closeStripePaymentModal={closeStripePaymentModal} />
    </Elements>
  );
};

export default PaymentStripe;
