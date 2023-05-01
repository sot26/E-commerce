import React, { useEffect } from "react";
import Product from "../../components/product/Product";
import Slider from "../../components/slider/Slider";

const Home = () => {
  const url = window.location.href;

  const scrollToProduct = () => {
    if (url.includes("products")) {
      window.scrollTo({
        top: 610,
        behavior: "smooth",
      });
      return;
    }
  };

  useEffect(() => {
    scrollToProduct();
  }, []);

  return (
    <div className="mb-6">
      <Slider />
      <Product />
    </div>
  );
};

export default Home;
