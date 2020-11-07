import React, {
  useState, useContext, useRef, useEffect,
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
  const [submitError, setSubmitError] = useState(null);
  const currentChannelId = useSelector(
    (state) => state.channels.currentChannelId,
  );
  const messages = useSelector(selectMessageByChannel(currentChannelId));
  const messagesBox = useRef(null);
  const newMessageField = useRef(null);
  const dispatch = useDispatch();

  const handleSubmit = async (values, formActions) => {
    setSubmitError(null);
    const payload = { text: values.message, userName: user.name };

    try {
      await dispatch(requestAddMessage(currentChannelId, payload));
      formActions.resetForm();
      newMessageField.current.focus();
    } catch (error) {
      setSubmitError('Network Error');
    }
  };

  useEffect(() => {
    scrollToBottom(messagesBox);
  }, [messages]);

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

export default Dialog;
