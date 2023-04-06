import React from "react";

const ProductFilter = () => {
  return (
    <div className="w-full px-8">
      <p className="text-3xl font-medium w-full ">Categories</p>
      <div className="py-2 border-b-2 border-black w-full">
        <button className="text-[16px]">All</button>
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
