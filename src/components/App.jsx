import React from 'react';

import Channels from './Channels';
import Messages from './Messages';

const App = ({ channels, messages, currentChannelId }) => {
  const channelsData = { channels, currentChannelId };
  const messagesData = { messages, currentChannelId };

  return (
    <div className="row h-100 pb-3">
      <Channels {...channelsData} />
      <Messages {...messagesData} />
    </div>
  );
};

export default App;
