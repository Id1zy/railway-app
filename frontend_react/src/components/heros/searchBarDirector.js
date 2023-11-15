import React from "react";

const SearchBar = ({ searchTerm, setSearchTerm, filterCourses }) => {
  return (
    <div className="mb-1 flex items-center justify-end">
      <div className="relative rounded-full flex">
        <input
          type="text"
          placeholder="Buscar curso por nombre"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="pl-2 py-1 pr-12 rounded-l-full border border-blue focus:outline-none flex-1"
        />
        <button
          onClick={filterCourses}
          className="rounded-l-none rounded-r-full px-4 py-1 bg-blue text-white"
        >
          Buscar
        </button>
      </div>
    </div>
  );
};

export default SearchBar;
