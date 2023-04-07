import { createSlice } from "@reduxjs/toolkit";
import Product from "../../components/product/Product";

const initialState = {
  fiteredProducts: [],
};

const filterSlice = createSlice({
  name: "filter",
  initialState,
  reducers: {
    FILTER_BY_SEARCH(state, action) {
      const { products, search } = action.payload;
      const tempProduct = products.filter(
        (product) =>
          product.name.toLowerCase().includes(search.toLowerCase()) ||
          product.category.toLowerCase().includes(search.toLowerCase()) ||
          product.brand.toLowerCase().includes(search.toLowerCase())
      );
      state.fiteredProducts = tempProduct;
    },
  },
});

export const { FILTER_BY_SEARCH } = filterSlice.actions;

export const selectFilteredProducts = (state) => state.filter.fiteredProducts;

export default filterSlice.reducer;
