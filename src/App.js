import React, { useState, useEffect } from "react";
import CharactersList from "./components/CharacterList/CharactersList";
import SearchBarHeading from "./components/SearchBarHeading/SearchBarHeading";
import SearchBar from "./components/SearchBar/SearchBar";
import "./App.css";

const StorageKey = "react-bookmarked-characters";

const App = () => {
  const [characters, setCharacters] = useState([]);
  const [search, setSearch] = useState("");
  const currentPage = 1;
  const characterPerPage = 20;

  const indexOfLastCharacter = currentPage * characterPerPage;
  const indexOfFirstCharacter = indexOfLastCharacter - characterPerPage;

  const saveToLocalStorage = (data) => {
    localStorage.setItem("react-bookmarked-characters", JSON.stringify(data));
  };

  useEffect(() => {
    if (search === "") {
      const bookMarkedData = JSON.parse(localStorage.getItem(StorageKey));
      if (bookMarkedData) {
        setCharacters(
          bookMarkedData.slice(indexOfFirstCharacter, indexOfLastCharacter)
        );
      }
    } else {
      getCharactersRequest(search);
    }
  }, [search]);

  const getCharactersRequest = async () => {
    const url = `https://gateway.marvel.com/v1/public/characters?nameStartsWith=${search}&ts=1&apikey=14efc937cb35f97e3ee7589404e54360&hash=7889d97c96479d4855330fb2130c5986`;
    const response = await fetch(url);
    const responseJSON = await response.json();

    if (responseJSON.data) {
      const bookMarkedData = JSON.parse(localStorage.getItem(StorageKey));
      const characters = responseJSON.data.results.map((c) => {
        if (
          bookMarkedData &&
          bookMarkedData.find((bookmarked) => bookmarked.id === c.id)
        ) {
          return {
            ...c,
            favourite: true,
          };
        }
        return c;
      });
      setCharacters(characters);
    }
  };

  const toggleCharacterFavourite = (character) => {
    const bookMarkedData = JSON.parse(localStorage.getItem(StorageKey));
    if (!character.favourite) {
      saveToLocalStorage(
        (bookMarkedData || []).concat([{ ...character, favourite: true }])
      );
    } else {
      if (bookMarkedData) {
        saveToLocalStorage(bookMarkedData.filter((c) => c.id !== character.id));
      }
    }

    const newCharacters = characters.map((c) => {
      if (c.id === character.id) {
        return {
          ...c,
          favourite: !c.favourite,
        };
      }
      return c;
    });
    setCharacters(newCharacters);
  };

  return (
    <div>
      <div className="heading-container">
        <SearchBarHeading />
        <SearchBar search={search} setSearch={setSearch} />
      </div>

      <div className="cards-container">
        <CharactersList
          characters={characters}
          toggleCharacterFavourite={toggleCharacterFavourite}
        />
      </div>
    </div>
  );
};

export default App;
