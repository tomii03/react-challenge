import React, { useEffect, useState } from "react";
import axios from "axios";
import PokemonCard from "../components/PokeCard";
import "../styles/pokeList.scss";

const FavoriteList = () => {
  const [favorites, setFavorites] = useState([]);

  const fetchFavorites = async () => {
    try {
      const response = await axios.get("http://localhost:5000/favorites");
      setFavorites(response.data);
    } catch (err) {
      console.error("Error fetching favorites:", err);
    }
  };

  useEffect(() => {
    fetchFavorites(); 
  }, [favorites]);

  return (
    <>
      <nav className="nav-fav">Favoritos</nav>

      <section>
        {favorites.length === 0 && <p>No hay favoritos</p>}
        {favorites.map((pokemon, index) => (
          <PokemonCard
            key={index}
            pokemon={pokemon}
            onUpdateFavorites={fetchFavorites} // Pasar la función como prop
          />
        ))}
      </section>
    </>
  );
};

export default FavoriteList;
