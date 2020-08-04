import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import { selectTotalCartAmount } from '../../redux/cart/cart.selector';

import './payment-paypal.scss';

let PayPalButton = window.paypal.Buttons.driver('react', { React, ReactDOM });

const PaymentPayPal = ({ totalCartAmount }) => {
  // eslint-disable-next-line no-unused-vars
  const [paidFor, setPaidFor] = useState(false);
  // eslint-disable-next-line no-unused-vars
  const [error, setError] = useState(null);

  const buttonStyle = {
    layout: 'horizontal',
    label: 'pay',
    tagline: 'false',
    height: 51,
  };

  const createOrder = (data, actions) => {
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
      console.log('No Items');
    }
  };

  const onApprove = async (data, actions) => {
    const order = await actions.order.capture();
    setPaidFor(true);
    console.log(order);
  };

  const onError = (err) => {
    setError(err);
    console.error(err);
  };

  return (
    <div
      className='paypal-button'
      disabled={!totalCartAmount}
      title={totalCartAmount ? 'Proceed to Checkout With PayPal' : 'No Items In The Cart'}
    >
      <PayPalButton
        style={buttonStyle}
        createOrder={(data, actions) => createOrder(data, actions)}
        onApprove={(data, actions) => onApprove(data, actions)}
        onError={(err) => onError(err)}
      />
    </div>
  );
};

const mapStateToProps = createStructuredSelector({
  totalCartAmount: selectTotalCartAmount,
});

export default connect(mapStateToProps)(PaymentPayPal);
