import React from "react";
import { Link } from "react-router-dom";

const ProductItem = ({ id, name, imageURL, price, desc, grid, product }) => {
  const shortenText = (text, n) => {
    if (text.length > n) {
      const shortenedText = text.substring(0, n).concat("...");
      return shortenedText;
    }
    return text;
  };
  return (
    <div className={grid ? "grid grid-col" : "block my-5 shadow-lg"}>
      <div
        className={
          grid
            ? "flex flex-col rounded-2xl shadow-lg items-center justify-center text-center "
            : "flex "
        }
      >
        <Link to={`/product-details/${id}`}>
          <div
            className={grid ? "h-[200px]" : "w-[300px] h-auto border-r-2 p-4"}
          >
            <img className="h-[200px] w-auto" src={imageURL} alt={name} />
          </div>
        </Link>
        <div className={grid ? "w-full" : "flex flex-col justify-between"}>
          <div className={grid ? "my-4" : "pl-2"}>
            <p className="text-2xl text-orange-500 font-bold">{`$${price}`}</p>
            <p className="text-3xl font-semibold">{shortenText(name, 18)}</p>
            {!grid && <p className="text-xl">{shortenText(desc, 200)}</p>}
          </div>
          <div className="w-full text-white text-2xl ">
            <button
              className={
                grid
                  ? "w-full bg-orange-500 h-[35px] rounded-xl"
                  : "w-[180px] bg-orange-500 rounded-xl h-[35px] mb-2 ml-2"
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
