// src/components/PokemonCard.js
import React from "react";
import Pokeball from "../../images/Pokeball.png";
import Favoritos from "../../images/LogoFavoritos.png";
import "../../styles/pokeCard.scss";
import { pokemonData } from "../PokemonDataExtra";
import { usePokeCard } from "./usePokeCard";

const PokemonCard = ({ pokemon = {} }) => {
  const pokemonName = pokemon.name || pokemon.pokemon_name;
  const customData = pokemonData[pokemonName] || {
    image: Pokeball,
    description: "Descripción aleatoria.",
  };

  const { isFavorite, handleFavoriteToggle } = usePokeCard(
    pokemon,
    pokemonName,
    customData
  );

  return (
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
      <button
        className={`btns-card ${isFavorite ? "favorite" : ""}`}
        onClick={handleFavoriteToggle}
      >
        <img src={Favoritos} alt="Favoritos" className="favorite-icon" />
      </button>
    </article>
  );
};

export default PokemonCard;
