// src/hooks/usePokemonFavorite.js
import { useState, useEffect } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { setFavoriteCount } from "../../app/favoriteCountActions";
import { pokemonData } from "../PokemonDataExtra";

export const usePokeCard = (pokemon, pokemonName, customData) => {
  const [isFavorite, setIsFavorite] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    const checkIfFavorite = async () => {
      try {
        const response = await axios.get(
          "http://react-challenge-back.vercel.app/favorites"
        );
        const favorites = response.data;

        const found = favorites.some((fav) => fav.pokemon_name === pokemonName);
        setIsFavorite(found);

        dispatch(setFavoriteCount(favorites.length));
      } catch (err) {
        console.error("Error al obtener favoritos:", err);
      }
    };

    checkIfFavorite();
  }, [pokemonName, dispatch]);

  const addFavorite = async () => {
    try {
      await axios.post("http://react-challenge-back.vercel.app/favorites", {
        id: pokemon.id,
        pokemon_name: pokemonName,
        pokemon_url: customData.image,
      });
      setIsFavorite(true);

      const response = await axios.get(
        "http://react-challenge-back.vercel.app/favorites"
      );
      dispatch(setFavoriteCount(response.data.length));
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
        `http://react-challenge-back.vercel.app/favorites/delete/${pokemon.id}`
      );
      setIsFavorite(false);

      const response = await axios.get(
        "https://react-challenge-back.vercel.app/favorites"
      );
      dispatch(setFavoriteCount(response.data.length));
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

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedPokemon, setSelectedPokemon] = useState(null);

  const handleOpenCard = (pokemon) => {
    setSelectedPokemon(pokemon);
    setIsModalOpen(true);
  };

  return {
    isFavorite,
    handleFavoriteToggle,
    handleOpenCard,
    isModalOpen,
    selectedPokemon,
    setIsModalOpen,
  };
};
