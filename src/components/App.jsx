import React from 'react';

import Channels from './Channels';
import Messages from './Messages';

const App = ({ channels, messages, currentChannelId }) => {
  const channelsProps = { channels, currentChannelId };
  const messagesProps = { messages, currentChannelId };

  return (
    <div className="row h-100 pb-3">
      <Channels {...channelsProps} />
      <Messages {...messagesProps} />
    </div>
  );
};

export default App;
