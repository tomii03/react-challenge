import React from "react";
import { useSelector } from "react-redux";
import PokemonCard from "../components/PokeCard";

const FavoriteList = () => {
  const favorites = useSelector((state) => state.favorites.favorites);

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
