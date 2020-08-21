import { PaymentActionTypes } from './payment.types';

const INITIAL_STATE = {
  isPaymentLoading: false,
  errorMessage: null,
  successMessage: null,
  closePaymentModal: false,
  userOrders: {
    orderItems: [],
  },
};

const paymentReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case PaymentActionTypes.SET_SUCCESS_MESSAGE:
      return {
        ...state,
        isPaymentLoading: false,
        successMessage: action.payload,
      };

    case PaymentActionTypes.CLEAR_MESSAGE:
      return {
        ...state,
        successMessage: null,
        errorMessage: null,
      };

    case PaymentActionTypes.OPEN_PAYMENT_MODAL:
      return {
        ...state,
        closePaymentModal: false,
      };

    case PaymentActionTypes.CLOSE_PAYMENT_MODAL:
      return {
        ...state,
        closePaymentModal: true,
      };

    case PaymentActionTypes.ASYNC_PAYMENT_REQUEST_START:
      return {
        ...state,
        isPaymentLoading: true,
      };

    case PaymentActionTypes.ASYNC_PAYMENT_REQUEST_SUCCESS:
      return {
        ...state,
        isPaymentLoading: false,
        userOrders: action.payload,
      };

    case PaymentActionTypes.ASYNC_PAYMENT_REQUEST_FAILURE:
      return {
        ...state,
        isPaymentLoading: false,
        errorMessage: action.payload,
      };

    default:
      return state;
  }
};

export default paymentReducer;
