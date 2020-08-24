import React, { useRef } from 'react';
import ReactModal from 'react-modal';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';

ReactModal.setAppElement('#root');

const ChangePasswordSchema = Yup.object().shape({
  password: Yup.string().min(6, 'Password must be at-least 6 characters').required('Password is required'),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref('password'), null], 'Passwords must match')
    .required('Confirm Password is required'),
});

const ModalChangePassword = ({ modalIsOpen, closeModal, changeUserPassword }) => {
  const formRef = useRef();

  const submitChangePasswordForm = () => {
    if (formRef.current) {
      formRef.current.handleSubmit();
    }
  };

  return (
    <ReactModal
      className='modal'
      isOpen={modalIsOpen}
      onRequestClose={closeModal}
      closeTimeoutMS={200}
      overlayClassName='modal-overlay'
    >
      <div className='modal-content'>
        <div className={`modal-header`}>
          <h4 className='modal-title'>Change Password</h4>
          <button type='button' className='close' data-dismiss='modal' aria-label='Close' onClick={closeModal}>
            <span aria-hidden='true'>×</span>
          </button>
        </div>
        <div className='modal-body'>
          <Formik
            innerRef={formRef}
            initialValues={{
              password: '',
              confirmPassword: '',
            }}
            validationSchema={ChangePasswordSchema}
            onSubmit={(values) => {
              changeUserPassword(values.password);
            }}
          >
            {({ values, errors, touched }) => (
              <Form>
                <div className='form-group'>
                  <Field
                    name='password'
                    type='password'
                    className={`${errors.password && touched.password ? 'error-border' : ''} form-group-input`}
                  />
                  <label className={`${values.password.length ? 'shrink' : ''} form-group-label`}>New Password</label>
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
              </Form>
            )}
          </Formik>
        </div>
        <div className='modal-footer'>
          <button type='submit' className='btn btn-primary btn-small' onClick={submitChangePasswordForm}>
            Submit
          </button>
          <button type='button' className='btn btn-outline-secondary btn-small' onClick={closeModal}>
            Cancel
          </button>
        </div>
      </div>
    </ReactModal>
  );
};

export default ModalChangePassword;
