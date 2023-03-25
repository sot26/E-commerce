import {
  collection,
  deleteDoc,
  doc,
  onSnapshot,
  orderBy,
  query,
} from "firebase/firestore";
import { deleteObject, ref } from "firebase/storage";
import Notiflix from "notiflix";
import React, { useEffect, useState } from "react";
import { FaEdit, FaTrashAlt } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { db, storage } from "../../../firebase/config";
import { STORE_PRODUCTS } from "../../../redux/slice/productSlice";

const ViewProducts = () => {
  const [products, setProducts] = useState([]);
  const dispatch = useDispatch();
  useEffect(() => {
    getProduct();
  }, []);

  const getProduct = () => {
    try {
      const productsRef = collection(db, "products");
      const q = query(productsRef, orderBy("createdAt", "desc"));

      onSnapshot(q, (querySnapshot) => {
        const allProduct = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setProducts(allProduct);
        // console.log(allProduct);
        dispatch(
          STORE_PRODUCTS({
            products: allProduct,
          })
        );
      });
    } catch (error) {
      toast.error(error.message);
    }
  };

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
          View products
        </div>
        <div>
          {products.length === 0 ? (
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
              {products.map((product, index) => {
                const { name, id, price, imageURL, category } = product;

                return (
                  <tbody key={id}>
                    <tr className="text-md sm:text-xl md:text-[20px] font-medium shadow-md">
                      <td className=" border-r-2">{index + 1}</td>
                      <td className="border-r-2">
                        <img
                          className="w-[80px] md:w-[100px] w-auto my-2"
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
    </div>
  );
};

export default ViewProducts;
