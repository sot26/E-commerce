import React, { useState } from "react";

const Pagination = ({
  currentPage,
  setCurrentPage,
  productsPerPage,
  totalProducts,
}) => {
  const pageNumbers = [];
  const totalPages = totalProducts / productsPerPage;

  const [pageNumberLimit] = useState(5);
  const [maxPageNumberLimit, setMaxPageNumberLimit] = useState(5);
  const [minPageNumberLimit, setMinPageNumberLimit] = useState(0);

  // limit the page number shown

  // paginate
  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  // To next page
  const paginateNext = () => {
    setCurrentPage(currentPage + 1);
    // Show next set of pageNumbers
    if (currentPage + 1 > maxPageNumberLimit) {
      setMaxPageNumberLimit(maxPageNumberLimit + pageNumberLimit);
      setMinPageNumberLimit(minPageNumberLimit + pageNumberLimit);
    }
  };

  // To previous page
  const paginatePrev = () => {
    setCurrentPage(currentPage - 1);
    // Show prev set of pageNumbers
    if ((currentPage - 1) % pageNumberLimit === 0) {
      setMaxPageNumberLimit(maxPageNumberLimit - pageNumberLimit);
      setMinPageNumberLimit(minPageNumberLimit - pageNumberLimit);
    }
  };

  for (let i = 1; i <= Math.ceil(totalProducts / productsPerPage); i++) {
    pageNumbers.push(i);
  }
  console.log(pageNumbers);

  return (
    <div className="flex w-full justify-center items-center">
      {currentPage === 1 ? null : (
        <button
          onClick={paginatePrev}
          className="border-[0.1px] px-4 py-2 border-black"
        >
          Previous{" "}
        </button>
      )}

      {pageNumbers.map((number) => {
        if (number < pageNumberLimit + 1 && number > minPageNumberLimit) {
          return (
            <button
              key={number}
              onClick={() => paginate(number)}
              className={
                currentPage === number
                  ? "border-[0.1px]  px-4 py-2 border-black bg-orange-400 text-white"
                  : "border-[0.1px]  px-4 py-2 border-black"
              }
            >
              {number}
            </button>
          );
        }
      })}
      {currentPage === pageNumbers[pageNumbers.length - 1] ? null : (
        <button
          onClick={paginateNext}
          className="border-[0.1px] px-4 py-2 border-black"
        >
          Next
        </button>
      )}

      <p className="font-bold text-xl">
        <b className="text-orange-400">{`page ${currentPage}`}</b>
        <span> of </span>
        <b>{Math.ceil(totalPages)}</b>
      </p>
    </div>
  );
};

export default Pagination;
