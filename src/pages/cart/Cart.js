import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  ADD_TO_CART,
  CALCULATE_SUBTOTAL,
  CART_TOTAL_QUANTITY,
  CLEAR_CART,
  DECREASE_CART,
  REMOVE_FROM_CART,
  SAVE_URL,
  selectCartItems,
  selectCartTotalAmount,
  selectCartTotalQuantity,
} from "../../redux/slice/cartSlice";
import { Link, useNavigate } from "react-router-dom";
import { FaTrashAlt } from "react-icons/fa";
import { selectIsLoggedIn } from "../../redux/slice/authSlice";
import { toast } from "react-toastify";

const Cart = () => {
  const cartItems = useSelector(selectCartItems);
  const cartTotalAmount = useSelector(selectCartTotalAmount);
  const cartTotalQuantity = useSelector(selectCartTotalQuantity);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isLoggedIn = useSelector(selectIsLoggedIn);

  const increaseCart = (cart) => {
    dispatch(ADD_TO_CART(cart));
  };
  const decreaseCart = (cart) => {
    dispatch(DECREASE_CART(cart));
  };

  const removeFromCart = (cart) => {
    dispatch(REMOVE_FROM_CART(cart));
  };
  const clearCart = () => {
    dispatch(CLEAR_CART());
  };

  useEffect(() => {
    dispatch(CALCULATE_SUBTOTAL());
    dispatch(CART_TOTAL_QUANTITY());
    dispatch(SAVE_URL(""));
    window.scrollTo(0, 0);
  }, [dispatch, cartItems]);

  const url = window.location.href;

  const checkOut = () => {
    if (isLoggedIn === true) {
      navigate("/checkout-details");
    } else {
      toast.error("Login to continue");
      dispatch(SAVE_URL(url));
      navigate("/login");
    }
  };

  return (
    <div className="w-full min-h-[100vh]">
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
                  <tr
                    key={id}
                    className="text-[12px] md:text-3xl border-b-2 h-full"
                  >
                    <td className="border-x-2 text-[12px] md:text-2xl font-semibold">
                      {index + 1}
                    </td>
                    <td className="border-r-2 text-[12px] md:text-2xl font-semibold">
                      <p className="pt-2 md:ml-4">{name}</p>
                      <img
                        className="w-auto h-auto md:w-[180px] md:ml-4"
                        src={imageURL}
                        alt="product "
                      />
                    </td>
                    <td className="border-r-2 text-[12px] md:text-2xl font-semibold  h-full">
                      ${price}
                    </td>
                    <td className="border-r-2 text-[12px] md:text-2xl font-semibold ">
                      <div className="flex items-center text-xl mx-[3px]">
                        <button
                          className="p-1 bg-gray-200"
                          onClick={() => decreaseCart(cart)}
                        >
                          -
                        </button>
                        <p className="mx-1 font-semibold text-[12px] md:text-2xl">
                          {cartQuantity}
                        </p>
                        <button
                          className="p-1 bg-gray-200"
                          onClick={() => increaseCart(cart)}
                        >
                          +
                        </button>
                      </div>
                    </td>
                    <td className="border-r-2 text-[12px] md:text-2xl font-semibold">
                      ${(price * cartQuantity).toFixed(2)}
                    </td>
                    <td className="border-r-2 text-[12px] md:text-2xl font-semibold">
                      <FaTrashAlt
                        onClick={() => removeFromCart(cart)}
                        size={19}
                        color="orangered"
                        className="cursor-pointer"
                      />
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        )}

        <div className="w-full relative">
          <div className="w-full flex justify-between mt-2">
            {cartItems.length === 0 ? null : (
              <div>
                <button
                  onClick={clearCart}
                  className="py-[7px]  px-[12px] md:py-3 md:px-5 text-white text-[12px] md:text-xl bg-black rounded-lg"
                >
                  Clear cart
                </button>
                <div className="text-sm my-[4px] md:text-2xl font-medium">
                  <Link to="/#products">&larr; Continue shopping</Link>
                </div>
              </div>
            )}
          </div>

          {cartItems.length === 0 ? null : (
            <div className="flex md:flex-row-reverse mt-3 ">
              <div className="w-full max-w-[300px] p-2 md:p-4 shadow-2xl rounded-2xl">
                <p className="text-sm sm:text-lg md:text-xl font-semibold">{`Cart item(s): ${cartTotalQuantity}`}</p>
                <div className="flex justify-between my-2">
                  <p className="text-lg sm:text-2xl md:text-3xl font-semibold">
                    Subtotal
                  </p>
                  <p className="text-lg sm:text-2xl text-orange-500 md:text-3xl font-semibold">{`$${cartTotalAmount.toFixed(
                    2
                  )}`}</p>
                </div>
                <p className="text-[10px] sm:text-[15px] md:text-lg mb-2">
                  Taxes and shipping calculated at checkout
                </p>
                <button
                  onClick={checkOut}
                  className="p-2 md:p-3 text-white text-sm sm:text-lg md:text-xl bg-blue-600 rounded-lg w-full"
                >
                  Checkout
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Cart;
