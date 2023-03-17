import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import React, { useState } from "react";
import { toast } from "react-toastify";
import { storage } from "../../../firebase/config";

const AddProduct = () => {
  const categories = [
    { id: 1, name: "Laptop" },
    { id: 2, name: "Electronics" },
    { id: 3, name: "Fashion" },
    { id: 4, name: "Phone" },
  ];
  const [product, setProduct] = useState({
    name: "",
    imageURL: "",
    price: 0,
    category: "",
    brand: "",
    desc: "",
  });

  const [uploadProgress, setUploadProgress] = useState(0);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProduct({ ...product, [name]: value });
    console.log(handleImageChange);
  };
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    // console.log(file);
    const storageRef = ref(storage, `sot-shop/${Date.now()} ${file.name}`);

    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setUploadProgress(progress);
      },
      (error) => {
        toast.error(error.message);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          setProduct({ ...product, imageURL: downloadURL });
          toast.success("image uploaded successfully");
        });
      }
    );
  };

  const addProduct = (e) => {
    e.preventDefault();
    console.log(product);
  };

  return (
    <div className="px-[40px] pb-[40px]  max-w-[800px]">
      <div>
        <p className="py-5 text-3xl text-center font-semibold">
          Add New Product
        </p>
      </div>
      <form onSubmit={addProduct}>
        <div className="py-2 ">
          <p className="text-2xl pb-2">Product Name</p>
          <input
            className="border-[3px] rounded-xl w-full p-3 h-[40px]"
            type="text"
            required
            name="name"
            placeholder="Product Name"
            value={product.name}
            onChange={(e) => handleInputChange(e)}
          />
        </div>
        <div>
          <p>Product Image:</p>
          <div className="group w-full border-2 rounded-2xl">
            {uploadProgress === 0 ? null : (
              <div className="w-full bg-gray-200 rounded-full dark:bg-gray-700 my-3">
                <div
                  className="bg-blue-600 text-lg font-medium text-blue-100 text-center p-0.5 leading-none rounded-full h-7"
                  style={{ width: `${uploadProgress}%` }}
                >
                  {uploadProgress < 100
                    ? `uploading ${uploadProgress}%`
                    : `upload complete ${uploadProgress}%`}
                </div>
              </div>
            )}

            <input
              className="border-[3px] rounded-xl w-full py-3 h-[40px]"
              type="file"
              accept="image/*"
              name="image"
              placeholder="Product Image"
              onChange={(e) => handleImageChange(e)}
            />

            {product.imageURL === "" ? null : (
              <input
                type="text"
                // required
                placeholder="Image URL"
                name="imageURL"
                value={product.imageURL}
                disabled
                className="border-[3px] rounded-xl w-full my-2 p-3 h-[30px]"
              />
            )}
          </div>
        </div>
        <div className="py-2">
          <p className="text-2xl pb-2">Product Price</p>
          <input
            className="border-[3px] rounded-xl w-full p-3 h-[40px]"
            type="number"
            required
            name="price"
            placeholder="Product Price"
            value={product.price}
            onChange={(e) => handleInputChange(e)}
          />
        </div>
        <div className="py-2">
          <p className="text-2xl pb-2">Product Category</p>
          <select
            className="border-[3px] rounded-xl w-full p-3 h-[40px]"
            required
            name="category"
            value={product.category}
            onChange={(e) => handleInputChange(e)}
          >
            <option disabled className="text-xl">
              -- Choose product category --
            </option>
            {categories.map((cat) => {
              return (
                <option className="text-xl" value={cat.name} key={cat.id}>
                  {cat.name}
                </option>
              );
            })}
          </select>
        </div>
        <div className="py-2">
          <p className="text-2xl pb-2">Product Company/Brand</p>
          <input
            className="border-[3px] rounded-xl w-full p-3 h-[40px]"
            type="text"
            required
            name="brand"
            placeholder="Product Brand"
            value={product.brand}
            onChange={(e) => handleInputChange(e)}
          />
        </div>
        <div className="py-2">
          <p className="text-2xl pb-2">Product Description</p>
          <textarea
            className="border-[3px] rounded-xl w-full p-3 h-[150px]"
            type="text"
            required
            name="desc"
            placeholder="Product Description"
            value={product.desc}
            onChange={(e) => handleInputChange(e)}
          />
        </div>
        <button className="p-3 text-white text-xl bg-blue-700 rounded-lg">
          Save Product
        </button>
      </form>
    </div>
  );
};

export default AddProduct;
