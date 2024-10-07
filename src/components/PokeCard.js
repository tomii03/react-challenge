import React, { useState, useEffect } from "react";
import axios from "axios";
import Pokeball from "../images/Pokeball.png";
import Favoritos from "../images/LogoFavoritos.png";
import "../styles/pokeCard.scss";
import { pokemonData } from "./PokemonDataExtra";

const PokemonCard = ({ pokemon = {} }) => {
  const pokemonName = pokemon.name || pokemon.pokemon_name; 

  const customData = pokemonData[pokemonName] || {
    image: Pokeball,
    description: "Descripción aleatoria.",
  };

  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    const checkIfFavorite = async () => {
      try {
        const response = await axios.get("http://localhost:5000/favorites");
        const favorites = response.data;

        const found = favorites.some((fav) => fav.pokemon_name === pokemonName);
        setIsFavorite(found);
      } catch (err) {
        console.error("Error al obtener favoritos:", err);
      }
    };

    checkIfFavorite();
  }, [pokemonName]); // Cambiar dependencia a pokemonName

  const addFavorite = async () => {
    try {
      await axios.post("http://localhost:5000/favorites", {
        pokemon_name: pokemonName,
        pokemon_url: customData.image,
      });
      setIsFavorite(true);
      alert("¡Pokémon añadido a favoritos!");
    } catch (err) {
      console.error("Error al agregar a favoritos:", err);
    }
  };

  const removeFavorite = async () => {
    try {
      if (!pokemonName) {
        console.error("No se puede eliminar, el nombre del Pokémon es inválido");
        return;
      }
      await axios.delete(`http://localhost:5000/favorites/${pokemonName}`);
      setIsFavorite(false);
      alert("Pokémon eliminado de favoritos.");
    } catch (err) {
      console.error("Error al eliminar de favoritos:", err.response ? err.response.data : err.message);
    }
  };

  const handleFavoriteToggle = () => {
    if (isFavorite) {
      removeFavorite();
    } else {
      addFavorite();
    }
  };


  return (
    <article>
      <img className="nes-container" src={customData.image } alt={pokemon.name} />
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
