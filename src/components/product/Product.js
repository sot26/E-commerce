import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import useFetchCollection from "../../customHooks/useFetchCollection";
import { selectProduct, STORE_PRODUCTS } from "../../redux/slice/productSlice";
import ProductFilter from "./productFilter/ProductFilter";
import ProductList from "./productList/ProductList";

const Product = () => {
  const { data } = useFetchCollection("products");
  const products = useSelector(selectProduct);
  console.log(products);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(
      STORE_PRODUCTS({
        products: data,
      })
    );
  }, [dispatch, data]);

  return (
    <div className="h-full w-full">
      <div className="w-full flex ">
        <div className="w-[20%]">
          <ProductFilter />
        </div>
        <div className="w-[80%]">
          <ProductList products={products} />
        </div>
      </div>
    </div>
  );
};

export default Product;
