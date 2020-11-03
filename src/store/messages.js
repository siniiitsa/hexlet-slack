/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import routes from '../routes';
import { removeChannel } from './channels';

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
  extraReducers: {
    [removeChannel](state, { payload: { id: channelId } }) {
      const { byId, allIds } = state;
      const idsToStay = allIds.filter((id) => byId[id].channelId !== channelId);
      state.allIds = idsToStay;
      state.byId = idsToStay.reduce(
        (acc, id) => ({ ...acc, [id]: byId[id] }),
        {},
      );
    },
  },
});

export const { addMessage, initMessages } = slice.actions;

export default slice.reducer;

// Actions
export const requestAddMessage = (channelId, payload) => async () => {
  const url = routes.channelMessagesPath(channelId);
  const data = { data: { attributes: payload } };

  try {
    await axios.post(url, data);
  } catch (error) {
    // eslint-disable-next-line no-console
    console.log(error);
    throw error;
  }
};

// Selectors
export const selectMessageByChannel = (channelId) => (state) => {
  const { byId, allIds } = state.messages;
  return allIds.map((id) => byId[id]).filter((m) => m.channelId === channelId);
};
