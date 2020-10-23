import { createSlice } from '@reduxjs/toolkit';

const slice = createSlice({
  name: 'channels',
  initialState: {
    byId: {},
    allIds: [],
    currentChannelId: null,
  },
  reducers: {
    addChannel(state, action) {},
    changeCurrentChannel(state, { payload: { channelId } }) {
      state.currentChannelId = channelId;
    },
  },
});

export const { changeCurrentChannel } = slice.actions;

export default slice.reducer;
