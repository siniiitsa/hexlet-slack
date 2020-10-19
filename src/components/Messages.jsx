import React, { useContext } from 'react';
import { Formik, Form, Field } from 'formik';
import { useDispatch, useSelector } from 'react-redux';
import UserContext from '../contexts/UserContext';
import {
  sendNewMessage,
  addMessage,
  selectMessageByChannel,
} from '../store/messages';

const validateNewMessage = (value) => {
  const error = value.trim() === '' ? 'Required' : null;
  return error;
};

const renderMessage = ({ text, id, userName }) => (
  <div key={id}>
    <b>{`${userName}: `}</b>
    {text}
  </div>
);

const Messages = ({ currentChannelId, messages }) => {
  const user = useContext(UserContext);
  const newMessages = useSelector(selectMessageByChannel(currentChannelId));
  const dispatch = useDispatch();

  const handleSendMessage = (values, onSubmitProps) => {
    const payload = { text: values.message, userName: user.name };
    dispatch(sendNewMessage(currentChannelId, payload));
    onSubmitProps.resetForm();
  };

  return (
    <div className="col h-100">
      <div className="d-flex flex-column h-100">
        <div id="messages-box" className="chat-messages overflow-auto mb-3">
          {messages.map(renderMessage)}
          {newMessages.map(renderMessage)}
        </div>
        <div className="mt-auto">
          <Formik
            initialValues={{ message: '' }}
            onSubmit={handleSendMessage}
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
