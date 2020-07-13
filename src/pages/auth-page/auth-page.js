import React from 'react';

import './auth-page.scss';

import SignIn from '../../components/sign-in/sign-in';
import SignUp from '../../components/sign-up/sign-up';
import ForgotPassword from '../../components/forgot-password/forgot-password';

const AuthPage = (props) => {
  return (
    <div className='auth'>
      {props.match.params.mode === 'sign-in' && <SignIn />}
      {props.match.params.mode === 'sign-up' && <SignUp />}
      {props.match.params.mode === 'forgot-password' && <ForgotPassword />}
    </div>
  );
};

export default AuthPage;
