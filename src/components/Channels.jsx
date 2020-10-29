import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Col, NavItem, Button } from 'react-bootstrap';
import getModal from './modals';
import { changeCurrentChannel, selectAllChannles } from '../store/channels';

const renderChannels = (channels, currentChannelId, handleChangeChannel) =>
  channels.length === 0
    ? null
    : channels.map(({ id, name }) => (
        <NavItem key={id}>
          <Button
            onClick={handleChangeChannel(id)}
            className="nav-link btn-block mb-2 text-left"
            variant={currentChannelId === id ? 'primary' : 'light'}>
            {name}
          </Button>
        </NavItem>
      ));

const renderModal = (modalInfo, hideModal) => {
  if (!modalInfo.type) return null;

  const Modal = getModal(modalInfo.type);
  return <Modal info={modalInfo} onHide={hideModal} />;
};

const Channels = () => {
  const dispatch = useDispatch();
  const [modalInfo, setModalInfo] = useState({ type: null, item: null });
  const channels = useSelector(selectAllChannles);
  const currentChannelId = useSelector(
    (state) => state.channels.currentChannelId
  );

  const hideModal = () => setModalInfo({ type: null, item: null });
  const showModal = (type, item = null) => () => setModalInfo({ type, item });

  const handleChangeChannel = (channelId) => () =>
    dispatch(changeCurrentChannel({ channelId }));

  return (
    <Col xs="3" className="border-right">
      <div className="d-flex my-2">
        <span>Channels</span>
        <Button
          onClick={showModal('addChannel')}
          className="ml-auto p-0"
          variant="link">
          +
        </Button>
      </div>
      <ul className="nav flex-column nav-pills nav-fill">
        {renderChannels(channels, currentChannelId, handleChangeChannel)}
      </ul>
      {renderModal(modalInfo, hideModal)}
    </Col>
  );
};

export default Channels;
