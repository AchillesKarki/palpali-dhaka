import React from 'react';
import Loader from '../../components/loader/loader';

const withSpinner = (WrappedComponent) => {
  return ({ isUserLoading, isShopLoading, isCartLoading, isPaymentLoading, ...props }) => {
    const isLoading = isUserLoading || isShopLoading || isCartLoading || isPaymentLoading;

    return (
      <>
        {isLoading ? <Loader /> : null} <WrappedComponent {...props} />
      </>
    );
  };
};

export default withSpinner;
