import React from 'react';
import { connect } from 'react-redux';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';

import { forgotPasswordStartAsync } from '../../redux/user/user.action';

import './forgot-password.scss';

const ForgotPasswordSchema = Yup.object().shape({
  email: Yup.string().email('Invalid email').required('Email is required'),
});

const ForgotPassword = ({ handleForgotPassword }) => {
  return (
    <div className='forgot-password'>
      <h2>Forgot Password</h2>
      <p className='forgot-password-text'>
        Please enter your account email address.<br></br>We will send you an email to reset your password.
      </p>
      <Formik
        initialValues={{
          email: '',
          password: '',
        }}
        validationSchema={ForgotPasswordSchema}
        onSubmit={(values) => {
          handleForgotPassword(values.email);
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
            <div className='form-group-buttons'>
              <button type='submit' className='btn btn-primary btn-medium'>
                Submit
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

const mapDispatchToProps = (dispatch) => ({
  handleForgotPassword: (email) => dispatch(forgotPasswordStartAsync(email)),
});

export default connect(null, mapDispatchToProps)(ForgotPassword);
