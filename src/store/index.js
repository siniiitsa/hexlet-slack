import { configureStore } from '@reduxjs/toolkit';
import channelsReducer from './channels';
import messagesReducer from './messages';

export default () => configureStore({
  reducer: {
    channels: channelsReducer,
    messages: messagesReducer,
  },
});
