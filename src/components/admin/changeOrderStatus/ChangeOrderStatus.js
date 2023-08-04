import { Timestamp, collection, doc, setDoc } from "firebase/firestore";
import React, { useState } from "react";
import { Circles } from "react-loader-spinner";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { db } from "../../../firebase/config";

const ChangeOrderStatus = ({ order, id }) => {
  const [status, setStatus] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const editOrder = (e, id) => {
    e.preventDefault();
    setIsLoading(true);
    const orderConfig = {
      userID: order.userID,
      userEmail: order.userEmail,
      orderDate: order.orderDate,
      orderTime: order.orderTime,
      orderAmount: order.orderAmount,
      orderStatus: status,
      cartItems: order.cartItems,
      shippingAddress: order.shippingAddress,
      createdAt: order.createdAt,
      editedAt: Timestamp.now().toDate(),
    };

    try {
      setDoc(doc(db, "orders", id), orderConfig);
      toast.success("Order status changed successfully");
      setIsLoading(false);
      navigate("/admin/orders");
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <>
      {isLoading ? (
        <Circles
          height="80"
          width="80"
          color="#ffa500"
          ariaLabel="circles-loading"
          wrapperStyle={{}}
          wrapperClass=""
          visible={true}
        />
      ) : (
        <div className="border-[2px] border-blue-500 max-w-[300px] rounded-xl mt-4">
          <div className="p-2">
            <p>Update Order Status</p>
            <form onSubmit={(e) => editOrder(e, id)}>
              <select
                value={status}
                onChange={(e) => setStatus(e.target.value)}
                className="border-[1px] rounded-md border-black w-full"
              >
                <option disabled value="">
                  --select one--
                </option>
                <option value="Order Placed...">Order Placed...</option>
                <option value="Processing...">Processing...</option>
                <option value="Shipped...">Shipped...</option>
                <option value="Delivered">Delivered</option>
              </select>
              <button
                type="submit"
                className="p-2 mt-2 rounded-lg bg-blue-500 text-white"
              >
                Update Status
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default ChangeOrderStatus;
