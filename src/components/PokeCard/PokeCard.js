// src/components/PokemonCard.js
import React from "react";
import Pokeball from "../../images/Pokeball.png";
import Favoritos from "../../images/LogoFavoritos.png";
import PokeCards from "../../images/pokeCards.png";
import "../../styles/pokeCard.scss";
import { pokemonData } from "../PokemonDataExtra";
import { usePokeCard } from "./usePokeCard";
import PokePopUp from "../PokePopUp/PokePopUp";

const PokemonCard = ({ pokemon = {} }) => {
  const pokemonName = pokemon.name || pokemon.pokemon_name;
  const customData = pokemonData[pokemonName] || {
    image: Pokeball,
    description: "Descripción aleatoria.",
  };

  const {
    isFavorite,
    handleFavoriteToggle,
    handleOpenCard,
    isModalOpen,
    handleCloseModal,
    setIsModalOpen,
  } = usePokeCard(pokemon, pokemonName, customData);

  return (
    <>
      <article>
        <img
          className="nes-container"
          src={customData.image}
          alt={pokemon.name}
        />
        <div>
          <p>{pokemon.name || pokemon.pokemon_name}</p>
          <p>{customData.description}</p>
        </div>
        <button className={"btn-detail"} onClick={handleOpenCard}>
          <img src={PokeCards} alt="Card" className="card-icon" />
        </button>
        <button
          className={`btns-card ${isFavorite ? "favorite" : ""}`}
          onClick={handleFavoriteToggle}
        >
          <img src={Favoritos} alt="Favoritos" className="favorite-icon" />
        </button>
      </article>
      {isModalOpen && (
        <PokePopUp
          setIsModalOpen={setIsModalOpen}
          isOpen={isModalOpen}
          onClose={handleCloseModal}
          pokemon={pokemon}
          customData={customData}
        />
      )}
    </>
  );
};

export default PokemonCard;
