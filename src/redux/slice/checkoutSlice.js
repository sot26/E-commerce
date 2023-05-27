import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  shippingAddress: "",
  billingAddress: "",
};

const checkoutSlice = createSlice({
  name: "checkout",
  initialState,
  reducers: {
    SAVE_BILLING_ADDRESS(state, action) {
      state.billingAddress = action.payload;
      console.log(action.payload);
    },
    SAVE_SHIPPING_ADDRESS(state, action) {
      state.shippingAddress = action.payload;
      console.log(action.payload);
    },
  },
});

export const { SAVE_BILLING_ADDRESS, SAVE_SHIPPING_ADDRESS } =
  checkoutSlice.actions;
export const selectBillingAddress = (state) => state.checkout.billingAddress;
export const selectsSippingAddress = (state) => state.checkout.shippingAddress;
export default checkoutSlice.reducer;
