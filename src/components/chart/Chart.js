import React from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";
import { selectOrderHistory } from "../../redux/slice/orderSlice";
import { useSelector } from "react-redux";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export const options = {
  responsive: true,
  plugins: {
    legend: {
      position: "top",
    },
    title: {
      display: false,
      text: "Chart.js Bar Chart",
    },
  },
};

const Chart = () => {
  const orders = useSelector(selectOrderHistory);

  const array = [];

  orders.map((item) => {
    const { orderStatus } = item;
    array.push(orderStatus);
  });

  const getOrderCount = (arr, value) => {
    return arr.filter((n) => n === value).length;
  };

  const [q1, q2, q3, q4] = [
    "Order Placed...",
    "Processing...",
    "Shipped...",
    "Delivered",
  ];

  const placed = getOrderCount(array, q1);
  const Delivered = getOrderCount(array, q4);
  const shipped = getOrderCount(array, q3);
  const Processing = getOrderCount(array, q2);
  const labels = ["Order Placed", "Delivered", "Shipped", "Processing"];

  const data = {
    labels,
    datasets: [
      {
        label: "Order Count",
        data: [placed, Delivered, shipped, Processing],
        backgroundColor: "rgba(255, 99, 132, 0.5)",
      },
    ],
  };
  return (
    <div className="mt-8 max-w-[500px] h-auto shadow-xl rounded-xl border-[1px] border-b-2 border-b-orange-500">
      <div className="p-3">
        <p className="text-xl">Order Status Chart</p>
        <Bar options={options} data={data} />
      </div>
    </div>
  );
};

export default Chart;
