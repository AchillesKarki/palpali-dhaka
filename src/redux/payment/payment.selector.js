import { createSelector } from 'reselect';

const PaymentSelector = (state) => state.payment;

export const selectUserOrders = createSelector(PaymentSelector, (payment) => payment.userOrders);

export const selectIsPaymentLoading = createSelector(PaymentSelector, (payment) => payment.isPaymentLoading);

export const selectSuccessMessage = createSelector(PaymentSelector, (payment) => payment.successMessage);

export const selectErrorMessage = createSelector(PaymentSelector, (payment) => payment.errorMessage);

export const selectClosePaymentModal = createSelector(PaymentSelector, (payment) => payment.closePaymentModal);
