// redux/store.js
import { configureStore } from '@reduxjs/toolkit';
import categorySlice from './Slice/categorySlice'; // Import reducer của slice

const store = configureStore({
  reducer: {
    category: categorySlice,
  },
});

export default store;
