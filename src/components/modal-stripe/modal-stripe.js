import React from 'react';
import ReactModal from 'react-modal';

import PaymentStripe from '../payment-stripe/payment-stripe';

import './modal-stripe.scss';

ReactModal.setAppElement('#root');

const ModalStripe = ({ modalIsOpen, closeModal }) => {
  return (
    <ReactModal
      className='modal'
      isOpen={modalIsOpen}
      onRequestClose={closeModal}
      closeTimeoutMS={200}
      overlayClassName='modal-overlay'
    >
      <div className='modal-content'>
        <div className='modal-header'>
          <h4 className='modal-title'>Stripe Payment</h4>
          <button type='button' className='close' data-dismiss='modal' aria-label='Close' onClick={closeModal}>
            <span aria-hidden='true'>×</span>
          </button>
        </div>
        <div className='modal-body'>
          <PaymentStripe closeStripePaymentModal={closeModal} />
        </div>
      </div>
    </ReactModal>
  );
};

export default ModalStripe;
