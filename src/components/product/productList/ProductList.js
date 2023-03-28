import React, { useState } from "react";
import { BsFillGridFill } from "react-icons/bs";
import { FaListAlt } from "react-icons/fa";

const ProductList = () => {
  const [grid, setGrid] = useState(true);
  return (
    <>
      <div className="w-full h-auto mb-2 flex justify-between text-xl shadow-lg">
        <div className="flex ">
          <BsFillGridFill
            className="mr-2"
            size={22}
            color="orangered"
            onClick={() => setGrid(true)}
          />
          <FaListAlt size={24} color="blue" onClick={() => setGrid(false)} />
          <p className=" px-3">
            <span className="font-bold">10</span> Products found
          </p>
        </div>
        <div>
          <p>search</p>
        </div>
        <div className="flex font-bold">
          <p>Sort by:</p>
          <select>
            <option value="latest">Latset</option>
            <option value="lowest-price">Lowest Price</option>
            <option value="highest-price">Highest Price</option>
            <option value="a-z">A-Z</option>
            <option value="z-a">Z-A</option>
          </select>
        </div>
      </div>
    </>
  );
};

export default ProductList;
