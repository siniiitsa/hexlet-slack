import { createSlice, createSelector } from '@reduxjs/toolkit';
import axios from 'axios';
import routes from '../routes';

const slice = createSlice({
  name: 'messages',
  initialState: {
    byId: {},
    allIds: [],
    sending: false,
  },
  reducers: {
    sendNewMessageRequest(state) {
      state.sending = true;
    },
    sendNewMessageSuccess(state) {
      state.sending = false;
    },
    sendNewMessageFailure(state) {
      state.sending = false;
    },
    addMessage(state, { payload: { message } }) {
      state.byId[message.id] = message;
      state.allIds.push(message.id);
    },
  },
});

const {
  sendNewMessageRequest,
  sendNewMessageSuccess,
  sendNewMessageFailure,
} = slice.actions;

export const { addMessage } = slice.actions;

export default slice.reducer;

// Actions
export const sendNewMessage = (channelId, payload) => async (dispatch) => {
  dispatch(sendNewMessageRequest());
  const url = routes.channelMessagesPath(channelId);
  const data = { data: { attributes: payload } };

  try {
    await axios.post(url, data);
    dispatch(sendNewMessageSuccess());
  } catch (error) {
    console.log(error);
    dispatch(sendNewMessageFailure());
  }
};

// Selectors
export const selectMessageByChannel = (channelId) => (state) => {
  const { byId, allIds } = state.messages;
  return allIds.map((id) => byId[id]).filter((m) => m.channelId === channelId);
};
