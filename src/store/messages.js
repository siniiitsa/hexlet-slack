import { createSlice } from '@reduxjs/toolkit';

const slice = createSlice({
  name: 'messages',
  initialState: {
    byId: {},
    allIds: [],
  },
  reducers: {
    addMessage(messages, action) {},
  },
});

export const { addMessage } = slice.actions;

export default slice.reducer;
