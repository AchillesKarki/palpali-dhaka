import React from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';

import CheckoutForm from './checkout-form/checkout-form';

import './payment-stripe.scss';

/**
 * Setup Stripe.js and the Elements provider
 */
const stripePromise = loadStripe(
  'pk_test_51HAvGeJ9cunJurQoCVzqNIlZdCMm4k0i7GfrGZS3dwr65fT5Tit8tzE4s7ZWu7hdqu8CHBPA3OR7EWSnCaud47pT00RQRTaoEe'
);

const PaymentStripe = ({ closeStripePaymentModal }) => {
  return (
    <Elements stripe={stripePromise}>
      <CheckoutForm closeStripePaymentModal={closeStripePaymentModal} />
    </Elements>
  );
};

export default PaymentStripe;
