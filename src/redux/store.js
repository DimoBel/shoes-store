import { configureStore } from '@reduxjs/toolkit';
import filter from './slices/filterSlice';
import cart from './slices/cartSlice';
import shoes from './slices/shoesSlice';

export const store = configureStore({
  reducer: {
    filter,
    cart,
    shoes,
  },
});
