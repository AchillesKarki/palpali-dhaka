import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import { auth, createUserProfileDocument } from '../../firebase/firebase.utils';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';

import './sign-up.scss';
import Loader from '../loader/loader';

const SignUpSchema = Yup.object().shape({
  username: Yup.string().required('Username is required').min(5, 'Username must be at-least 5 characters'),
  email: Yup.string().email('Invalid email').required('Email is required'),
  password: Yup.string().min(6, 'Password must be at-least 6 characters').required('Password is required'),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref('password'), null], 'Passwords must match')
    .required('Confirm Password is required'),
});

export class SignUp extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoading: false,
    };
  }

  render() {
    return (
      <div className='sign-up'>
        {this.state.isLoading ? <Loader /> : null}
        <h2>Sign-Up</h2>
        <Formik
          initialValues={{
            username: '',
            email: '',
            password: '',
            confirmPassword: '',
          }}
          validationSchema={SignUpSchema}
          onSubmit={async (values) => {
            try {
              this.setState({ isLoading: true });
              let { user } = await auth.createUserWithEmailAndPassword(values.email, values.password);
              await createUserProfileDocument(user, { username: values.username });
              this.setState({ isLoading: false });
            } catch (error) {
              console.log(error);
              this.setState({ isLoading: false });
            }
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
              SIGN IN
            </Link>
          </p>
        </div>
      </div>
    );
  }
}

export default SignUp;