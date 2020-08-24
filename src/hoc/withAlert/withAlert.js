import React, { useState, useEffect } from 'react';

import ModalAlert from '../../components/modals/modal-alert/modal-alert';

const withAlert = (WrappedComponent) => {
  return ({ successMessage, errorMessage, clearMessage, ...props }) => {
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
      if (errorMessage) {
        setAlert({
          type: 'Error',
          message: errorMessage,
        });

        setIsOpen(true);
      }
    }, [errorMessage]);

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
