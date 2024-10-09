import { combineReducers } from "redux";
import pokemonReducer from "./pokemonReducer";
import favoriteReducer from "./favoriteReducer"; 
import favoriteCountReducer from "./favoriteCountReducer";

const rootReducer = combineReducers({
  pokemon: pokemonReducer,
  favorites: favoriteReducer,
  favoriteCount: favoriteCountReducer,
});

export default rootReducer;
