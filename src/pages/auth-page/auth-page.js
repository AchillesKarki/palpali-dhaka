import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { createStructuredSelector } from 'reselect';

import { clearMessage } from '../../redux/user/user.action';
import { selectIsUserLoading, selectSuccessMessage, selectUserErrorMessage } from '../../redux/user/user.selector';
import './auth-page.scss';

import withSpinner from '../../hoc/withSpinner/with-spinner';
import withAlert from '../../hoc/withAlert/withAlert';

import SignIn from '../../components/sign-in/sign-in';
import SignUp from '../../components/sign-up/sign-up';
import ForgotPassword from '../../components/forgot-password/forgot-password';

const AuthPage = ({ match }) => {
  return (
    <div className='auth'>
      {match.params.mode === 'sign-in' && <SignIn />}
      {match.params.mode === 'sign-up' && <SignUp />}
      {match.params.mode === 'forgot-password' && <ForgotPassword />}
    </div>
  );
};

const mapStateToProps = createStructuredSelector({
  isUserLoading: selectIsUserLoading,
  successMessage: selectSuccessMessage,
  userErrorMessage: selectUserErrorMessage,
});

const mapDispatchToProps = (dispatch) => ({
  clearMessage: () => dispatch(clearMessage()),
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(withAlert(withSpinner(AuthPage))));
