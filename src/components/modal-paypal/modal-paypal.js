import React from 'react';
import ReactModal from 'react-modal';

import PaymentPayPal from '../payment-paypal/payment-paypal';

ReactModal.setAppElement('#root');

const ModalPayPal = ({ totalCartAmount, modalIsOpen, closeModal }) => {
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
          <h4 className='modal-title'>Paypal Payment</h4>
          <button type='button' className='close' data-dismiss='modal' aria-label='Close' onClick={closeModal}>
            <span aria-hidden='true'>×</span>
          </button>
        </div>
        <div className='modal-body'>
          <div className='demo-card-info'>
            <p className='cred-header'>Use following test credentials for payment: </p>
            <p className='cred-info'>
              <span className='label'>Email: </span>
              <span className='value'>sb-hfpx52995242@personal.example.com</span>
            </p>
            <p className='cred-info'>
              <span className='label'>Password: </span>
              <span className='value'>6zRODA/i</span>
            </p>
          </div>
          <div className='pay-wrapper'>
            <span className='pay-text'>
              Pay
              <span className='pay-amount'>${totalCartAmount}</span>
              with
            </span>
            <PaymentPayPal />
          </div>
        </div>
      </div>
    </ReactModal>
  );
};

export default ModalPayPal;
