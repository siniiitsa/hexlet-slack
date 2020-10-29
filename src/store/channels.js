import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import routes from '../routes';

const slice = createSlice({
  name: 'channels',
  initialState: {
    byId: {},
    allIds: [],
    currentChannelId: null,
  },
  reducers: {
    initChannels(state, { payload: { currentChannelId, channels } }) {
      state.currentChannelId = currentChannelId;
      state.byId = channels.reduce((acc, c) => ({ ...acc, [c.id]: c }), {});
      state.allIds = channels.map((c) => c.id);
    },
    changeCurrentChannel(state, { payload: { channelId } }) {
      state.currentChannelId = channelId;
    },
    addChannel(state, { payload: { channel } }) {
      const { id } = channel;
      state.byId[id] = channel;
      state.allIds.push(id);
    },
  },
});

export const { changeCurrentChannel, initChannels, addChannel } = slice.actions;

export default slice.reducer;

// Actions
export const createNewChannel = (payload) => async () => {
  const url = routes.channelsPath();
  const data = { data: { attributes: payload } };

  try {
    await axios.post(url, data);
  } catch (error) {
    console.log(error);
    throw error;
  }
};

// Selectors
export const selectAllChannles = (state) => {
  const { byId, allIds } = state.channels;
  return allIds.map((id) => byId[id]);
};
