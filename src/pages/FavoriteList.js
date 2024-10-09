import React, { useEffect, useState } from "react";
import axios from "axios";
import PokemonCard from "../components/PokeCard/PokeCard";
import "../styles/pokeList.scss";
import { useNavigate } from "react-router-dom";
import favoritosVacioIcon from "../images/pikachuTriste.png";

const FavoriteList = () => {
  const [favorites, setFavorites] = useState([]);
  const navigate = useNavigate();

  const fetchFavorites = async () => {
    try {
      const response = await axios.get(
        "https://react-challenge-ecru-sigma.vercel.app/api/favorites"
      );
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
        <button className="btn-back" onClick={handleGoBack}>
          Volver
        </button>
        <div className="title-fav">Favoritos</div>
      </nav>

      <section>
        {favorites.length === 0 && (
          <div className="div-FavoritesEmpty">
            <p>No hay favoritos</p>
            <img
              src={favoritosVacioIcon}
              alt="Favoritos Vacio"
              className="FavoritesEmptyIMG"
            />
          </div>
        )}
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
