import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';

import './sign-in.scss';
import { ReactComponent as GoogleLogo } from '../../assets/icons/google-icon.svg';
import { userSignInWithEmailAndPasswordStartAsync, userSignInWithGoogleStartAsync } from '../../redux/user/user.action';

const SignInSchema = Yup.object().shape({
  email: Yup.string().email('Invalid email').required('Email is required'),
  password: Yup.string().min(6, 'Password must be at-least 6 characters').required('Password is required'),
});

const SignIn = ({ signInWithEmailAndPassword, signInWithGoogle }) => {
  return (
    <div className='sign-in'>
      <h2>Sign-In With Your Email and Password</h2>
      <Formik
        initialValues={{
          email: '',
          password: '',
        }}
        validationSchema={SignInSchema}
        onSubmit={(values) => {
          signInWithEmailAndPassword(values);
        }}
      >
        {({ values, errors, touched }) => (
          <Form>
            <div className='form-group'>
              <Field
                name='email'
                type='email'
                className={`${errors.email && touched.email ? 'error-border' : ''} form-group-input`}
              />
              <label className={`${values.email.length ? 'shrink' : ''} form-group-label`}>Email</label>
              <ErrorMessage name='email' component='div' className='error-msg' />
            </div>
            <div className='form-group'>
              <Field
                name='password'
                type='password'
                className={`${errors.password && touched.password ? 'error-border' : ''} form-group-input`}
              />
              <label className={`${values.password.length ? 'shrink' : ''} form-group-label`}>Password</label>
              <ErrorMessage name='password' component='div' className='error-msg' />
            </div>
            <div className='forgot-password-wrapper'>
              <Link to='/auth/forgot-password'>Forgot Password?</Link>
            </div>
            <div className='form-group-buttons'>
              <button type='submit' className='btn btn-primary'>
                Sign In
              </button>
              <p>OR</p>
              <button type='button' className='btn btn-secondary' onClick={signInWithGoogle}>
                <GoogleLogo className='google-icon' />
                Sign In With Google
              </button>
            </div>
          </Form>
        )}
      </Formik>

      <div className='sign-up-wrapper'>
        <p>
          Don't Have An Account?
          <Link to='/auth/sign-up' className='sign-up-link'>
            SIGN UP
          </Link>
        </p>
      </div>
    </div>
  );
};

const mapDispatchToProps = (dispatch) => ({
  signInWithEmailAndPassword: (email, password) => dispatch(userSignInWithEmailAndPasswordStartAsync(email, password)),
  signInWithGoogle: () => dispatch(userSignInWithGoogleStartAsync()),
});

export default connect(null, mapDispatchToProps)(SignIn);
