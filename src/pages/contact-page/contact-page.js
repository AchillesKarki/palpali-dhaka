import React, { useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';

import ModalAlert from '../../components/modals/modal-alert/modal-alert';
import Loader from '../../components/loader/loader';

import './contact-page.scss';

const ContactPageSchema = Yup.object().shape({
  firstName: Yup.string()
    .required('First name is required')
    .min(5, 'First name must be at-least 5 characters')
    .max(10, 'First name cannot be more than 10 characters'),
  lastName: Yup.string()
    .required('Last name is required')
    .min(5, 'Last name must be at-least 5 characters')
    .max(10, 'Last name cannot be more than 10 characters'),
  email: Yup.string().email('Invalid email').required('Email is required'),
  message: Yup.string().required('Message is required'),
});

const ContactPage = () => {
  const [modalIsOpen, setIsOpen] = useState(false);
  const [alert, setAlert] = useState(null);
  const [isLoading, setLoading] = useState(false);

  const encode = (data) => {
    return Object.keys(data)
      .map((key) => encodeURIComponent(key) + '=' + encodeURIComponent(data[key]))
      .join('&');
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  return (
    <div className='contact-page'>
      {isLoading ? <Loader /> : null}
      <h2 className='header-text'>Contact Us</h2>
      <Formik
        initialValues={{
          firstName: '',
          lastName: '',
          email: '',
          message: '',
        }}
        validationSchema={ContactPageSchema}
        onSubmit={async (values, { resetForm }) => {
          setLoading(true);
          try {
            await fetch('/', {
              method: 'POST',
              headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
              body: encode({ 'form-name': 'contact', ...values }),
            });

            setAlert({
              type: 'Success',
              message: 'Thank You for your response. We will soon get back to you.',
            });
            setLoading(false);
            setIsOpen(true);
            resetForm({});
          } catch (error) {
            setAlert({
              type: 'Error',
              message: error.message,
            });
            setLoading(false);
            setIsOpen(true);
          }
        }}
      >
        {({ values, errors, touched }) => (
          <Form netlify='true'>
            <div className='name-wrapper'>
              <div className='form-group'>
                <Field
                  name='firstName'
                  type='text'
                  className={`${errors.firstName && touched.firstName ? 'error-border' : ''} form-group-input`}
                />
                <label className={`${values.firstName.length ? 'shrink' : ''} form-group-label`}>First Name</label>
                <ErrorMessage name='firstName' component='div' className='error-msg' />
              </div>
              <div className='form-group'>
                <Field
                  name='lastName'
                  type='text'
                  className={`${errors.lastName && touched.lastName ? 'error-border' : ''} form-group-input`}
                />
                <label className={`${values.lastName.length ? 'shrink' : ''} form-group-label`}>Last Name</label>
                <ErrorMessage name='lastName' component='div' className='error-msg' />
              </div>
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
                name='message'
                type='text'
                as='textarea'
                className={`${errors.message && touched.message ? 'error-border' : ''} form-group-input`}
              />
              <label className={`${values.message.length ? 'shrink' : ''} form-group-label`}>
                Enter your message here
              </label>
              <ErrorMessage name='message' component='div' className='error-msg' />
            </div>

            <button type='submit' className='btn btn-primary'>
              Submit
            </button>
          </Form>
        )}
      </Formik>
      <ModalAlert modalIsOpen={modalIsOpen} closeModal={closeModal} alert={alert} />
    </div>
  );
};

export default ContactPage;
