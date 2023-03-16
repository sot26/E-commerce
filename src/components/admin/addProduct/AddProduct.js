import React, { useState } from "react";

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
    price: null,
    category: "",
    brand: "",
    desc: "",
  });

  const handleInputChange = (e) => {};
  const handleImageChange = (e) => {};
  return (
    <div className="px-[40px] max-w-[800px]">
      <div>
        <p className="py-5 text-3xl text-center font-semibold">
          Add New Product
        </p>
      </div>
      <form className=" ">
        <div className="py-2">
          <p className="text-2xl pb-2">Product Name</p>
          <input
            className="border-[3px] rounded-xl w-full p-3 h-[40px]"
            type="text"
            required
            name="name"
            placeholder="Product Name"
            value={product.name}
            onChange={(e) => handleInputChange(e.target.value)}
          />
        </div>
        <div>
          <p>Product Image:</p>
          <input
            className="border-[3px] rounded-xl w-full p-3 h-[40px]"
            type="file"
            accept="image/*"
            required
            name="image"
            placeholder="Product Image"
            value={product.imageURL}
            onChange={(e) => handleInputChange(e.target.value)}
          />
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
            onChange={(e) => handleInputChange(e.target.value)}
          />
        </div>
        <div className="py-2">
          <p className="text-2xl pb-2">Product Category</p>
          <select
            className="border-[3px] rounded-xl w-full p-3 h-[40px]"
            required
            name="category"
            value={product.category}
            onChange={(e) => handleInputChange(e.target.value)}
          >
            <option disabled className="text-xl">
              -- Choose product category --
            </option>
            {categories.map((category) => {
              return (
                <option
                  className="text-xl"
                  value={category.name}
                  key={category.key}
                >
                  {category.name}
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
            onChange={(e) => handleInputChange(e.target.value)}
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
            onChange={(e) => handleInputChange(e.target.value)}
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
