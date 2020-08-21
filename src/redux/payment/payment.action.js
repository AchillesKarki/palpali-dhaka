import { approvePayPalOrder, handleStripePayment } from '../../utility/payment-utils';

import { PaymentActionTypes } from './payment.types';
import { clearWholeCartStartAsync } from '../cart/cart.action';

export const setSuccessMessage = (successMessage) => ({
  type: PaymentActionTypes.SET_SUCCESS_MESSAGE,
  payload: successMessage,
});

export const clearMessage = () => ({
  type: PaymentActionTypes.CLEAR_MESSAGE,
});

export const openPaymentModal = () => ({
  type: PaymentActionTypes.OPEN_PAYMENT_MODAL,
});

export const closePaymentModal = () => ({
  type: PaymentActionTypes.CLOSE_PAYMENT_MODAL,
});

export const asyncPaymentRequestStart = () => ({
  type: PaymentActionTypes.ASYNC_PAYMENT_REQUEST_START,
});

export const asyncPaymentRequestSuccess = (currentUser) => ({
  type: PaymentActionTypes.ASYNC_PAYMENT_REQUEST_SUCCESS,
  payload: currentUser,
});

export const asyncPaymentRequestFailure = (errorMessage) => ({
  type: PaymentActionTypes.ASYNC_PAYMENT_REQUEST_FAILURE,
  payload: errorMessage,
});

export const handleStripePaymentStartAsync = (cardInfo, stripeInstance) => {
  return async (dispatch) => {
    dispatch(openPaymentModal());
    dispatch(asyncPaymentRequestStart());
    const apiResponse = await handleStripePayment(cardInfo, stripeInstance);

    if (apiResponse.type === 'success') {
      dispatch(closePaymentModal());
      dispatch(clearWholeCartStartAsync());
      dispatch(setSuccessMessage('THANK YOU for shopping wih us. Your orders will be delivered soon!'));
    } else {
      dispatch(asyncPaymentRequestFailure(apiResponse.errorMessage));
    }
  };
};

export const approvePayPalOrderStartAsync = (data, actions) => {
  return async (dispatch) => {
    dispatch(openPaymentModal());
    dispatch(asyncPaymentRequestStart());
    const apiResponse = await approvePayPalOrder(data, actions);

    if (apiResponse.type === 'success') {
      dispatch(closePaymentModal());
      dispatch(clearWholeCartStartAsync());
      dispatch(setSuccessMessage('THANK YOU for shopping wih us. Your orders will be delivered soon!'));
    } else {
      dispatch(asyncPaymentRequestFailure(apiResponse.errorMessage));
    }
  };
};
