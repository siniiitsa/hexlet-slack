import React from 'react';
import { Row } from 'react-bootstrap';

import Channels from './Channels';
import Messages from './Messages';

const App = ({ channels, messages, currentChannelId }) => {
  const channelsProps = { channels, currentChannelId };
  const messagesProps = { messages, currentChannelId };

  return (
    <Row className="h-100 pb-3">
      <Channels {...channelsProps} />
      <Messages {...messagesProps} />
    </Row>
  );
};

export default App;
