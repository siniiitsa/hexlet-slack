import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { Col, NavItem, Button } from 'react-bootstrap';
import getModal from './modals';
import ChannelButton from './ChannelButton';
import { changeCurrentChannel } from '../store/channels';

const renderModal = (modalInfo, hideModal) => {
  if (!modalInfo.type) return null;

  const Modal = getModal(modalInfo.type);
  return <Modal info={modalInfo} onHide={hideModal} />;
};

const Channels = () => {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const [modalInfo, setModalInfo] = useState({ type: null, itemId: null });
  const channels = useSelector((state) => state.channels.channels);
  const currentChannelId = useSelector(
    (state) => state.channels.currentChannelId,
  );

  const hideModal = () => setModalInfo({ type: null, itemId: null });

  const createShowModalHandler = (type, itemId = null) => () => setModalInfo({ type, itemId });

  const createChangeChannelHandler = (channelId) => () => (
    dispatch(changeCurrentChannel({ channelId }))
  );

  return (
    <Col xs="3" className="border-right">
      <div className="d-flex my-2">
        <span>{t('channels.section_title')}</span>
        <Button
          className="ml-auto p-0"
          onClick={createShowModalHandler('addChannel')}
          variant="link"
        >
          +
        </Button>
      </div>
      <ul className="nav flex-column nav-pills nav-fill">
        {channels.map(({ id, name, removable }) => (
          <NavItem key={id}>
            <ChannelButton
              name={name}
              removable={removable}
              variant={id === currentChannelId ? 'primary' : 'light'}
              onClick={createChangeChannelHandler(id)}
              onRenameChannel={createShowModalHandler('renameChannel', id)}
              onRemoveChannel={createShowModalHandler('removeChannel', id)}
            />
          </NavItem>
        ))}
      </ul>
      {renderModal(modalInfo, hideModal)}
    </Col>
  );
};

export default Channels;
