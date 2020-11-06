/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import routes from '../routes';

const slice = createSlice({
  name: 'channels',
  initialState: {
    channels: [],
    currentChannelId: null,
  },
  reducers: {
    initChannels(state, { payload: { currentChannelId, channels } }) {
      state.currentChannelId = currentChannelId;
      state.channels.push(...channels);
    },
    changeCurrentChannel(state, { payload: { channelId } }) {
      state.currentChannelId = channelId;
    },
    addChannel(state, { payload: { channel } }) {
      state.channels.push(channel);
    },
    renameChannel(state, { payload: { channel } }) {
      const { id, name } = channel;
      state.channels.find((c) => c.id === id).name = name;
    },
    removeChannel(state, { payload: { id } }) {
      if (id === state.currentChannelId) {
        const prevChannelIndex = state.channels.findIndex((c) => c.id === id) - 1;
        state.currentChannelId = state.channels[prevChannelIndex].id;
      }
      state.channels = state.channels.filter((c) => c.id !== id);
    },
  },
});

export const {
  changeCurrentChannel,
  initChannels,
  addChannel,
  renameChannel,
  removeChannel,
} = slice.actions;

export default slice.reducer;

// Actions
export const requestAddChannel = (payload) => async () => {
  const url = routes.channelsPath();
  const data = { data: { attributes: payload } };

  try {
    await axios.post(url, data);
  } catch (error) {
    // eslint-disable-next-line no-console
    console.log(error);
    throw error;
  }
};

export const requestRenameChannel = (payload) => async () => {
  const { id, name } = payload;
  const url = routes.channelPath(id);
  const data = {
    data: { attributes: { name } },
    params: { id },
  };

  try {
    await axios.patch(url, data);
  } catch (error) {
    // eslint-disable-next-line no-console
    console.log(error);
    throw error;
  }
};

export const requestRemoveChannel = (payload) => async () => {
  const { id } = payload;
  const url = routes.channelPath(id);
  const data = { params: { id } };

  try {
    await axios.delete(url, data);
  } catch (error) {
    // eslint-disable-next-line no-console
    console.log(error);
    throw error;
  }
};
