import React from "react";
import { useSelector } from "react-redux";
import {
  selectCartItems,
  selectCartTotalAmount,
  selectCartTotalQuantity,
} from "../../redux/slice/cartSlice";
import { Link } from "react-router-dom";
import { FaTrashAlt } from "react-icons/fa";

const Cart = () => {
  const cartItems = useSelector(selectCartItems);
  const cartTotalAmount = useSelector(selectCartTotalAmount);
  const cartTotalQuantity = useSelector(selectCartTotalQuantity);

  console.log(cartTotalQuantity);

  // const clearCart = () => {
  //   cartItems(localStorage.clear());
  //   cartTotalAmount(0);
  //   cartTotalQuantity(0);
  // };
  return (
    <div className="w-full">
      <div className="w-full px-2 md:px-12">
        <p className="text-3xl md:text-6xl py-6 font-semibold">Shopping Cart</p>
        {cartItems.length === 0 ? (
          <>
            <p className="text-2xl font-medium py-2">
              Your cart is currently empty.
            </p>
            <Link to="/#products" className="text-2xl font-medium py-2">
              &larr; Continue shopping
            </Link>
          </>
        ) : (
          <table className="w-full">
            <thead>
              <tr className="text-[12px] md:text-3xl font-bold border-[3px] border-blue-300">
                <td className="border-r-2 border-l-2">s/n</td>
                <td className="border-r-2">Product</td>
                <td className="border-r-2">Price</td>
                <td className="border-r-2">Quantity</td>
                <td className="border-r-2">Total</td>
                <td className="border-r-2 ">Actions</td>
              </tr>
            </thead>
            <tbody>
              {cartItems.map((cart, index) => {
                const { id, name, price, imageURL, cartQuantity } = cart;
                return (
                  <tr key={id} className="text-[12px] md:text-3xl border-b-2">
                    <td className="border-r-2 text-[12px] md:text-2xl font-semibold">
                      {index + 1}
                    </td>
                    <td className="border-r-2 text-[12px] md:text-2xl font-semibold">
                      <p className="pt-2 md:ml-4">{name}</p>
                      <img
                        className="w-[80px] md:w-[180px] ml-2 md:ml-4"
                        src={imageURL}
                        alt="product image"
                      />
                    </td>
                    <td className="border-r-2 text-[12px] md:text-2xl font-semibold">
                      ${price}
                    </td>
                    <td className="border-r-2 text-[12px] md:text-2xl font-semibold ">
                      <div className="flex items-center text-xl mx-[3px]">
                        <button className="p-1 bg-gray-200">-</button>
                        <p className="mx-1 font-semibold text-[12px] md:text-2xl">
                          {cartQuantity}
                        </p>
                        <button className="p-1 bg-gray-200">+</button>
                      </div>
                    </td>
                    <td className="border-r-2 text-[12px] md:text-2xl font-semibold">
                      ${(price * cartQuantity).toFixed(2)}
                    </td>
                    <td className="border-r-2 text-[12px] md:text-2xl font-semibold">
                      <FaTrashAlt size={19} color="orangered" />
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        )}

        <div className="w-full relative">
          <div className="w-full flex justify-between mt-2">
            <button className="py-[5px]  px-[7px] md:py-3 md:px-5 text-white text-[12px] md:text-xl bg-orange-600 rounded-lg">
              Clear cart
            </button>
            <div className="text-xl md:text-2xl font-medium">
              <Link to="/#products">&larr; Continue shopping</Link>
            </div>
          </div>
          <div className="flex md:flex-row-reverse ">
            <div className="w-full max-w-[300px] p-4 shadow-2xl rounded-2xl">
              <p className="text-xl">{`Cart item(s): ${cartTotalQuantity.length}`}</p>
              <div className="flex justify-between my-2">
                <p className="text-3xl font-semibold">Subtotal</p>
                <p className="text-3xl font-semibold">{`$${cartTotalAmount.toFixed(
                  2
                )}`}</p>
              </div>
              <p className="text-lg mb-2">
                Taxes and shipping calculated at checkout
              </p>
              <button className="p-3 text-white text-lg md:text-xl bg-blue-600 rounded-lg w-full">
                Checkout
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
