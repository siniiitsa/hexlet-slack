import React from 'react';
import { Row } from 'react-bootstrap';

import Channels from './Channels';
import Dialog from './Dialog';

const App = () => (
  <Row className="h-100 pb-3">
    <Channels />
    <Dialog />
  </Row>
);

export default App;
