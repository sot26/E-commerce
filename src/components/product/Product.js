import React from "react";
import ProductFilter from "./productFilter/ProductFilter";
import ProductList from "./productList/ProductList";

const Product = () => {
  return (
    <div className="h-full w-full">
      <div className="w-full flex ">
        <div className="w-[20%]">
          <ProductFilter />
        </div>
        <div className="w-[80%]">
          <ProductList />
        </div>
      </div>
    </div>
  );
};

export default Product;
