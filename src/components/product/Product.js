import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import useFetchCollection from "../../customHooks/useFetchCollection";
import { selectProduct, STORE_PRODUCTS } from "../../redux/slice/productSlice";
import ProductFilter from "./productFilter/ProductFilter";
import ProductList from "./productList/ProductList";
import spinnerImg from "../../assets/spinner.jpg";
import { Circles, ColorRing } from "react-loader-spinner";

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
    <div className="h-full w-full lg:px-[50px] pt-6">
      <div className="w-full flex">
        <div className="hidden md:flex md:w-[15%]">
          {isLoading ? null : <ProductFilter />}
        </div>
        <div className="w-full min-h-[100vh] mx-2  md:w-[85%] md:mx-9">
          {isLoading ? (
            <Circles
              height="80"
              width="80"
              color="#ffa500"
              ariaLabel="circles-loading"
              wrapperStyle={{}}
              wrapperClass=""
              visible={true}
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
