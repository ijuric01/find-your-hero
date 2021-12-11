import React from "react";
import "./CharactersList.css";
import { RiBookmarkLine } from "react-icons/ri";
import { RiBookmarkFill } from "react-icons/ri";

const CharactersList = (props) => {
  const Bookmarked = ({ character }) => {
    return character.favourite ? <RiBookmarkFill /> : <RiBookmarkLine />;
  };

  return (
    <>
      {props.characters.map((character, index) => (
        <div className="card-container" key={index}>
          <img
            src={`${character.thumbnail.path}/standard_fantastic.${character.thumbnail.extension}`}
            alt="character"
            className="image"
          />
          <div className="info-container">
            <p className="name">{character.name}</p>
            <div
              className="icon"
              onClick={() => {
                props.toggleCharacterFavourite(character);
              }}
            >
              <Bookmarked character={character} />
            </div>
          </div>
        </div>
      ))}
    </>
  );
};

export default CharactersList;
