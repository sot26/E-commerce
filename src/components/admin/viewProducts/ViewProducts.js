import { deleteDoc, doc } from "firebase/firestore";
import { deleteObject, ref } from "firebase/storage";
import Notiflix from "notiflix";
import React, { useEffect, useState } from "react";
import { FaEdit, FaTrashAlt } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import useFetchCollection from "../../../customHooks/useFetchCollection";
import { db, storage } from "../../../firebase/config";
import {
  selectProduct,
  STORE_PRODUCTS,
} from "../../../redux/slice/productSlice";
import {
  FILTER_BY_SEARCH,
  selectFilteredProducts,
} from "../../../redux/slice/filterSlice";
import Search from "../../search/Search";
import Pagination from "../../pagination/Pagination";

const ViewProducts = () => {
  const [search, setSearch] = useState("");
  const { data } = useFetchCollection("products");
  const filteredProducts = useSelector(selectFilteredProducts);
  const products = useSelector(selectProduct);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(
      STORE_PRODUCTS({
        products: data,
      })
    );
  }, [dispatch, data]);
  useEffect(() => {
    dispatch(FILTER_BY_SEARCH({ products: products, search: search }));
  }, [dispatch, search, products]);

  //pagination
  const [currentPage, setCurrentPage] = useState(1);
  const [productsPerPage, setProductsPerPage] = useState(10);

  //get current product
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = filteredProducts.slice(
    indexOfFirstProduct,
    indexOfLastProduct
  );

  const confirmDelete = (id, imageURL) => {
    Notiflix.Confirm.show(
      "Delete Product??",
      "You are about to delete this product",
      "Confirm",
      "Cancle",
      function okCb() {
        deleteProduct(id, imageURL);
      },
      function cancelCb() {},
      {
        width: "320px",
        borderRadius: "8px",
        titleColor: "orangered",
        okButtonBackground: "orangered",
        cssAnimation: "zoom",
        // etc...
      }
    );
  };

  const deleteProduct = async (id, imageURL) => {
    try {
      await deleteDoc(doc(db, "products", id));
      const imageRef = ref(storage, imageURL);
      await deleteObject(imageRef);
      toast.success("Product deleted successfully");
    } catch (error) {
      toast.error(error.message);
    }
  };
  return (
    <div>
      <div className="w-full min-h-[85vh]">
        <div className="w-full text-center pt-4 md:pt-10 text-3xl pb-2 md:text-4xl font-semibold md:font-bold">
          All products
        </div>
        <div className="my-3">
          <p>
            <b>{filteredProducts.length}</b> Product(s) found
          </p>
          <Search value={search} onChange={(e) => setSearch(e.target.value)} />
        </div>
        <div>
          {filteredProducts.length === 0 ? (
            <p>No product found</p>
          ) : (
            <table className="w-full">
              <thead>
                <tr className="text-[10px] md:text-3xl font-bold border-t-[3px] border-b-[3px] border-blue-300">
                  <td className="border-r-2">s/n</td>
                  <td className="border-r-2">Image</td>
                  <td className="border-r-2">Product name</td>
                  <td className="border-r-2">Category</td>
                  <td className="border-r-2">Price</td>
                  <td className="border-r-2">Actions</td>
                </tr>
              </thead>
              {currentProducts.map((product, index) => {
                const { name, id, price, imageURL, category } = product;

                return (
                  <tbody key={id}>
                    <tr className="text-md sm:text-xl md:text-[20px] font-medium shadow-md">
                      <td className=" border-r-2">{index + 1}</td>
                      <td className="border-r-2">
                        <img
                          className="w-[80px] md:w-[100px] my-2"
                          src={imageURL}
                          alt={name}
                        />
                      </td>
                      <td className=" border-r-2">{name}</td>
                      <td className=" border-r-2">{category}</td>
                      <td className=" border-r-2">{`$${price}`}</td>
                      <td className="flex pt-8 md:pt-16">
                        <Link to={`/admin/add-product/${id}`}>
                          <FaEdit
                            color="green"
                            className="text-lg md:text-3xl cursor-pointer mr-2 md:mr-4"
                          />
                        </Link>
                        <FaTrashAlt
                          className="text-lg md:text-3xl cursor-pointer"
                          color="red"
                          onClick={() => confirmDelete(id, imageURL)}
                        />
                      </td>
                    </tr>
                  </tbody>
                );
              })}
            </table>
          )}
        </div>
      </div>
      <div className="my-4">
        <Pagination
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
          productsPerPage={productsPerPage}
          totalProducts={filteredProducts}
        />
      </div>
    </div>
  );
};

export default ViewProducts;
