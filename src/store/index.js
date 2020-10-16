import { configureStore } from '@reduxjs/toolkit';
import channelsReducer from './channels';
import messagesReducer from './messages';

const store = configureStore({
  reducers: {
    channles: channelsReducer,
    messages: messagesReducer,
  },
});

export default store;
