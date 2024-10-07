import {
  ADD_TO_FAVORITES,
  REMOVE_FROM_FAVORITES,
} from "../favoriteActions";

const initialState = {
  favorites: [],
};

const favoriteReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_TO_FAVORITES:
      if (state.favorites.some((fav) => fav.name === action.payload.name)) {
        return state;
      }
      return {
        ...state,
        favorites: [...state.favorites, action.payload],
      };
    case REMOVE_FROM_FAVORITES:
      return {
        ...state,
        favorites: state.favorites.filter(
          (fav) => fav.name !== action.payload.name
        ),
      };
    default:
      return state;
  }
};

export default favoriteReducer;
