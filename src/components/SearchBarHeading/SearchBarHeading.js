import React from "react";
import "./SearchBarHeading.css";
import MarvelImage from "../../images/heroes.jpeg";
const SearchBarHeading = () => {
  return (
    <>
      <div className="heading">
        <img
          src={MarvelImage}
          alt="Marvel Heroes"
          className="background-image"
        />
      </div>
    </>
  );
};

export default SearchBarHeading;
