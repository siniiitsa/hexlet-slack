import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Modal, Button } from 'react-bootstrap';
import { Formik, Form } from 'formik';
import { requestRemoveChannel } from '../../store/channels';

const RemoveChannel = ({ onHide, info }) => {
  const dispatch = useDispatch();

  const handleSubmit = async () => {
    setSubmitError(null);
    try {
      await dispatch(requestRemoveChannel({ id: info.itemId }));
      onHide();
    } catch (error) {
      setSubmitError('Network Error');
    }
  };

  return (
    <Modal show onHide={onHide}>
      <Modal.Header closeButton onHide={null}>
        <Modal.Title>Remove channel</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <div>Are you sure you want to remove this channel?</div>
      </Modal.Body>

      <Modal.Footer>
        <Formik initialValues={{}} onSubmit={handleSubmit}>
          {({ isSubmitting }) => (
            <Form>
              <Button
                type="submit"
                variant="danger"
                className="mr-2"
                disabled={isSubmitting}>
                Remove
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
      </Modal.Footer>
    </Modal>
  );
};

export default RemoveChannel;
