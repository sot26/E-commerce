import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  selectMaxPrice,
  selectMinPrice,
  selectProduct,
} from "../../../redux/slice/productSlice";
import {
  FILTER_BY_PRICE,
  SORT_BY_BRANDS,
  SORT_BY_CATEGORY,
} from "../../../redux/slice/filterSlice";

const ProductFilter = () => {
  const [category, setCategory] = useState("All");
  const [brand, setBrand] = useState("All");
  const [price, setPrice] = useState(3000);
  const [nav, setNav] = useState(false);

  const products = useSelector(selectProduct);
  const dispatch = useDispatch();

  function navClick() {
    setNav(!nav);
  }
  const minPrice = useSelector(selectMinPrice);
  const maxPrice = useSelector(selectMaxPrice);

  const allCategories = [
    "All",
    ...new Set(products.map((product) => product.category)),
  ];
  const allBrands = [
    "All",
    ...new Set(products.map((product) => product.brand)),
  ];
  console.log(allBrands);

  useEffect(() => {
    dispatch(SORT_BY_BRANDS({ products, brand }));
  }, [dispatch, brand, products]);

  useEffect(() => {
    dispatch(FILTER_BY_PRICE({ products, price }));
  }, [dispatch, price, products]);

  const filterProducts = (cat) => {
    setCategory(cat);
    dispatch(SORT_BY_CATEGORY({ products: products, category: cat }));
  };

  const clearFilters = () => {
    setCategory("All");
    setBrand("All");
    setPrice(3000);
  };
  return (
    <div className="w-full ">
      <div className="w-full">
        <p className="text-3xl font-medium w-full ">Categories</p>
        <div className="py-2 w-full flex items-start flex-col my-2">
          {allCategories.map((cat, index) => {
            return (
              <div className="w-full text-xl" key={index}>
                <button
                  key={index}
                  type="button"
                  className={
                    category === cat
                      ? "border-l-[3.5px] border-orange-500"
                      : null
                  }
                  onClick={() => filterProducts(cat)}
                >
                  &#8250; {cat}
                </button>
                <hr className="border-gray-400" />
              </div>
            );
          })}
        </div>
        <div className="py-2">
          <p className="text-3xl font-medium">Brand</p>
          <select
            value={brand}
            onChange={(e) => setBrand(e.target.value)}
            className="my-3 border-2 border-black w-full p-2 rounded-lg"
          >
            {allBrands.map((brand, index) => {
              return (
                <option value={brand} key={index}>
                  {brand}
                </option>
              );
            })}
          </select>
        </div>
        <div className="pb-2">
          <p className="text-3xl font-medium">Price</p>
          <p className="text-xl font-medium py-2">{`$${price}`}</p>
          <input
            type="range"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            min={minPrice}
            max={maxPrice}
          />
        </div>
        <div>
          <button
            onClick={clearFilters}
            className="w-[100px] text-white bg-orange-500 rounded-lg border-2 text-xl p-2 hover:translate-y-1 hover:duration-200"
          >
            Clear Filter
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductFilter;
