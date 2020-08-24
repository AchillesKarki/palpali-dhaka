import React from 'react';
import ReactModal from 'react-modal';

ReactModal.setAppElement('#root');

const ModalAlert = ({ modalIsOpen, closeModal, alert }) => {
  let additionalClass = '';
  let alertType = '';
  let alertMessage = '';

  if (alert) {
    additionalClass = alert.type === 'Success' ? 'success-header' : 'error-header';
    alertType = alert.type;
    alertMessage = alert.message;
  }

  return (
    <ReactModal
      className='modal'
      isOpen={modalIsOpen}
      onRequestClose={closeModal}
      closeTimeoutMS={200}
      overlayClassName='alert-modal-overlay'
    >
      <div className='modal-content'>
        <div className={`modal-header ${additionalClass}`}>
          <h4 className='modal-title'>{alertType}</h4>
          <button type='button' className='close' data-dismiss='modal' aria-label='Close' onClick={closeModal}>
            <span aria-hidden='true'>×</span>
          </button>
        </div>
        <div className='modal-body alert-modal-body'>
          <p>{alertMessage}</p>
        </div>
        <div className='modal-footer'>
          <button type='button' className='btn btn-outline-secondary btn-small' onClick={closeModal}>
            OK
          </button>
        </div>
      </div>
    </ReactModal>
  );
};

export default ModalAlert;
