const initialState = {
  loading: false,
  pokemonList: [],
  error: "",
};

const pokemonReducer = (state = initialState, action) => {
  switch (action.type) {
    case "FETCH_POKEMON_REQUEST":
      return { ...state, loading: true };
    case "FETCH_POKEMON_SUCCESS":
      return { loading: false, pokemonList: action.payload, error: "" };
    case "FETCH_POKEMON_FAILURE":
      return { loading: false, pokemonList: [], error: action.payload };
    default:
      return state;
  }
};

export default pokemonReducer;
