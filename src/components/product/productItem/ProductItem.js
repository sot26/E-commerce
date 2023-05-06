import React from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { ADD_TO_CART } from "../../../redux/slice/cartSlice";

const ProductItem = ({ id, name, imageURL, price, desc, grid, product }) => {
  const dispatch = useDispatch();
  const shortenText = (text, n) => {
    if (text.length > n) {
      const shortenedText = text.substring(0, n).concat("....");
      return shortenedText;
    }
    return text;
  };

  const addToCart = (product) => {
    dispatch(ADD_TO_CART(product));
  };
  return (
    <div
      className={grid ? "w-full grid grid-col my-3" : "block my-5 shadow-lg"}
    >
      <div
        className={
          grid
            ? "flex flex-col rounded-2xl shadow-xl items-center justify-center text-center "
            : "flex "
        }
      >
        <Link to={`/product-details/${id}`}>
          <div
            className={
              grid
                ? "h-auto"
                : " w-[150px] sm:w-[200px] md:w-[300px]  h-full border-r-2 p-4"
            }
          >
            <img
              className=" xxs:h-[130px] h-[130px] min-w-[120px] md:h-[200px] w-auto"
              src={imageURL}
              alt={name}
            />
          </div>
        </Link>
        <div className={grid ? "w-full" : "flex flex-col justify-between"}>
          <div className={grid ? "my-4" : "pl-2"}>
            <p className="text-lg md:text-2xl text-orange-500 font-bold">{`$${price}`}</p>
            <p className="xxs:text-[12px] text-[15px] md:text-[16px] lg:text-[19px] xl:text-3xl font-semibold">
              {shortenText(name, 18)}
            </p>

            {!grid && (
              <p className="text-[10px] md:text-xl">{shortenText(desc, 200)}</p>
            )}
          </div>
          <div className="w-full text-white text-[12px] md:text-2xl ">
            <button
              onClick={() => addToCart(product)}
              className={
                grid
                  ? "w-full bg-orange-500 h-[29px] md:h-[35px] rounded-lg md:rounded-xl hover:translate-y-1 hover:duration-200"
                  : "w-[100px] md:w-[180px] bg-orange-500 rounded-lg md:rounded-xl h-[29px] md:h-[35px] mb-2 ml-2 hover:translate-y-1 hover:duration-200"
              }
            >
              Add to cart
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductItem;
