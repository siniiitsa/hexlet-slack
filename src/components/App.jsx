import React from 'react';

import Channels from './Channels';
import Dialog from './Dialog';

const App = (props) => {
  return (
    <div className="row h-100 pb-3">
      <Channels />
      <Dialog />
    </div>
  );
};

export default App;