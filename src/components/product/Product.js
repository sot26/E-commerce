import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import useFetchCollection from "../../customHooks/useFetchCollection";
import {
  GET_PRICE_RANGE,
  selectProduct,
  STORE_PRODUCTS,
} from "../../redux/slice/productSlice";
import ProductFilter from "./productFilter/ProductFilter";
import ProductList from "./productList/ProductList";
import { RotatingLines } from "react-loader-spinner";
import { FaCogs } from "react-icons/fa";

const Product = () => {
  const { data, isLoading } = useFetchCollection("products");
  const [showFilter, setShowFilter] = useState(false);
  const products = useSelector(selectProduct);
  // console.log(products);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(
      STORE_PRODUCTS({
        products: data,
      })
    );
    dispatch(
      GET_PRICE_RANGE({
        products: data,
      })
    );
  }, [dispatch, data]);

  const toggleFilter = () => {
    setShowFilter(!showFilter);
  };
  return (
    <div className="h-full w-full lg:px-[50px] pt-6">
      <div className="w-full flex relative">
        <div
          className={
            showFilter
              ? "absolute w-[50%] h-[60vh] px-2 shadow-xl  flex md:w-[15%]"
              : "hidden md:flex md:w-[15%]"
          }
        >
          {isLoading ? null : <ProductFilter />}
        </div>
        <div className="w-full h-full min-h-[100vh] mx-2  md:w-[85%] md:mx-9">
          {isLoading ? (
            <div className="w-full min-h-[100vh] flex justify-center items-center  md:ml-[-250px]">
              <RotatingLines
                strokeColor="orange"
                strokeWidth="5"
                animationDuration="0.75"
                width="150"
                visible={true}
                className="flex justify-center items-center"
              />
            </div>
          ) : (
            <ProductList products={products} />
          )}

          <div
            className="absolute top-8 cursor-pointer right-4 md:hidden flex"
            onClick={toggleFilter}
          >
            <FaCogs size={20} color="orangered" />
            <p>
              <b>{showFilter ? "Hide Filter" : "Show Filter"}</b>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Product;
