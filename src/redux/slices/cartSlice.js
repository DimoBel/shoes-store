import { createSlice } from '@reduxjs/toolkit';
import { getCartFromLS } from '../../utils/getCartFromLS';
import { calcTotalPrice } from '../../utils/calcTotalPrice';

const { items, totalPrice } = getCartFromLS();

const initialState = {
  totalPrice,
  items,
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addItem(state, action) {
      const findItem = state.items.find((obj) => {
        return obj.id === action.payload.id && obj.size === action.payload.size;
      });
      if (findItem) {
        findItem.count++;
      } else {
        state.items.push({
          ...action.payload,
          count: 1,
        });
      }
      state.totalPrice = calcTotalPrice(state.items);
    },

    removeItem(state, action) {
      state.items = state.items.filter(
        (obj) => !(obj.id === action.payload.id && obj.size === action.payload.size),
      );
      state.totalPrice = calcTotalPrice(state.items);
    },

    clearItems(state) {
      state.items = [];
      state.totalPrice = 0;
    },

    // для корзины кнопочка -

    minusItem(state, action) {
      const findItem = state.items.find((obj) => {
        return obj.id === action.payload.id && obj.size === action.payload.size;
      });
      console.log(findItem);
      if (findItem && findItem.count > 1) {
        findItem.count--;
        state.totalPrice = state.totalPrice - findItem.price;
      }
    },
  },
});

export const selectCart = (state) => state.cart;
export const selectCartItemById = (id) => (state) => state.cart.items.find((obj) => obj.id === id);

export const { addItem, removeItem, minusItem, clearItems } = cartSlice.actions;

export default cartSlice.reducer;
