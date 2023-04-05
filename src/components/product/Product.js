import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import useFetchCollection from "../../customHooks/useFetchCollection";
import { selectProduct, STORE_PRODUCTS } from "../../redux/slice/productSlice";
import ProductFilter from "./productFilter/ProductFilter";
import ProductList from "./productList/ProductList";
import spinnerImg from "../../assets/spinner.jpg";

const Product = () => {
  const { data, isLoading } = useFetchCollection("products");
  const products = useSelector(selectProduct);
  // console.log(products);

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
        <div className="hidden md:flex md:w-[30%]">
          {isLoading ? null : <ProductFilter />}
        </div>
        <div className="w-full min-h-[100vh] mx-2  md:w-[70%] md:mx-9">
          {isLoading ? (
            <img
              src={spinnerImg}
              alt="Loading..."
              className="w-[30%] h-[30%] flex justify-center items-center"
            />
          ) : (
            <ProductList products={products} />
          )}
        </div>
      </div>
    </div>
  );
};

export default Product;
