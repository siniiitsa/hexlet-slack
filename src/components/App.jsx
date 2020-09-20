import React from 'react';

import Channels from './Channels';
import Dialog from './Dialog';

const App = ({ channels, currentChannelId }) => {
  const channelsData = { channels, currentChannelId };

  return (
    <div className="row h-100 pb-3">
      <Channels {...channelsData} />
      <Dialog />
    </div>
  );
};

export default App;