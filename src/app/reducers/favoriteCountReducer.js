import { SET_FAVORITE_COUNT } from "../favoriteCountActions"; 

const initialState = {
  count: 0,
};

//Contador de Favoritos Totales
const favoriteCountReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_FAVORITE_COUNT:
      return {
        ...state,
        count: action.payload,
      };
    default:
      return state;
  }
};


export default favoriteCountReducer;
