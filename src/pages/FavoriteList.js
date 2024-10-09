import React, { useEffect, useState } from "react";
import axios from "axios";
import PokemonCard from "../components/PokeCard/PokeCard";
import "../styles/pokeList.scss";
import { useNavigate } from "react-router-dom";
import { Button } from "../components/Button";


const FavoriteList = () => {
  const [favorites, setFavorites] = useState([]);
  const navigate = useNavigate();

  const fetchFavorites = async () => {
    try {
      const response = await axios.get("http://localhost:5000/favorites");
      setFavorites(response.data);
    } catch (err) {
      console.error("Error fetching favorites:", err);
    }
  };

  const handleGoBack = () => {
    navigate("/PokeList");
  };

  useEffect(() => {
    fetchFavorites();
  }, [favorites]);

  return (
    <>
      <nav className="nav-fav">
        <Button className="btn-back" onClick={handleGoBack}>
          Volver
        </Button>
        <div className="title-fav">Favoritos</div>
      </nav>

      <section>
        {favorites.length === 0 && <p>No hay favoritos</p>}
        {favorites.map((pokemon, index) => (
          <PokemonCard
            key={index}
            pokemon={pokemon}
            onUpdateFavorites={fetchFavorites}
          />
        ))}
      </section>
    </>
  );
};

export default FavoriteList;
