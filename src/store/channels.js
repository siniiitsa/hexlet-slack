import { createSlice } from '@reduxjs/toolkit';

const slice = createSlice({
  name: 'channels',
  initialState: {
    byId: {},
    allIds: [],
    currentChannelId: null,
  },
  reducers: {
    changeCurrentChannel(state, { payload: { channelId } }) {
      state.currentChannelId = channelId;
    },
    initChannels(state, { payload: { currentChannelId, channels } }) {
      state.currentChannelId = currentChannelId;
      state.byId = channels.reduce((acc, c) => ({ ...acc, [c.id]: c }), {});
      state.allIds = channels.map((c) => c.id);
    },
  },
});

export const { changeCurrentChannel, initChannels } = slice.actions;

export default slice.reducer;

// Selectors
export const selectAllChannles = (state) => {
  const { byId, allIds } = state.channels;
  return allIds.map((id) => byId[id]);
};
