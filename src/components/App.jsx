import React from 'react';
import { Row } from 'react-bootstrap';

import Channels from './Channels';
import Messages from './Messages';

const App = () => (
  <Row className="h-100 pb-3">
    <Channels />
    <Messages />
  </Row>
);

export default App;
