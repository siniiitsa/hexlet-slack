import React, {
  useContext, useRef, useEffect,
} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Formik, Form, Field } from 'formik';
import * as yup from 'yup';
import cn from 'classnames';
import {
  Col, Button, FormGroup, InputGroup,
} from 'react-bootstrap';
import getSchema from '../validate';
import userContext from '../contexts/userContext';
import { requestAddMessage, selectMessageByChannel } from '../store/messages';

const validationSchema = yup.object({
  message: getSchema('chatMessage'),
});

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

const Dialog = () => {
  const user = useContext(userContext);
  const currentChannelId = useSelector(
    (state) => state.channels.currentChannelId,
  );
  const messages = useSelector(selectMessageByChannel(currentChannelId));
  const messagesBox = useRef(null);
  const newMessageField = useRef(null);
  const dispatch = useDispatch();

  const handleSubmit = async (values, { setStatus, resetForm }) => {
    setStatus(null);
    const payload = { text: values.message, userName: user.name };

    try {
      await dispatch(requestAddMessage(currentChannelId, payload));
      resetForm();
      newMessageField.current.focus();
    } catch (error) {
      setStatus(error.message);
    }
  };

  useEffect(() => {
    scrollToBottom(messagesBox);
  }, [messages]);

  useEffect(() => {
    newMessageField.current.focus();
  }, [currentChannelId]);

  return (
    <Col className="h-100">
      <div className="d-flex flex-column h-100">
        <div
          ref={messagesBox}
          id="messages-box"
          className="chat-messages overflow-auto mb-3"
        >
          {messages.map(renderMessage)}
        </div>
        <div className="mt-auto">
          <Formik
            initialValues={{ message: '' }}
            onSubmit={handleSubmit}
            validationSchema={validationSchema}
            validateOnMount
          >
            {({ isSubmitting, isValid, status }) => (
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
                        'is-invalid': !!status,
                      })}
                      disabled={isSubmitting}
                    />
                    <Button
                      type="submit"
                      aria-label="submit"
                      disabled={!isValid || isSubmitting}
                    >
                      Send
                    </Button>
                    <div className="d-block invalid-feedback">
                      {status && status}
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

export default Dialog;
