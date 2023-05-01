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
  // console.log(pageNumbers);

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

// const Pagination = ({
//   currentPage,
//   setCurrentPage,
//   productsPerPage,
//   totalProducts,
// }) => {
//   const pageNumbers = [];
//   totalProducts = totalProducts.length;
//   const totalPages = totalProducts / productsPerPage;

//   const [pageNumberLimit] = useState(5);
//   const [maxPageNumberLimit, setMaxPageNumberLimit] = useState(5);
//   const [minPageNumberLimit, setMinPageNumberLimit] = useState(0);

//   // limit the page number shown

//   // paginate
//   const paginate = (pageNumber) => {
//     setCurrentPage(pageNumber);
//   };

//   // To next page
//   const paginateNext = () => {
//     setCurrentPage(currentPage + 1);
//     // Show next set of pageNumbers
//     if (currentPage + 1 > maxPageNumberLimit) {
//       setMaxPageNumberLimit(maxPageNumberLimit + pageNumberLimit);
//       setMinPageNumberLimit(minPageNumberLimit + pageNumberLimit);
//     }
//   };

//   // To previous page
//   const paginatePrev = () => {
//     setCurrentPage(currentPage - 1);
//     // Show prev set of pageNumbers
//     if ((currentPage - 1) % pageNumberLimit === 0) {
//       setMaxPageNumberLimit(maxPageNumberLimit - pageNumberLimit);
//       setMinPageNumberLimit(minPageNumberLimit - pageNumberLimit);
//     }
//   };

//   for (let i = 1; i <= Math.ceil(totalProducts / productsPerPage); i++) {
//     pageNumbers.push(i);
//   }
//   console.log(pageNumbers);

//   return (
//     <div className="flex w-full justify-center items-center">
//       {currentPage === 1 ? null : (
//         <button
//           onClick={paginatePrev}
//           className="border-[0.1px] px-4 py-2 border-black"
//         >
//           Previous{" "}
//         </button>
//       )}

//       {pageNumbers.map((number) => {
//         if (number < pageNumberLimit + 1 && number > minPageNumberLimit) {
//           return (
//             <button
//               key={number}
//               onClick={() => paginate(number)}
//               className={
//                 currentPage === number
//                   ? "border-[0.1px]  px-4 py-2 border-black bg-orange-400 text-white"
//                   : "border-[0.1px]  px-4 py-2 border-black"
//               }
//             >
//               {number}
//             </button>
//           );
//         }
//       })}
//       {currentPage === pageNumbers[pageNumbers.length - 1] ? null : (
//         <button
//           onClick={paginateNext}
//           className="border-[0.1px] px-4 py-2 border-black"
//         >
//           Next
//         </button>
//       )}

//       <p className="font-bold text-xl">
//         <b className="text-orange-400">{`page ${currentPage}`}</b>
//         <span> of </span>
//         <b>{Math.ceil(totalPages)}</b>
//       </p>
//     </div>
//   );
// };

// export default Pagination;
