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
    addNewMessageRequest(state) {
      state.sending = true;
    },
    addNewMessageSuccess(state, { payload: { message } }) {
      state.sending = false;
      state.byId[message.id] = message;
      state.allIds.push(message.id);
    },
    addNewMessageFailure(state, action) {
      state.sending = false;
    },
  },
});

const {
  addNewMessageRequest,
  addNewMessageSuccess,
  addNewMessageFailure,
} = slice.actions;

export default slice.reducer;

// Actions
export const addNewMessage = (channelId, { text }) => async (dispatch) => {
  dispatch(addNewMessageRequest());
  const url = routes.channelMessagesPath(channelId);
  const data = { data: { attributes: { text } } };

  try {
    const response = await axios.post(url, data);
    const message = response.data.data.attributes;
    dispatch(addNewMessageSuccess({ message }));
  } catch (error) {
    console.log(error);
    dispatch(addNewMessageFailure());
  }
};
