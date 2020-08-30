import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';

import { selectCurrentUser, selectCloseUserModal } from '../../redux/user/user.selector';
import {
  updateUserProfileAsync,
  clearMessage,
  asyncUserRequestFailure,
  changeUserPasswordAsync,
} from '../../redux/user/user.action';

import { isEquivalent } from '../../utility/helper-utils';
import ModalChangePassword from '../../components/modals/modal-change-password/modal-change-password';

import './my-profile.scss';

const profileSchema = Yup.object().shape({
  username: Yup.string().required('Username is required').min(5, 'Username must be at-least 5 characters'),
  email: Yup.string().email('Invalid email').required('Email is required'),
  name: Yup.string()
    .required('Name is required')
    .min(3, 'Name must be at-least 3 characters')
    .max(50, 'Name cannot be more than 50 characters'),
  country: Yup.string().required('Country is required').max(15, 'Country cannot be more than 15 characters'),
  city: Yup.string().required('City is required').max(10, 'City cannot be more than 15 characters'),
  address: Yup.string().required('Address is required').max(100, 'Address cannot be more than 100 characters'),
  zip: Yup.string()
    .required('ZIP Code is required')
    .matches(/^[0-9]{5}$/, 'ZIP Code must be 5 digits'),
  phone: Yup.string()
    .required('Phone Number is required')
    .matches(/^[0-9]{10}$/, 'Phone Number must be 10 digits'),
});

const MyProfile = ({ currentUser, updateUserProfile, setErrorMessage, changeUserPassword, closeUserModal }) => {
  const [modalIsOpen, setIsOpen] = useState(false);

  const closeModal = () => {
    setIsOpen(false);
  };

  useEffect(() => {
    if (closeUserModal) {
      closeModal();
    }
  }, [closeUserModal]);

  return (
    <div className='my-profile'>
      <h2 className='header-text'>My Profile Details</h2>
      <Formik
        initialValues={{
          username: currentUser.username,
          email: currentUser.email,
          name: currentUser.name || '',
          country: currentUser.country || '',
          city: currentUser.city || '',
          address: currentUser.address || '',
          phone: currentUser.phone || '',
          zip: currentUser.zip || '',
        }}
        validationSchema={profileSchema}
        onSubmit={(values) => {
          const updatedUserInfo = { ...values };
          const { id, createdAt, ...currentUserSlice } = currentUser;
          delete updateUserProfile.id;

          if (isEquivalent(updatedUserInfo, currentUserSlice)) {
            setErrorMessage('There are no changes to be updated.');
          } else {
            updateUserProfile(updatedUserInfo);
          }
        }}
      >
        {({ values, errors, touched }) => (
          <Form>
            <div className='form-wrapper'>
              <div className='auth-wrapper'>
                <h3 className='billing-address-text'>User Details:</h3>
                <div className='form-group'>
                  <Field
                    name='username'
                    type='text'
                    readOnly
                    className={`${errors.username && touched.username ? 'error-border' : ''} form-group-input`}
                  />
                  <label className={`${values.username.length ? 'shrink' : ''} form-group-label`}>Username</label>
                  <ErrorMessage name='username' component='div' className='error-msg' />
                </div>
                <div className='form-group'>
                  <Field
                    name='email'
                    type='email'
                    readOnly
                    className={`${errors.email && touched.email ? 'error-border' : ''} form-group-input`}
                  />
                  <label className={`${values.email.length ? 'shrink' : ''} form-group-label`}>Email</label>
                  <ErrorMessage name='email' component='div' className='error-msg' />
                </div>
                <button type='button' className='btn btn-secondary' onClick={() => setIsOpen(true)}>
                  Change Password
                </button>
              </div>
              <div className='address-wrapper'>
                <h3 className='billing-address-text'>Billing Address:</h3>
                <div className='form-group'>
                  <Field
                    name='name'
                    type='text'
                    className={`${errors.name && touched.name ? 'error-border' : ''} form-group-input`}
                  />
                  <label className={`${values.name.length ? 'shrink' : ''} form-group-label`}>Name</label>
                  <ErrorMessage name='name' component='div' className='error-msg' />
                </div>
                <div className='name-wrapper'>
                  <div className='form-group'>
                    <Field
                      name='country'
                      type='text'
                      className={`${errors.country && touched.country ? 'error-border' : ''} form-group-input`}
                    />
                    <label className={`${values.country.length ? 'shrink' : ''} form-group-label`}>Country</label>
                    <ErrorMessage name='country' component='div' className='error-msg' />
                  </div>
                  <div className='form-group'>
                    <Field
                      name='city'
                      type='text'
                      className={`${errors.city && touched.city ? 'error-border' : ''} form-group-input`}
                    />
                    <label className={`${values.city.length ? 'shrink' : ''} form-group-label`}>City</label>
                    <ErrorMessage name='city' component='div' className='error-msg' />
                  </div>
                </div>
                <div className='name-wrapper'>
                  <div className='form-group'>
                    <Field
                      name='phone'
                      type='text'
                      className={`${errors.phone && touched.phone ? 'error-border' : ''} form-group-input`}
                    />
                    <label className={`${values.phone.length ? 'shrink' : ''} form-group-label`}>Phone Number</label>
                    <ErrorMessage name='phone' component='div' className='error-msg' />
                  </div>
                  <div className='form-group'>
                    <Field
                      name='zip'
                      type='text'
                      className={`${errors.zip && touched.zip ? 'error-border' : ''} form-group-input`}
                    />
                    <label className={`${values.zip.length ? 'shrink' : ''} form-group-label`}>ZIP Code</label>
                    <ErrorMessage name='zip' component='div' className='error-msg' />
                  </div>
                </div>
                <div className='form-group'>
                  <Field
                    name='address'
                    type='text'
                    as='textarea'
                    className={`${errors.address && touched.address ? 'error-border' : ''} form-group-input`}
                  />
                  <label className={`${values.address.length ? 'shrink' : ''} form-group-label`}>Address</label>
                  <ErrorMessage name='address' component='div' className='error-msg' />
                </div>
                <button type='submit' className='btn btn-primary'>
                  Update
                </button>
              </div>
            </div>
          </Form>
        )}
      </Formik>
      <ModalChangePassword modalIsOpen={modalIsOpen} closeModal={closeModal} changeUserPassword={changeUserPassword} />
    </div>
  );
};

const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser,
  closeUserModal: selectCloseUserModal,
});

const mapDispatchToProps = (dispatch) => ({
  updateUserProfile: (updatedUserInfo) => dispatch(updateUserProfileAsync(updatedUserInfo)),
  changeUserPassword: (newPassword) => dispatch(changeUserPasswordAsync(newPassword)),
  setErrorMessage: (errorMessage) => dispatch(asyncUserRequestFailure(errorMessage)),
  clearMessage: () => dispatch(clearMessage()),
});

export default connect(mapStateToProps, mapDispatchToProps)(MyProfile);
