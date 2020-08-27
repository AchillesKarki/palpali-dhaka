import React, { useState, useEffect } from 'react';

import ModalAlert from '../../components/modals/modal-alert/modal-alert';

const withAlert = (WrappedComponent) => {
  return ({ successMessage, userErrorMessage, paymentErrorMessage, cartErrorMessage, clearMessage, ...props }) => {
    const [modalIsOpen, setIsOpen] = useState(false);
    const [alert, setAlert] = useState(null);

    useEffect(() => {
      if (successMessage) {
        setAlert({
          type: 'Success',
          message: successMessage,
        });

        setIsOpen(true);
      }
    }, [successMessage]);

    useEffect(() => {
      if (userErrorMessage) {
        setAlert({
          type: 'Error',
          message: userErrorMessage,
        });

        setIsOpen(true);
      }
    }, [userErrorMessage]);

    useEffect(() => {
      if (paymentErrorMessage) {
        setAlert({
          type: 'Error',
          message: paymentErrorMessage,
        });

        setIsOpen(true);
      }
    }, [paymentErrorMessage]);

    useEffect(() => {
      if (cartErrorMessage) {
        setAlert({
          type: 'Error',
          message: cartErrorMessage,
        });

        setIsOpen(true);
      }
    }, [cartErrorMessage]);

    const closeModal = () => {
      setIsOpen(false);
      clearMessage();
    };

    return (
      <>
        <ModalAlert modalIsOpen={modalIsOpen} closeModal={closeModal} alert={alert} />
        <WrappedComponent {...props} />
      </>
    );
  };
};

export default withAlert;
