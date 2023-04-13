import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectProduct } from "../../../redux/slice/productSlice";
import { SORT_BY_CATEGORY } from "../../../redux/slice/filterSlice";

const ProductFilter = () => {
  const [category, setCategory] = useState("All");
  const products = useSelector(selectProduct);
  const dispatch = useDispatch();

  const allCategories = [
    "All",
    ...new Set(products.map((product) => product.category)),
  ];

  const filterProducts = (cat) => {
    setCategory(cat);
    dispatch(SORT_BY_CATEGORY({ products: products, category: cat }));
  };

  return (
    <div className="w-full px-8">
      <p className="text-3xl font-medium w-full ">Categories</p>
      <div className="py-2 w-full flex items-start flex-col my-2">
        {allCategories.map((cat, index) => {
          return (
            <div className="w-full" key={index}>
              <button
                key={index}
                type="button"
                className={
                  category === cat ? "border-l-2 border-orange-500" : null
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
          name="brand"
          className="my-3 border-2 border-black w-full p-2 rounded-lg"
        >
          <option value="all">All</option>
        </select>
      </div>
      <div className="pb-2">
        <p className="text-3xl font-medium">Price</p>
        <p className="text-xl font-medium py-2">$1500</p>
        <input type="range" name="price" min="100" max="1000" />
      </div>
      <div>
        <button className="w-[100px] text-white bg-orange-500 rounded-lg border-2 text-xl p-2 hover:translate-y-1 hover:duration-200">
          Clear Filter
        </button>
      </div>
    </div>
  );
};

export default ProductFilter;
