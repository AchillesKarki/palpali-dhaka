import React from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import { asyncPaymentRequestFailure, approvePayPalOrderStartAsync } from '../../redux/payment/payment.action';
import { selectTotalCartAmount } from '../../redux/cart/cart.selector';

import './payment-paypal.scss';

let PayPalButton = window.paypal && window.paypal.Buttons.driver('react', { React, ReactDOM });

const PaymentPayPal = ({ totalCartAmount, approvePayPalOrder, setErrorMessage }) => {
  const buttonStyle = {
    layout: 'horizontal',
    label: 'pay',
    tagline: 'false',
    height: 51,
  };

  /**
   * handles the create order functionality
   * @param {Object} data the data
   * @param {Object} actions the actions
   */
  const createPayPalOrder = (data, actions) => {
    if (totalCartAmount) {
      return actions.order.create({
        purchase_units: [
          {
            amount: {
              currency_code: 'USD',
              value: totalCartAmount,
            },
          },
        ],
      });
    } else {
      setErrorMessage("There aren't any items in your cart.");
    }
  };

  return (
    <div className='paypal-button'>
      <PayPalButton
        style={buttonStyle}
        createOrder={(data, actions) => createPayPalOrder(data, actions)}
        onApprove={(data, actions) => approvePayPalOrder(data, actions)}
        onError={(err) => setErrorMessage(err)}
      />
    </div>
  );
};

const mapStateToProps = createStructuredSelector({
  totalCartAmount: selectTotalCartAmount,
});

const mapDispatchToProps = (dispatch) => ({
  approvePayPalOrder: (data, actions) => dispatch(approvePayPalOrderStartAsync(data, actions)),
  setErrorMessage: (errorMessage) => dispatch(asyncPaymentRequestFailure(errorMessage)),
});

export default connect(mapStateToProps, mapDispatchToProps)(PaymentPayPal);
