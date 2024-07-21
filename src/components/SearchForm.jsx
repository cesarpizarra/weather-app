import React from "react";
import { FaSearch } from "react-icons/fa";

const SearchForm = ({ query, setQuery, onSearch }) => {
  return (
    <form onSubmit={onSearch} className="flex items-center gap-3 py-4 ">
      <input
        type="text"
        placeholder="Search city..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="input input-bordered input-primary w-full  outline-none bg-transparent"
      />
      <button
        type="submit"
        className="cursor-pointer bg-primary p-2 rounded-full text-white"
      >
        <FaSearch size={30} />
      </button>
    </form>
  );
};

export default SearchForm;
