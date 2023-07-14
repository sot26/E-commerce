import { doc, getDoc } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { db } from "../../../firebase/config";
import { toast } from "react-toastify";
import { Circles } from "react-loader-spinner";
import { useDispatch, useSelector } from "react-redux";
import {
  ADD_TO_CART,
  CART_TOTAL_QUANTITY,
  DECREASE_CART,
  selectCartItems,
} from "../../../redux/slice/cartSlice";
import useFetchDocument from "../../../customHooks/useFetchDocument";

const ProductDetails = () => {
  const { id } = useParams();
  const [product, setProduct] = useState([]);
  const dispatch = useDispatch();
  const cartItems = useSelector(selectCartItems);
  const { document } = useFetchDocument("products", id);

  const cart = cartItems.find((cart) => cart.id === id);
  const isCartAdded = cartItems.findIndex((cart) => {
    return cart.id === id;
  });

  useEffect(() => {
    setProduct(document);
  }, [document]);

  const addToCart = (product) => {
    dispatch(ADD_TO_CART(product));
    dispatch(CART_TOTAL_QUANTITY());
  };

  const decreaseCart = (product) => {
    dispatch(DECREASE_CART(product));
    dispatch(CART_TOTAL_QUANTITY());
  };

  return (
    <div className="w-ful h-full mx-1 mb-4 md:mx-24 min-h-[90vh]">
      <div>
        <p className="text-3xl md:text-4xl mt-3 ">Product Details</p>
        <Link to="/#products">
          <p className="text-lg my-4 md:text-2xl">&larr; Back to Products</p>
        </Link>
      </div>
      {product === null ? (
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
        <div className="md:flex">
          <img
            src={product.imageURL}
            alt={product.name}
            className="border-2 min-h-[400px] max-h-[500px] w-auto"
          />
          <div className="px-3">
            <p className="md:text-4xl text-2xl font-semibold">{product.name}</p>
            <p className="md:mt-4 mt-2 md:text-2xl text-xl font-semibold text-orange-600">
              ${product.price}
            </p>
            <p className="md:mt-4 mt-2 text-[12px] md:text-[16px]">
              {product.desc}
            </p>
            <p className="md:mt-4 mt-2 text-[13px] md:text-2xl ">
              <b>SKU:</b> {product.id}
            </p>
            <p className="md:mt-4 mt-2 text-[13px] md:text-2xl ">
              <b>Brand:</b> {product.brand}
            </p>
            {isCartAdded < 0 ? null : (
              <div className="flex items-center text-xl ">
                <button
                  onClick={() => decreaseCart(product)}
                  className="p-1 bg-gray-200"
                >
                  -
                </button>
                <p className="mx-1 font-semibold ">{cart.cartQuantity}</p>
                <button
                  onClick={() => addToCart(product)}
                  className="p-1 bg-gray-200"
                >
                  +
                </button>
              </div>
            )}
            <button
              onClick={() => addToCart(product)}
              className="md:mt-4 mt-2 md:py-2 px-4 h-[25px] md:h-[45px] md:text-xl text-white bg-orange-500 rounded-lg md:rounded-xl"
            >
              ADD TO CART
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductDetails;
