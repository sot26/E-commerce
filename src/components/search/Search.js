import React from "react";
import { BiSearch } from "react-icons/bi";

const Search = ({ value, onChange }) => {
  return (
    <div className="flex items-center justify-center border-2 border-black p-3 rounded-2xl">
      <BiSearch size={18} />
      <input
        type="text"
        placeholder="Search by Name"
        value={value}
        onChange={onChange}
        className="top-0"
      />
    </div>
  );
};

export default Search;
