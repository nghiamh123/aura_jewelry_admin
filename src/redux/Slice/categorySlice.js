// redux/counterSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = [];

const categorySlice = createSlice({
  name: 'categories',
  initialState,
  reducers: {
    setCategories: (state, { payload }) => {
      return [...state, ...payload];
    },
  },
});

export const { setCategories } = categorySlice.actions;
export default categorySlice.reducer;
