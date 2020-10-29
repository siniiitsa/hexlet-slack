import React, { useState, useRef, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Modal, FormGroup, Button } from 'react-bootstrap';
import cn from 'classnames';
import { Formik, Form, Field, ErrorMessage, yupToFormErrors } from 'formik';
import { createNewChannel } from '../../store/channels';
import FieldError from './FieldError';
import getValidator from '../../validate';

const AddChannel = ({ onHide }) => {
  const dispatch = useDispatch();
  // const [submitError, setSubmitError] = useState(null);
  const nameField = useRef(null);

  const handleSubmit = async (values, formActions) => {
    try {
      await dispatch(createNewChannel({ name: values.name }));
      onHide();
    } catch (error) {
      formActions.setFieldError('name', 'Network Error');
    }
  };

  useEffect(() => {
    nameField.current.focus();
  }, []);

  return (
    <Modal show onHide={onHide}>
      <Modal.Header closeButton onHide={null}>
        <Modal.Title>Add channel</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <Formik initialValues={{ name: '' }} onSubmit={handleSubmit}>
          {({ isValid, isSubmitting, touched }) => (
            <Form noValidate autoComplete="off">
              <FormGroup>
                <Field
                  required
                  className={cn({
                    'form-control': true,
                    'is-invalid': touched.name && !isValid,
                  })}
                  innerRef={nameField}
                  disabled={isSubmitting}
                  data-testid="input-body"
                  validate={getValidator('channelName')}
                  name="name"
                />
                <ErrorMessage name="name" component={FieldError} />
              </FormGroup>
              <Button type="submit" className="mr-2" disabled={isSubmitting}>
                Add
              </Button>
              <Button
                onClick={onHide}
                variant="secondary"
                disabled={isSubmitting}>
                Cancel
              </Button>
            </Form>
          )}
        </Formik>
      </Modal.Body>
    </Modal>
  );
};

export default AddChannel;
