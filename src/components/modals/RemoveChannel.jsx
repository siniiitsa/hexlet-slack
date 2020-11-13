import React from 'react';
import { useTranslation } from 'react-i18next';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import { Modal, Button } from 'react-bootstrap';
import { Formik, Form } from 'formik';
import { requestRemoveChannel } from '../../store/channels';

const RemoveChannel = ({ onHide, info }) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();

  const handleSubmit = async () => {
    try {
      await dispatch(requestRemoveChannel({ id: info.itemId }));
      onHide();
    // eslint-disable-next-line no-empty
    } catch {}
  };

  return (
    <Modal show onHide={onHide}>
      <Modal.Header closeButton onHide={null}>
        <Modal.Title>{t('modals.remove_channel_title')}</Modal.Title>
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
                disabled={isSubmitting}
              >
                {t('modals.remove_btn')}
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
      </Modal.Footer>
    </Modal>
  );
};

RemoveChannel.propTypes = {
  onHide: PropTypes.func.isRequired,
  info: PropTypes.shape({
    itemId: PropTypes.number.isRequired,
  }).isRequired,
};

export default RemoveChannel;
