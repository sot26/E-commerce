import React, { useEffect, useState } from "react";
import { BsFillGridFill } from "react-icons/bs";
import { FaListAlt } from "react-icons/fa";
import Search from "../../search/Search";
import ProductItem from "../productItem/ProductItem";
import { useDispatch, useSelector } from "react-redux";
import {
  FILTER_BY_SEARCH,
  selectFilteredProducts,
} from "../../../redux/slice/filterSlice";

const ProductList = ({ products }) => {
  const [grid, setGrid] = useState(true);
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("");
  const filteredProducts = useSelector(selectFilteredProducts);
  console.log(filteredProducts);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(FILTER_BY_SEARCH({ products: products, search: search }));
  }, [dispatch, search, products]);

  return (
    <div>
      <div className="w-full h-auto pb-2 mb-2 lg:flex justify-between items-center text-xl shadow-lg text-center">
        <div className="flex my-[10px] lg:my-0">
          <BsFillGridFill
            className="mr-2 cursor-pointer"
            size={22}
            color="orangered"
            onClick={() => setGrid(true)}
          />
          <FaListAlt
            className="cursor-pointer"
            size={24}
            color="blue"
            onClick={() => setGrid(false)}
          />
          <p className=" px-3">
            <span className="font-bold">{filteredProducts.length}</span>{" "}
            Products found
          </p>
        </div>
        <div className="my-[10px] lg:my-0">
          <Search value={search} onChange={(e) => setSearch(e.target.value)} />
        </div>
        <div className="flex my-[10px] lg:my-0">
          <p className="font-bold">Sort by:</p>
          <select value={sort} onChange={(e) => setSearch(e.target.value)}>
            <option value="latest">Latset</option>
            <option value="lowest-price">Lowest Price</option>
            <option value="highest-price">Highest Price</option>
            <option value="a-z">A-Z</option>
            <option value="z-a">Z-A</option>
          </select>
        </div>
      </div>
      <div
        className={
          grid
            ? "grid grid-cols-2 lg:grid-cols-3 gap-3 md:gap-8 xl:gap-20"
            : "block "
        }
      >
        {products.lenght === 0 ? (
          <p>No Product found</p>
        ) : (
          <>
            {filteredProducts.map((product) => {
              return (
                <div key={product.id}>
                  <ProductItem {...product} product={product} grid={grid} />
                </div>
              );
            })}
          </>
        )}
      </div>
    </div>
  );
};

export default ProductList;
