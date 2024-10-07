import React from "react";
import { useEffect, useState } from "react";
import axios from "axios";
import PokemonCard from "../components/PokeCard";

const FavoriteList = () => {
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    const fetchFavorites = async () => {
      try {
        const response = await axios.get("http://localhost:5000/favorites");
        setFavorites(response.data);
      } catch (err) {
        console.error("Error fetching favorites:", err);
      }
    };
    fetchFavorites();
  }, []);

  return (
    <>
      <nav>Favoritos</nav>

      <section>
        {favorites.length === 0 && <p>No hay favoritos</p>}
        {favorites.map((pokemon, index) => (
          <PokemonCard key={index} pokemon={pokemon} />
        ))}
      </section>
    </>
  );
};

export default FavoriteList;
