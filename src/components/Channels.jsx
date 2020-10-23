import React from 'react';
import cn from 'classnames';
import { Col, NavItem, Button } from 'react-bootstrap';

const renderChannels = (channels, currentChannelId) =>
  channels.length > 0 ? (
    <ul className="nav flex-column nav-pills nav-fill">
      {channels.map(({ id, name }) => (
        <NavItem key={id}>
          <Button
            className="nav-link btn-block mb-2 text-left"
            variant={currentChannelId === id ? 'primary' : 'light'}>
            {name}
          </Button>
        </NavItem>
      ))}
    </ul>
  ) : null;

const Channels = ({ channels, currentChannelId }) => {
  return (
    <Col xs="3" className="border-right">
      <div className="d-flex my-2">
        <span>Channels</span>
        <Button className="ml-auto p-0" variant="link">
          +
        </Button>
      </div>
      {renderChannels(channels, currentChannelId)}
    </Col>
  );
};

export default Channels;
