import { createSlice } from "@reduxjs/toolkit";
import Product from "../../components/product/Product";

const initialState = {
  filteredProducts: [],
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
      state.filteredProducts = tempProduct;
    },
    SORT_PRODUCTS(state, action) {
      const { products, sort } = action.payload;

      let tempProducts = [];

      if (sort === "latest") {
        tempProducts = products;
      }

      if (sort === "lowest-price") {
        tempProducts = products.slice().sort((a, b) => {
          return a.price - b.price;
        });
      }

      if (sort === "highest-price") {
        tempProducts = products.slice().sort((a, b) => {
          return b.price - a.price;
        });
      }

      if (sort === "a-z") {
        tempProducts = products.slice().sort((a, b) => {
          return a.name.localeCompare(b.name);
        });
      }

      if (sort === "z-a") {
        tempProducts = products.slice().sort((a, b) => {
          return b.name.localeCompare(a.name);
        });
      }

      state.fiteredProducts = tempProducts;
    },
    SORT_BY_CATEGORY(state, action) {
      const { products, category } = action.payload;
      let tempProduct = [];
      if (category === "All") {
        tempProduct = products;
      } else {
        tempProduct = products.filter(
          (product) => product.category === category
        );
      }
      state.filteredProducts = tempProduct;
    },
  },
});

export const { FILTER_BY_SEARCH, SORT_PRODUCTS, SORT_BY_CATEGORY } =
  filterSlice.actions;

export const selectFilteredProducts = (state) => state.filter.filteredProducts;

export default filterSlice.reducer;
