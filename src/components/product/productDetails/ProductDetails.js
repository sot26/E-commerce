import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { Circles } from "react-loader-spinner";
import { useDispatch, useSelector } from "react-redux";
import {
  ADD_TO_CART,
  CART_TOTAL_QUANTITY,
  DECREASE_CART,
  selectCartItems,
} from "../../../redux/slice/cartSlice";
import useFetchDocument from "../../../customHooks/useFetchDocument";
import useFetchCollection from "../../../customHooks/useFetchCollection";
import StarsRating from "react-star-rate";

const ProductDetails = () => {
  const { id } = useParams();
  const [product, setProduct] = useState([]);
  const dispatch = useDispatch();
  const cartItems = useSelector(selectCartItems);
  const { document } = useFetchDocument("products", id);
  const { data } = useFetchCollection("reviews");
  const filteredReview = data.filter((review) => review.productID === id);

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
        <div className="lg:flex">
          <img
            src={product.imageURL}
            alt={product.name}
            className="border-2  min-h-[200px] max-h-[300px] lg:min-h-[400px] lg:max-h-[500px] w-auto"
          />
          <div className="px-3">
            <p className="md:text-4xl text-2xl font-semibold">{product.name}</p>
            <p className="md:mt-4 mt-2 md:text-2xl text-xl font-semibold text-black">
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
                  className="px-1 bg-gray-200"
                >
                  -
                </button>
                <p className="mx-2 font-semibold ">{cart.cartQuantity}</p>
                <button
                  onClick={() => addToCart(product)}
                  className="px-1 bg-gray-200"
                >
                  +
                </button>
              </div>
            )}
            <button
              onClick={() => addToCart(product)}
              className="p-2 md:mt-4 mt-2 md:py-2 px-4  md:h-[45px] text-sm md:text-xl text-white bg-black rounded-lg md:rounded-xl"
            >
              Add to cart
            </button>
          </div>
        </div>
      )}
      <div className="w-fll">
        {filteredReview.length === 0 ? (
          <p className="mt-4">No review for this project yet</p>
        ) : (
          <div>
            {filteredReview.map((review, index) => {
              return (
                <div
                  key={index}
                  className="mt-4 p-3 max-w-[600px] shadow-xl rounded-lg"
                >
                  <div>
                    <p className="text-xl lg:text-2xl border-b-[2px]">
                      Product Review
                    </p>
                    <div>
                      <StarsRating disabled value={review.rate} />
                    </div>
                    <p className="text-lg mb-2">{review.review}</p>
                    <p className="text-sm font-semibold">{review.reviewDate}</p>
                    <p className="text-sm font-semibold">
                      By: {review.userName}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductDetails;
