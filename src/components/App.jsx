import React from 'react';

import Channels from './Channels';
import Messages from './Messages';

const App = ({ channels, currentChannelId }) => {
  const channelsData = { channels, currentChannelId };

  return (
    <div className="row h-100 pb-3">
      <Channels {...channelsData} />
      <Messages currentChannelId={currentChannelId} />
    </div>
  );
};

export default App;
