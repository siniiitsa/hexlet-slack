import React, { useRef, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import { Modal, FormGroup, Button } from 'react-bootstrap';
import cn from 'classnames';
import {
  Formik, Form, Field, ErrorMessage,
} from 'formik';
import * as yup from 'yup';
import getSchema from '../../validate';
import { requestRenameChannel } from '../../store/channels';
import FieldError from './FieldError';

const validationSchema = yup.object({
  name: getSchema('channelName'),
});

const RenameChannel = ({ onHide, info }) => {
  const { t } = useTranslation();
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
        <Modal.Title>{t('modals.rename_channel_title')}</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <Formik
          initialValues={{ name: '' }}
          onSubmit={handleSubmit}
          validationSchema={validationSchema}
        >
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
                  name="name"
                />
                <ErrorMessage name="name" component={FieldError} />
              </FormGroup>
              <Button type="submit" className="mr-2" disabled={isSubmitting}>
                {t('modals.rename_btn')}
              </Button>
              <Button
                onClick={onHide}
                variant="secondary"
                disabled={isSubmitting}
              >
                {t('modals.cancel_btn')}
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
