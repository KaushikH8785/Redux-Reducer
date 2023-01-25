import React from "react";
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { addRecipe } from "../redux/action";
import { removeRecipe } from "../redux/action";
import { saveRcpIngredient } from "../redux/action";
import { removeRcpIngredient } from "../redux/action";
import { updateRecipe } from "../redux/action";
import { v4 as uuidv4 } from "uuid";

const Home = () => {
  const [data, setData] = useState({
    recipeName: "",
    ingredientName: "",
  });
  const [updateIngredient, setUpdateIngredient] = useState("");
  const [toggle, setToggle] = useState(null);
  const [action, setAction] = useState("");
  const [updateDataId, setUpdateDataId] = useState(null);

  // Form field value set
  function FormData(e) {
    setData({ ...data, [e.target.name]: e.target.value });
  }

  const ingreNamesComma = data.ingredientName;
  const ingreArr = ingreNamesComma.toString().split(",");
  data.ingredientName = ingreArr;

  const dispatch = useDispatch();
  const RCPDETAILS = useSelector((state) => state.RCPDETAILS);

  const { recipes } = RCPDETAILS;

  const handleOnClick = (e) => {
    e.preventDefault();
    data["id"] = uuidv4();
    dispatch(addRecipe(data));
    setData({ recipeName: "", ingredientName: "" });
  };

  const handleEditRecipe = (id) => (e) => {
    e.preventDefault();
    setAction("edit");
    recipes.map((item) => {
        if (item.data.id === id) {
            setData({ recipeName: item.data.recipeName, ingredientName: item.data.ingredientName });
        }
        return { ...item };
    });
    setUpdateDataId(id) 
  }

  const handleUpdateRecipe = () => (e) => {
    e.preventDefault();   
    data["id"] = uuidv4(); 
    dispatch(updateRecipe(updateDataId, data));
    setData({ recipeName: "", ingredientName: "" }); 
    setAction();   
  }

  const handleRemoveRecipe = (id) => (e) => {
    dispatch(removeRecipe(id));
  };

  const editIngredient = (id, inIdx, ingreName) => (e) => {
    e.preventDefault();
    setUpdateIngredient(ingreName);
    setToggle({ rcpId: id, inGreIdx: inIdx });
  };

  //Cancel On Click Ingrediants
  const cancelOnClick = (e) => {
    e.preventDefault();
    setToggle(false);
  };

  // UpdateIngredient
  const updateIngredint = (id, inIdx, updateIngredient) => (e) => {
    e.preventDefault();
    dispatch(saveRcpIngredient(id, inIdx, updateIngredient));
    setToggle(true);
  };

  const removeIngredient = (id, inIdx) => (e) => {
    e.preventDefault();
    dispatch(removeRcpIngredient(id, inIdx));
  };

  const recipeList = recipes.map((recipe) => {
    const ingredientName = recipe.data.ingredientName;
    return (
      <ul className="added-recipe-block" key={recipe.data.id}>
        <li>
          <strong>Recipe Name: </strong> {recipe.data.recipeName}
        </li>
        <li>
          <strong>Ingredient: </strong>
          {ingredientName.map((ingreName, idx) => {
            return (
              <div key={idx} className="ingre">
                <div
                  style={{
                    display:
                      toggle &&
                      toggle.rcpId === recipe.data.id &&
                      toggle.inGreIdx === idx
                        ? "none"
                        : "inline-flex",
                  }}
                >
                  {ingreName}
                </div>
                <div className="editingre">
                  <form
                    style={{
                      display:
                        toggle &&
                        toggle.rcpId === recipe.data.id &&
                        toggle.inGreIdx === idx
                          ? "block"
                          : "none",
                    }}
                    onSubmit={updateIngredint(
                      recipe.data.id,
                      idx,
                      updateIngredient
                    )}
                  >
                    <input
                      value={updateIngredient}
                      onChange={(e) => setUpdateIngredient(e.target.value)}
                    />
                    <button className="btn save" type="submit" id="save-ingre">
                      Save
                    </button>
                    <button
                      className="btn cancel"
                      id="cancel-ingre"
                      onClick={cancelOnClick}
                    >
                      Cancel
                    </button>
                  </form>
                </div>
                <div
                  className="ingre-edit-delete"
                  style={{
                    display:
                      toggle &&
                      toggle.rcpId === recipe.data.id &&
                      toggle.inGreIdx === idx
                        ? "none"
                        : "inline-flex",
                  }}
                >
                  <div
                    className="editicon"
                    onClick={editIngredient(recipe.data.id, idx, ingreName)}
                  >
                    Edit
                  </div>
                  <div
                    className="removeingre"
                    onClick={removeIngredient(recipe.data.id, idx)}
                  >
                    +
                  </div>
                </div>
              </div>
            );
          })}
        </li>
        <li>
          <div className="edit" onClick={handleEditRecipe(recipe.data.id)}>
            Edit
          </div>
          <div className="delete" onClick={handleRemoveRecipe(recipe.data.id)}>
            Delete Recipe
          </div>
        </li>
      </ul>
    );
  });

  //console.log("recipes-->", recipes);

  return (
    <>
      <h2>Recipe Title</h2>
      <div className="addWrapper" id="addcontainer">
        <div className="addBox">
          <h5>Recipe name:</h5>
          <input
            onChange={FormData}
            name="recipeName"
            id="recipeName"
            value={data.recipeName}
          />
          <h5>
            Ingredients <small>Seperate them via commas</small>
          </h5>
          <input
            onChange={FormData}
            name="ingredientName"
            id="ingredientName"
            value={data.ingredientName}
          />
            {
                action === "edit" ?
                <button
                    className="btn btn-danger"
                    id="add-recipe"
                    onClick={handleUpdateRecipe()}
                > 
                    Update Recipe           
                </button>
                :
                <button
                    className="btn btn-danger"
                    id="add-recipe"
                    onClick={handleOnClick}
                >
                    Add Recipe           
                </button>
            }

        </div>
      </div>
      {recipeList}
    </>
  );
};

export default Home;
