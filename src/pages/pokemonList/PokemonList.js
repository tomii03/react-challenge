import React from "react";
import { usePokemonList } from "./usePokemonList";
import PokemonCard from "../../components/PokeCard";
import { Button } from "../../components/Button";
import { useNavigate } from "react-router-dom";
import "../../styles/pokeList.scss";

const PokemonList = () => {
  const {
    searchPokemon,
    handleSearch,
    currentItems,
    loading,
    error,
    currentPage,
    totalPages,
    handleNextPage,
    handlePreviousPage,
    itemsPerPage,
  } = usePokemonList();

  const navigate = useNavigate();

  const goToFavoriteList = () => {
    navigate("/FavoriteList");
  };

  return (
    <>
      {loading && (
        <div className="loading-container">
          <img
            src={require("../../images/Loading.png")}
            alt="Loading..."
            className="loading-spinner"
          />
        </div>
      )}
      {error && <p>Error: {error}</p>}
      <nav>
        <input
          className="nes-input"
          id="name_field"
          placeholder="Buscar Pokémon"
          type="text"
          value={searchPokemon}
          onChange={handleSearch}
        />
        <Button className="btn-fav" onClick={goToFavoriteList}>
          Favoritos
        </Button>
      </nav>
      <section>
        {currentItems.map((pokemon, index) => (
          <PokemonCard key={index} pokemon={pokemon} />
        ))}
      </section>
      <div className="pagination">
        <Button onClick={handlePreviousPage} disabled={currentPage === 1}>
          Anterior
        </Button>
        <span>
          Página {currentPage} de {totalPages}
        </span>
        <Button onClick={handleNextPage} disabled={currentPage === totalPages}>
          Siguiente
        </Button>
      </div>
      <p className="pagination">{itemsPerPage} elementos por pagina</p>
    </>
  );
};

export default PokemonList;
