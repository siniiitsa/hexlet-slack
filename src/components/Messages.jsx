import React from 'react';
import { Formik, Form, Field } from 'formik';

const validateNewMessage = (value) => {
  const error = value.trim() === '' ? 'Required' : null;
  return error;
};

const onSubmit = (values) => console.log(values);

const Messages = () => {
  return (
    <div className="col h-100">
      <div className="d-flex flex-column h-100">
        <div
          id="messages-box"
          className="chat-messages overflow-auto mb-3"></div>
        <div className="mt-auto">
          <Formik
            initialValues={{ message: '' }}
            onSubmit={onSubmit}
            validateOnMount>
            {({ isValid }) => (
              <Form noValidate autoComplete="off">
                <div className="form-group">
                  <div className="input-group">
                    <Field
                      type="text"
                      name="message"
                      aria-label="message"
                      className="mr-2 form-control"
                      validate={validateNewMessage}
                    />
                    <button
                      type="submit"
                      aria-label="submit"
                      className="btn btn-primary"
                      disabled={!isValid}>
                      Submit
                    </button>
                  </div>
                </div>
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </div>
  );
};

export default Messages;
