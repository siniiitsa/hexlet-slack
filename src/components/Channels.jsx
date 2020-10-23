import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Col, NavItem, Button } from 'react-bootstrap';

import { changeCurrentChannel } from '../store/channels';

const Channels = ({ channels }) => {
  const dispatch = useDispatch();
  const currentChannelId = useSelector(
    (state) => state.channels.currentChannelId
  );

  const handleChannelChange = (channelId) => () =>
    dispatch(changeCurrentChannel({ channelId }));

  return (
    <Col xs="3" className="border-right">
      <div className="d-flex my-2">
        <span>Channels</span>
        <Button className="ml-auto p-0" variant="link">
          +
        </Button>
      </div>
      {channels.length > 0 ? (
        <ul className="nav flex-column nav-pills nav-fill">
          {channels.map(({ id, name }) => (
            <NavItem key={id}>
              <Button
                onClick={handleChannelChange(id)}
                className="nav-link btn-block mb-2 text-left"
                variant={currentChannelId === id ? 'primary' : 'light'}>
                {name}
              </Button>
            </NavItem>
          ))}
        </ul>
      ) : null}
    </Col>
  );
};

export default Channels;
