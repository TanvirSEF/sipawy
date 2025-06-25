import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  orderDetails: null, 
};

const productslice = createSlice({
  name: 'order', 
  initialState,
  reducers: {
    setOrderDetails(state, action) {
      console.log(action)
      console.log( 'payload', action.payload);
      state.orderDetails = action.payload; 
    },
    clearOrderDetails(state) {
      state.orderDetails = null;
    },
  },
});


export const { setOrderDetails, clearOrderDetails } = productslice.actions;

export default productslice.reducer;
