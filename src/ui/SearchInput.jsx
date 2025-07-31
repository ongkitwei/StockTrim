import React from "react";

function SearchInput({ getTickerSearch, value }) {
  return (
    <label className="input rounded-md w-[60%] border border-b-2 shadow-md">
      <svg
        className="h-[1em] opacity-50"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
      >
        <g
          strokeLinejoin="round"
          strokeLinecap="round"
          strokeWidth="2.5"
          fill="none"
          stroke="currentColor"
        >
          <circle cx="11" cy="11" r="8"></circle>
          <path d="m21 21-4.3-4.3"></path>
        </g>
      </svg>
      <input
        type="search"
        required
        placeholder="Search"
        onChange={getTickerSearch}
        value={value}
      />
    </label>
  );
}

export default SearchInput;
