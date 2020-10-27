import { createSlice, createSelector } from '@reduxjs/toolkit';
import axios from 'axios';
import routes from '../routes';

const slice = createSlice({
  name: 'messages',
  initialState: {
    byId: {},
    allIds: [],
  },
  reducers: {
    addMessage(state, { payload: { message } }) {
      state.byId[message.id] = message;
      state.allIds.push(message.id);
    },
    initMessages(state, { payload: { messages } }) {
      state.byId = messages.reduce((acc, m) => ({ ...acc, [m.id]: m }), {});
      state.allIds = messages.map((m) => m.id);
    },
  },
});

export const { addMessage, initMessages } = slice.actions;

export default slice.reducer;

// Actions
export const sendNewMessage = (channelId, payload) => async () => {
  const url = routes.channelMessagesPath(channelId);
  const data = { data: { attributes: payload } };

  try {
    await axios.post(url, data);
  } catch (error) {
    console.log(error);
    throw error;
  }
};

// Selectors
export const selectMessageByChannel = (channelId) => (state) => {
  const { byId, allIds } = state.messages;
  return allIds.map((id) => byId[id]).filter((m) => m.channelId === channelId);
};
