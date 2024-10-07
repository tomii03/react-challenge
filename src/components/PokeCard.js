import React from "react";
import { useDispatch } from "react-redux";
import Pokeball from "../images/Pokeball.png";
import Favoritos from "../images/LogoFavoritos.png";
import "../styles/pokeCard.scss";
import { pokemonData } from "./PokemonDataExtra";
import { addToFavorites } from "../app/favoriteActions";
import { removeFromFavorites } from "../app/favoriteActions";
import { useSelector } from "react-redux";

const PokemonCard = ({ pokemon }) => {
  const dispatch = useDispatch();
  const customData = pokemonData[pokemon.name.toLowerCase()] || {
    image: Pokeball,
    description: "Descripción aleatoria.",
  };

  const favorites = useSelector((state) => state.favorites.favorites);

  const isFavorite = favorites.some((fav) => fav.name === pokemon.name);

  const handleFavoriteToggle = (e) => {
    if (isFavorite) {
      dispatch(removeFromFavorites(pokemon));
    } else {
      dispatch(addToFavorites(pokemon));
    }
  };

  return (
    <article>
      <img
        className="nes-container"
        src={customData.image}
        alt={pokemon.name}
      />
      <div>
        <p>{pokemon.name}</p>
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
