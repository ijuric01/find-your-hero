import React from "react";
import "./SearchBar.css";
const SearchBar = (props) => {
  return (
    <div className="input-container">
      <input
        onChange={(e) => props.setSearch(e.target.value)}
        placeholder="Find your Hero here..."
        className="input"
      />
    </div>
  );
};

export default SearchBar;
