import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchShoes = createAsyncThunk('shoes/fetchShoesStatus', async (params, thunkAPI) => {
  const { sortBy, order, category, search, currentPage } = params;
  const { data } = await axios.get(
    `https://66264d33052332d55322633f.mockapi.io/items?page=${currentPage}&limit=8&${category}&sortBy=${sortBy}&order=${order}&${search}`,
  );
  return data;
});

const initialState = {
  items: [],
  status: 'loading',
};

const shoesSlice = createSlice({
  name: 'shoes',
  initialState,
  reducers: {
    setItems(state, action) {
      state.items = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchShoes.pending, (state) => {
        state.status = 'loading';
        state.items = [];
      })
      .addCase(fetchShoes.fulfilled, (state, action) => {
        state.items = action.payload;
        state.status = 'success';
      })
      .addCase(fetchShoes.rejected, (state) => {
        state.status = 'error';
        state.items = [];
      });
  },
});

export const selectShoesData = (state) => state.shoes;

export const { setItems } = shoesSlice.actions;

export default shoesSlice.reducer;
