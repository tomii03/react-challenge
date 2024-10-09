import React from "react";
import { usePokemonList } from "./usePokemonList";
import PokemonCard from "../../components/PokeCard/PokeCard";
import { Button } from "../../components/Button";
import favoritosIcon from "../../images/favoriteIMG.png"
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
    favoriteCount,
    goToFavoriteList,
  } = usePokemonList();

  return (
    <>
      {loading && (
        <div className="loading-container">
          <div className="loading-content">
            <img
              src={require("../../images/running-pikachu.gif")}
              alt="Loading..."
              className="loading-spinner"
            />
            <p className="loading-text">Cargando...</p>
          </div>
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
          <button className="btn-fav" onClick={goToFavoriteList}>
            {favoriteCount} 
            <img src={favoritosIcon} alt="Favoritos" className="favorite-icon" /> 
          </button>
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
