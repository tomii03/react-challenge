// src/hooks/usePokemonFavorite.js
import { useState, useEffect } from "react";
import axios from "axios";

export const usePokeCard = (pokemon, pokemonName, customData) => {
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
  }, [pokemonName]);

  const addFavorite = async () => {
    try {
      await axios.post("http://localhost:5000/favorites", {
        id: pokemon.id,
        pokemon_name: pokemonName,
        pokemon_url: customData.image,
      });
      setIsFavorite(true);
    } catch (err) {
      console.error("Error al agregar a favoritos:", err);
    }
  };

  const removeFavorite = async () => {
    try {
      if (!pokemon.id) {
        console.error(
          "No se puede eliminar, el nombre del Pokémon es inválido"
        );
        return;
      }
      await axios.delete(
        `http://localhost:5000/favorites/delete/${pokemon.id}`
      );
      setIsFavorite(false);
    } catch (err) {
      console.error(
        "Error al eliminar de favoritos:",
        err.response ? err.response.data : err.message
      );
    }
  };

  const handleFavoriteToggle = async () => {
    if (isFavorite) {
      await removeFavorite();
    } else {
      await addFavorite();
    }
  };

  return {
    isFavorite,
    handleFavoriteToggle,
  };
};
