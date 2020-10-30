import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Col, NavItem, Button, Dropdown, ButtonGroup } from 'react-bootstrap';
import getModal from './modals';
import ChannelButton from './ChannelButton';
import { changeCurrentChannel, selectAllChannles } from '../store/channels';

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
  const createShowModalHandler = (type, item = null) => () =>
    setModalInfo({ type, item });

  const createChangeChannelHandler = (channelId) => () =>
    dispatch(changeCurrentChannel({ channelId }));

  return (
    <Col xs="3" className="border-right">
      <div className="d-flex my-2">
        <span>Channels</span>
        <Button
          className="ml-auto p-0"
          onClick={createShowModalHandler('addChannel')}
          variant="link">
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
              onChannelRename={createShowModalHandler('addChannel')} // TODO: change modal type
              onChannelRemove={createShowModalHandler('addChannel')} // TODO: change modal type
            />
          </NavItem>
        ))}
      </ul>
      {renderModal(modalInfo, hideModal)}
    </Col>
  );
};

export default Channels;
