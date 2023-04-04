import React, { useEffect, useState } from "react";
import { BsChevronCompactLeft, BsChevronCompactRight } from "react-icons/bs";
import { RxDotFilled } from "react-icons/rx";

const Slider = () => {
  const slides = [
    {
      url: "https://i.ibb.co/CBGRLhG/bg-4.jpg",
      heading: "Shoes Villa",
      desc: "Up to 30% off on all onsale proucts.",
    },
    {
      url: "https://i.ibb.co/cDLBk5h/bg-1.jpg",
      heading: "Women Fashion",
      desc: "Up to 30% off on all onsale proucts.",
    },
    {
      url: "https://i.ibb.co/HXjD3V0/bg-2.jpg",
      heading: "Men Fashion",
      desc: "Up to 30% off on all onsale proucts.",
    },
    {
      url: "https://i.ibb.co/H2FRmtV/bg-3.jpg",
      heading: "Awesome Gadgets",
      desc: "Up to 30% off on all onsale proucts.",
    },
  ];

  const [currentSlide, setCurrentSlide] = useState(0);

  const prevSlide = () => {
    const isFirstSlide = currentSlide === 0;
    const newSlide = isFirstSlide ? slides.length - 1 : currentSlide - 1;
    setCurrentSlide(newSlide);
  };

  const nextSlide = () => {
    const isLastSlide = currentSlide === slides.length - 1;
    const newSlide = isLastSlide ? 0 : currentSlide + 1;
    setCurrentSlide(newSlide);
  };

  const goToSlide = (index) => {
    setCurrentSlide(index);
  };

  const autoScroll = true;
  let slideInterval;
  let intervalTime = 5000;

  useEffect(() => {
    setCurrentSlide(0);
  }, []);

  useEffect(() => {
    if (autoScroll) {
      const auto = () => {
        slideInterval = setInterval(nextSlide, intervalTime);
      };
      auto();
    }
    return () => clearInterval(slideInterval);
  }, [currentSlide, slideInterval, autoScroll]);

  return (
    <div className="w-full h-full">
      <div className=" h-[80vh] w-full m-auto pb-12  relative group">
        <div className="hidden group-hover:block absolute top-[50%] -translate-x-0 translate-y-0 left-5 text-2xl rounded-full p-2 bg-black/20 text-white cursor-pointer">
          <BsChevronCompactLeft size={30} onClick={prevSlide} />
        </div>
        <div className="w-full h-full">
          <div
            style={{ backgroundImage: `url(${slides[currentSlide].url})` }}
            className="bg-cover bg-center h-full w-full duration-500 ease-in-out "
          ></div>
          <div className="absolute top-[25.5vh] right-10 left-10 sm:right-[100px] sm:left-[100px] lg:right-[200px] lg:left-[200px] xl:right-[300px] xl:left-[300px]  text-white bg-black/40 items-center justify-center">
            <div className="p-[10px] md:p-[30px] flex flex-col items-center justify-center">
              <p className="text-[30px] md:text-[60px] font-semibold">
                {slides[currentSlide].heading}
              </p>
              <p className="text-[15px] md:text-[20px]">
                {slides[currentSlide].desc}
              </p>
              <hr className="h-2 text-white w-full" />
              <button className="p-2 md:p-4 bg-blue-700 rounded-lg text-xl md:text-2xl">
                Shop Now
              </button>
            </div>
          </div>
        </div>

        <div className="hidden group-hover:block absolute top-[50%] -translate-x-0 translate-y-0 right-5 text-2xl rounded-full p-2 bg-black/20 text-white cursor-pointer">
          <BsChevronCompactRight size={30} onClick={nextSlide} />
        </div>
        <div className="flex py-4 justify-center px-2">
          {slides.map((slide, index) => (
            <div
              className="text-2xl cursor-pointer"
              key={index}
              onClick={() => goToSlide(index)}
            >
              <RxDotFilled />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Slider;
