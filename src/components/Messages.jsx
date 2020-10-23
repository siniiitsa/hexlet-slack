import React, { useState, useContext, useRef, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Formik, Form, Field } from 'formik';
import cn from 'classnames';
import { Col, Button, FormGroup, InputGroup } from 'react-bootstrap';

import UserContext from '../contexts/UserContext';
import { sendNewMessage, selectMessageByChannel } from '../store/messages';

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

const scrollToBottom = (ref) => {
  const { current } = ref;
  current.scrollTop = current.scrollHeight;
};

const Messages = ({ messages: messagesOnPageLoad }) => {
  const user = useContext(UserContext);
  const [submitError, setSubmitError] = useState(null);
  const currentChannelId = useSelector(
    (state) => state.channels.currentChannelId
  );
  const newMessages = useSelector(selectMessageByChannel(currentChannelId));
  const messagesBox = useRef(null);
  const newMessageField = useRef(null);
  const dispatch = useDispatch();

  const handleSubmit = async (values, formActions) => {
    setSubmitError(null);
    const payload = { text: values.message, userName: user.name };

    try {
      await dispatch(sendNewMessage(currentChannelId, payload));
      formActions.resetForm();
      newMessageField.current.focus();
    } catch (error) {
      setSubmitError('Network Error');
    }
  };

  useEffect(() => {
    scrollToBottom(messagesBox);
  }, [newMessages]);

  const messagesOnPageLoadForCurrentChannel = messagesOnPageLoad.filter(
    ({ channelId }) => channelId === currentChannelId
  );

  return (
    <Col className="h-100">
      <div className="d-flex flex-column h-100">
        <div
          ref={messagesBox}
          id="messages-box"
          className="chat-messages overflow-auto mb-3">
          {messagesOnPageLoadForCurrentChannel.map(renderMessage)}
          {newMessages.map(renderMessage)}
        </div>
        <div className="mt-auto">
          <Formik
            initialValues={{ message: '' }}
            onSubmit={handleSubmit}
            validateOnMount>
            {({ isSubmitting, isValid }) => (
              <Form noValidate autoComplete="off">
                <FormGroup>
                  <InputGroup>
                    <Field
                      autoFocus
                      innerRef={newMessageField}
                      type="text"
                      name="message"
                      aria-label="message"
                      className={cn({
                        'mr-2 form-control': true,
                        'is-invalid': !!submitError,
                      })}
                      validate={validateNewMessage}
                      disabled={isSubmitting}
                    />
                    <Button
                      type="submit"
                      aria-label="submit"
                      disabled={!isValid || isSubmitting}>
                      Submit
                    </Button>
                    <div className="d-block invalid-feedback">
                      {submitError && submitError}
                      &nbsp;
                    </div>
                  </InputGroup>
                </FormGroup>
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </Col>
  );
};

export default Messages;
