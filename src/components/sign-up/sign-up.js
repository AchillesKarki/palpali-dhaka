import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';

import './sign-up.scss';
import { userSignUpWithEmailAndPasswordStartAsync } from '../../redux/user/user.action';

const SignUpSchema = Yup.object().shape({
  username: Yup.string().required('Username is required').min(5, 'Username must be at-least 5 characters'),
  email: Yup.string().email('Invalid email').required('Email is required'),
  password: Yup.string().min(6, 'Password must be at-least 6 characters').required('Password is required'),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref('password'), null], 'Passwords must match')
    .required('Confirm Password is required'),
});

const SignUp = ({ signUpWithEmailAndPassword }) => {
  return (
    <div className='sign-up'>
      <h2>Sign-Up</h2>
      <Formik
        initialValues={{
          username: '',
          email: '',
          password: '',
          confirmPassword: '',
        }}
        validationSchema={SignUpSchema}
        onSubmit={(values) => {
          const { confirmPassword, ...signUpValues } = values;
          signUpWithEmailAndPassword(signUpValues);
        }}
      >
        {({ values, errors, touched }) => (
          <Form>
            <div className='form-group'>
              <Field
                name='username'
                type='text'
                className={`${errors.username && touched.username ? 'error-border' : ''} form-group-input`}
              />
              <label className={`${values.username.length ? 'shrink' : ''} form-group-label`}>Username</label>
              <ErrorMessage name='username' component='div' className='error-msg' />
            </div>
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
            <div className='form-group'>
              <Field
                name='confirmPassword'
                type='password'
                className={`${
                  errors.confirmPassword && touched.confirmPassword ? 'error-border' : ''
                } form-group-input`}
              />
              <label className={`${values.confirmPassword.length ? 'shrink' : ''} form-group-label`}>
                Confirm Password
              </label>
              <ErrorMessage name='confirmPassword' component='div' className='error-msg' />
            </div>

            <button type='submit' className='btn btn-primary'>
              Sign In
            </button>
          </Form>
        )}
      </Formik>

      <div className='sign-in-wrapper'>
        <p>
          Already Have An Account?
          <Link to='/auth/sign-in' className='sign-in-link'>
            SIGN UP
          </Link>
        </p>
      </div>
    </div>
  );
};

const mapDispatchToProps = (dispatch) => ({
  signUpWithEmailAndPassword: (userInfo) => dispatch(userSignUpWithEmailAndPasswordStartAsync(userInfo)),
});

export default connect(null, mapDispatchToProps)(SignUp);
