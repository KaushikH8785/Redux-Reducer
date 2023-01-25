import types from "./types";

export function recipeReducer(state = { recipes: [] }, action) {
  switch (action.type) {
    case types.ADD_RECIPE:
    case types.UPDATE_RECIPE:
    case types.DELETE_RECIPE:
    case types.DELETE_INGREDIENT:
    case types.SAVE_INGREDIENT:
      return { recipes: action.payload };
    default:
      return state;
  }
}

export default recipeReducer;
