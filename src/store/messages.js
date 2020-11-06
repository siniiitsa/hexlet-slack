/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import routes from '../routes';
import { removeChannel } from './channels';

const slice = createSlice({
  name: 'messages',
  initialState: [],
  reducers: {
    addMessage(state, { payload: { message } }) {
      state.push(message);
    },
    initMessages(state, { payload: { messages } }) {
      state.push(...messages);
    },
  },
  extraReducers: {
    [removeChannel](state, { payload: { id: channelId } }) {
      return state.filter((m) => m.channelId !== channelId);
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
export const selectMessageByChannel = (channelId) => (state) => (
  state.messages.filter((m) => m.channelId === channelId)
);
