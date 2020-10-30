import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  Col,
  NavItem,
  Button,
  SplitButton,
  Dropdown,
  ButtonGroup,
} from 'react-bootstrap';
import getModal from './modals';
import { changeCurrentChannel, selectAllChannles } from '../store/channels';

const renderButton = (title, variant, handleClick) => (
  <Button
    onClick={handleClick}
    className="btn-block mb-2 text-left shadow-none"
    variant={variant}>
    {title}
  </Button>
);

const renderSplitButton = (title, variant, handleClick) => (
  <Dropdown as={ButtonGroup} className="btn-block mb-2">
    <Button
      onClick={handleClick}
      className="text-left shadow-none"
      variant={variant}>
      {title}
    </Button>

    <Dropdown.Toggle
      split
      variant={variant}
      id="dropdown-split-basic"
      className="flex-grow-0 shadow-none"
    />

    <Dropdown.Menu>
      <Dropdown.Item>Rename</Dropdown.Item>
      <Dropdown.Item>Remove</Dropdown.Item>
    </Dropdown.Menu>
  </Dropdown>
);

const renderChannels = (channels, currentChannelId, handleChangeChannel) => {
  if (channels.length === 0) {
    return null;
  }

  return channels.map(({ id, name, removable }) => {
    const handleClick = handleChangeChannel(id);
    const variant = id === currentChannelId ? 'primary' : 'light';
    const render = removable ? renderSplitButton : renderButton;
    return <NavItem key={id}>{render(name, variant, handleClick)}</NavItem>;
  });
};

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
