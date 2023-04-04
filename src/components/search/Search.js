import React from "react";
import { BiSearch } from "react-icons/bi";

const Search = ({ value, onChange }) => {
  return (
    <div className="max-w-[220px] flex items-center justify-center border-2 border-black md:p-3 rounded-lg md:rounded-2xl">
      <BiSearch className="md:w-[25px] ml-[-10px] md:ml-0" />
      <input
        type="text"
        placeholder="Search by Name"
        value={value}
        onChange={onChange}
        className="top-0 px-2"
      />
    </div>
  );
};

export default Search;
