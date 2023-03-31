import React from "react";
import { Link } from "react-router-dom";

const ProductItem = ({ id, name, imageURL, price, desc, grid, product }) => {
  return (
    <div className={grid ? "grid grid-col" : "block"}>
      <Link to={`/product-details/${id}`}>
        <div>
          <img className="w-[100px] h-auto" src={imageURL} alt={name} />
        </div>
      </Link>
      <div>
        <div>
          <p>{`$${price}`}</p>
          <p>{name}</p>
        </div>
      </div>
    </div>
  );
};

export default ProductItem;
