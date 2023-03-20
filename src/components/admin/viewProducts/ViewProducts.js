import { collection, onSnapshot, orderBy, query } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { FaEdit, FaTrashAlt } from "react-icons/fa";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { db } from "../../../firebase/config";

const ViewProducts = () => {
  const [products, setProducts] = useState([]);

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
        console.log(allProduct);
      });
    } catch (error) {
      toast.error(error.message);
    }
  };
  return (
    <div>
      <div className="w-full min-h-[85vh]">
        <div className="w-full text-center pt-10 text-4xl font-bold">
          View products
        </div>
        <div>
          {products.length === 0 ? (
            <p>No product found</p>
          ) : (
            <table className="w-full mx-2">
              <thead>
                <tr className="text-3xl font-medium border-t-[3px] border-b-[3px] border-blue-300">
                  <td className="border-r-2">s/n</td>
                  <td className="border-r-2">Image</td>
                  <td className="border-r-2">Product name</td>
                  <td className="border-r-2">Category</td>
                  <td className="border-r-2">Price</td>
                  <td className="border-r-2">Actions</td>
                </tr>
              </thead>
              {products.map((product, index) => {
                const { name, price, imageURL, category } = product;

                return (
                  <tbody key={index}>
                    <tr className="text-xl font-medium shadow-md">
                      <td>{index + 1}</td>
                      <td>
                        <img
                          className="h-[100px] w-auto my-2"
                          src={imageURL}
                          alt={name}
                        />
                      </td>
                      <td>{name}</td>
                      <td>{category}</td>
                      <td>{`$${price}`}</td>
                      <td className="flex pt-16">
                        <Link to="/admin/add-product">
                          <FaEdit color="green" className="mr-4" size={20} />
                        </Link>
                        <FaTrashAlt color="red" size={20} />
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
