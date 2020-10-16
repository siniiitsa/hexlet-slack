import { createSlice } from '@reduxjs/toolkit';

const slice = createSlice({
  name: 'channels',
  initialState: {
    byId: { 1: 'general' },
    allIds: [1],
  },
  reducers: {
    addChannel(channels, action) {},
  },
});

export const { addChannel } = slice.actions;

export default slice.reducer;
