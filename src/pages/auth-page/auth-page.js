import React from 'react';
import { withRouter } from 'react-router-dom';

import './auth-page.scss';

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

export default withRouter(AuthPage);
