import {
  ADD_TO_FAVORITES,
  REMOVE_FROM_FAVORITES,
} from "../favoriteActions";
import { setFavoriteCount } from "../favoriteCountActions"; 

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

export const updateFavoriteCount = () => (dispatch, getState) => {
  const count = getState().favorites.favorites.length; 
  dispatch(setFavoriteCount(count));
};

export default favoriteReducer;
