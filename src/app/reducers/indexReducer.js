import { combineReducers } from "redux";
import pokemonReducer from "./pokemonReducer";
import favoriteReducer from "./favoriteReducer"; 

const rootReducer = combineReducers({
  pokemon: pokemonReducer,
  favorites: favoriteReducer, 
});

export default rootReducer;
