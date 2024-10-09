// actions/pokemonActions.js
import axios from "axios";

export const fetchPokemon = () => {
  return async (dispatch) => {
    dispatch({ type: "FETCH_POKEMON_REQUEST" });

    try {
      const response = await axios.get(
        "https://pokeapi.co/api/v2/pokemon?limit=100&offset=0"
      );

      // Agregamos un 'id' a cada Pokémon 
      const pokemonWithId = response.data.results.map((pokemon, index) => ({
        ...pokemon,
        id: index + 1, 
      }));

       setTimeout(() => {
         dispatch({
           type: "FETCH_POKEMON_SUCCESS",
           payload: pokemonWithId,
         });
       }, 1000);
    } catch (error) {
      dispatch({
        type: "FETCH_POKEMON_FAILURE",
        payload: error.message,
      });
    }
  };
};
