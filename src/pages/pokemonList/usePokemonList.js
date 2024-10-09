import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { fetchPokemon } from "../../app/pokemonActions";

export const usePokemonList = () => {
  const [searchPokemon, setSearchPokemon] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 20;

  const dispatch = useDispatch();
  const { loading, pokemonList, error } = useSelector((state) => state.pokemon);

  useEffect(() => {
    dispatch(fetchPokemon());
  }, [dispatch]);

  const handleSearch = (event) => {
    setSearchPokemon(event.target.value.toLowerCase());
    setCurrentPage(1);
  };

  const filteredList = pokemonList.filter((pokemon) =>
    pokemon.name.toLowerCase().includes(searchPokemon)
  );

  //Paginacion que filtra la lista en base a los items por pagina que indiquemos
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredList.slice(indexOfFirstItem, indexOfLastItem);

  const totalPages = Math.ceil(filteredList.length / itemsPerPage);

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  
  const favoriteCount = useSelector((state) => state.favoriteCount.count);
  const navigate = useNavigate();

  const goToFavoriteList = () => {
    navigate("/FavoriteList");
  };


  return {
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
  };
};
