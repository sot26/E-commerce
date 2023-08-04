import React from "react";
import { BiSearch } from "react-icons/bi";

const Search = ({ value, onChange }) => {
  return (
    <div className="max-w-[200px] md:max-w-[290px] flex items-center justify-center border-2 border-black md:p-[4px] rounded-lg md:rounded-md">
      <BiSearch className="md:w-[20px]  md:ml-0" />
      <input
        type="text"
        placeholder="Search by products, brand and category"
        value={value}
        onChange={onChange}
        className="top-0 text-[12px] md:text-[15px] w-full m-[2px]"
      />
    </div>
  );
};

export default Search;
