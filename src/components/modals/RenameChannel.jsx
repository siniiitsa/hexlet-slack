import React, { useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import { Modal, FormGroup, Button } from 'react-bootstrap';
import cn from 'classnames';
import {
  Formik, Form, Field, ErrorMessage,
} from 'formik';
import { requestRenameChannel } from '../../store/channels';
import FieldError from './FieldError';
import getValidator from '../../validate';

const RenameChannel = ({ onHide, info }) => {
  const dispatch = useDispatch();
  const nameField = useRef(null);

  const handleSubmit = async (values, formActions) => {
    try {
      const payload = { name: values.name, id: info.itemId };
      await dispatch(requestRenameChannel(payload));
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
        <Modal.Title>Rename channel</Modal.Title>
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
                disabled={isSubmitting}
              >
                Cancel
              </Button>
            </Form>
          )}
        </Formik>
      </Modal.Body>
    </Modal>
  );
};

RenameChannel.propTypes = {
  onHide: PropTypes.func.isRequired,
  info: PropTypes.shape({
    itemId: PropTypes.number.isRequired,
  }).isRequired,
};

export default RenameChannel;
