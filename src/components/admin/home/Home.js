import React, { useEffect } from "react";
import InfoBox from "../../InfoBox/InfoBox";
import { RiMoneyDollarCircleFill } from "react-icons/ri";
import { BsCart4 } from "react-icons/bs";
import { FaCartArrowDown } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import {
  STORE_PRODUCTS,
  selectProduct,
} from "../../../redux/slice/productSlice";
import {
  CALC_TOTAL_ORDER_AMOUNT,
  STORE_ORDERS,
  selectOrderHistory,
  selectTotalOrderAmount,
} from "../../../redux/slice/orderSlice";
import useFetchCollection from "../../../customHooks/useFetchCollection";

const Home = () => {
  const products = useSelector(selectProduct);
  const orders = useSelector(selectOrderHistory);
  const totalOrderAmount = useSelector(selectTotalOrderAmount);

  const fbProducts = useFetchCollection("products");
  const { data } = useFetchCollection("orders");
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(
      STORE_PRODUCTS({
        products: fbProducts.data,
      })
    );
    dispatch(STORE_ORDERS(data));

    dispatch(CALC_TOTAL_ORDER_AMOUNT());
  }, [dispatch, data, fbProducts]);

  return (
    <div className="w-full h-full p-[40px]">
      <p className="text-3xl mb-6">Admin Home</p>
      <div className="flex gap-6 flex-wrap">
        <InfoBox
          className={"border-b-2 p-2 rounded-lg border-purple-500"}
          title="Earnings"
          count={`$${totalOrderAmount}`}
          icon={<RiMoneyDollarCircleFill size={30} />}
          iconClassName="text-purple-500"
        />
        <InfoBox
          className={"border-b-2 p-2 rounded-lg border-blue-500"}
          title="Products"
          count={products.length}
          icon={<BsCart4 size={30} />}
          iconClassName="text-blue-500"
        />
        <InfoBox
          className={"border-b-2 p-2 rounded-lg border-orange-500"}
          title="Orders"
          count={orders.length}
          icon={<FaCartArrowDown size={30} />}
          iconClassName="text-orange-500"
        />
      </div>
    </div>
  );
};

export default Home;
