import get from "lodash/get";

export const addRecipe = (data) => (dispatch, getState) => {
  const {
    RCPDETAILS: { recipes },
  } = getState();

  if (data.recipeName === "" || data.ingredientName === "") {
    alert("Please fill Recipe Details");
  } else {
    dispatch({
      type: "ADD_RECIPE",
      payload: [{ data }, ...recipes],
    });
  }
};

export const updateRecipe = (updateDataId, data) => (dispatch, getState) => {
    const {
      RCPDETAILS: { recipes },
    } = getState();
    
    dispatch({
        type: "UPDATE_RECIPE",
        payload: recipes.map((item) => {            
            if (item.data.id === updateDataId) {
                return { ...item, data }
            } 
            return { ...item }
        })
    });
    
};

export const removeRecipe = (itemId) => (dispatch, getState) => {
  const {
    RCPDETAILS: { recipes },
  } = getState();

  dispatch({
    type: "DELETE_RECIPE",
    payload: recipes.filter((item) => item.data.id !== itemId),
  });
};

export const saveRcpIngredient =
  (id, inIdx, updateIngredient) => (dispatch, getState) => {
    const {
      RCPDETAILS: { recipes },
    } = getState();

    dispatch({
      type: "SAVE_INGREDIENT",
      payload: recipes.map((item) => {
        const ingredientName = get(item.data, "ingredientName", []);
        if (item.data.id === id) {
          ingredientName.splice(inIdx, 1, updateIngredient);
        }
        return { ...item, ingredientName };
      }),
    });
  };

export const removeRcpIngredient = (id, inIdx) => (dispatch, getState) => {
  const {
    RCPDETAILS: { recipes },
  } = getState();

  dispatch({
    type: "DELETE_INGREDIENT",
    payload: recipes.map((item) => {
      const ingredientName = get(item.data, "ingredientName", []);
      if (item.data.id === id) {
        ingredientName.splice(inIdx, 1);
      }
      return { ...item, ingredientName };
    }),
  });
};
