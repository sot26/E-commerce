import React, { useState } from "react";

const Pagination = ({
  currentPage,
  setCurrentPage,
  productsPerPage,
  totalProducts,
}) => {
  const pageNumbers = [];

  // limit the page number shown

  const [pageNumberLimit, setPageNumberLimit] = useState(5);
  const [maxPageNumberLimit, setMaxPageNumberLimit] = useState(5);
  const [minPageNumberLimit, setMinPageNumberLimit] = useState(0);

  for (let i = 1; i <= Math.ceil(totalProducts / productsPerPage); i++) {
    pageNumbers.push(i);
  }
  console.log(pageNumbers);

  return (
    <div>
      <li>Previous page</li>
      {pageNumbers.map((number) => {
        return (
          <li className="h-[100px]" key={number}>
            {number}
          </li>
        );
      })}

      <li>Next page</li>
    </div>
  );
};

export default Pagination;
