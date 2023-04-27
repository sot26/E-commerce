import React, { useState } from "react";

const Pagination = ({
  currentPage,
  setCurrentPage,
  productsPerPage,
  totalProducts,
}) => {
  const pageNumber = [];

  // limit the page number shown

  const [pageNumberLimit, setPageNumberLimit] = useState(5);
  const [maxPageNumberLimit, setMaxPageNumberLimit] = useState(5);
  const [minPageNumberLimit, setMinPageNumberLimit] = useState(0);

  return (
    <div>
      <li>Previous page</li>
      <li>{pageNumber}</li>
      <li>Next page</li>
    </div>
  );
};

export default Pagination;
