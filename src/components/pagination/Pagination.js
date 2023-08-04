import React, { useState } from "react";

const Pagination = ({
  currentPage,
  setCurrentPage,
  productsPerPage,
  totalProducts,
}) => {
  const pageNumbers = [];
  totalProducts = totalProducts.length;
  const totalPages = totalProducts / productsPerPage;
  // Limit the page Numbers shown
  const [pageNumberLimit] = useState(5);
  const [maxPageNumberLimit, setmaxPageNumberLimit] = useState(5);
  const [minPageNumberLimit, setminPageNumberLimit] = useState(0);

  // Paginate
  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  // GO to next page
  const paginateNext = () => {
    setCurrentPage(currentPage + 1);
    // Show next set of pageNumbers
    if (currentPage + 1 > maxPageNumberLimit) {
      setmaxPageNumberLimit(maxPageNumberLimit + pageNumberLimit);
      setminPageNumberLimit(minPageNumberLimit + pageNumberLimit);
    }
  };

  // GO to prev page
  const paginatePrev = () => {
    setCurrentPage(currentPage - 1);
    // Show prev set of pageNumbers
    if ((currentPage - 1) % pageNumberLimit === 0) {
      setmaxPageNumberLimit(maxPageNumberLimit - pageNumberLimit);
      setminPageNumberLimit(minPageNumberLimit - pageNumberLimit);
    }
  };

  for (let i = 1; i <= Math.ceil(totalProducts / productsPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <div className=" flex justify-center items-center text-xl md:text-2xl">
      <button
        onClick={paginatePrev}
        className={
          currentPage === pageNumbers[0]
            ? "hidden"
            : "border-2 border-black px-2 py-[2px] md:px-4"
        }
      >
        Prev
      </button>

      {pageNumbers.map((number) => {
        if (number < maxPageNumberLimit + 1 && number > minPageNumberLimit) {
          return (
            <button
              key={number}
              onClick={() => paginate(number)}
              className={
                currentPage === number
                  ? "bg-orange-600  border-2 border-black px-2 py-[2px] md:px-4"
                  : "border-2 border-black px-2 py-[2px] md:px-4"
              }
            >
              {number}
            </button>
          );
        }
      })}

      <button
        onClick={paginateNext}
        className={
          currentPage === pageNumbers[pageNumbers.length - 1]
            ? "hidden"
            : "border-2 border-black px-2 py-[2px] md:px-4"
        }
      >
        Next
      </button>

      <p>
        <b className="">{`page ${currentPage}`}</b>
        <span>{` of `}</span>
        <b>{`${Math.ceil(totalPages)}`}</b>
      </p>
    </div>
  );
};

export default Pagination;
