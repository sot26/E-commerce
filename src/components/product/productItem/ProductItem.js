import React from "react";
import { Link } from "react-router-dom";

const ProductItem = ({ id, name, imageURL, price, desc, grid, product }) => {
  const shortenText = (text, n) => {
    if (text.length > n) {
      const shortenedText = text.substring(0, 15).concat("...");
      return shortenedText;
    }
    return text;
  };
  return (
    <div className={grid ? "grid grid-col" : "block"}>
      <div
        className={
          grid
            ? "flex flex-col rounded-2xl shadow-lg items-center justify-center text-center "
            : "flex "
        }
      >
        <Link to={`/product-details/${id}`}>
          <div className={grid ? "h-[200px]" : "w-[300px] h-auto border-r-2"}>
            <img className="h-[200px] w-auto" src={imageURL} alt={name} />
          </div>
        </Link>
        <div className="my-4">
          <p className="text-2xl text-orange-500 font-bold">{`$${price}`}</p>
          <p className="text-3xl font-semibold">{shortenText(name, 18)}</p>
          {grid ? null : <p className="text-xl">{shortenText(desc, 500)}</p>}
        </div>
      </div>
    </div>
  );
};

export default ProductItem;
