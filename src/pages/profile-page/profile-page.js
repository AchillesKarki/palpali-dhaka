import React, { useEffect } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import { selectSuccessMessage, selectUserErrorMessage, selectIsUserLoading } from '../../redux/user/user.selector';
import { clearMessage } from '../../redux/user/user.action';

import withSpinner from '../../hoc/withSpinner/with-spinner';
import withAlert from '../../hoc/withAlert/withAlert';

import MyProfile from '../../components/my-profile/my-profile';
import MyOrders from '../../components/my-orders/my-orders';
import './profile-page.scss';
import { selectIsPaymentLoading } from '../../redux/payment/payment.selector';

const ProfilePage = ({
  match: {
    params: { entity },
  },
}) => {
  useEffect(() => {
    return;
  }, [entity]);

  return <div className='profile-page'>{entity && entity === 'me' ? <MyProfile /> : <MyOrders />}</div>;
};

const mapStateToProps = createStructuredSelector({
  successMessage: selectSuccessMessage,
  userErrorMessage: selectUserErrorMessage,
  isUserLoading: selectIsUserLoading,
  isPaymentLoading: selectIsPaymentLoading,
});

const mapDispatchToProps = (dispatch) => ({
  clearMessage: () => dispatch(clearMessage()),
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(withSpinner(withAlert(ProfilePage))));
