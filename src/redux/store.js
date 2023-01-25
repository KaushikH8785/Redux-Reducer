import { createStore, combineReducers, applyMiddleware } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";
import recipeReducer from "./reducer";

const reducer = combineReducers({
  RCPDETAILS: recipeReducer,
});

const intitialState = {};

const middleware = [thunk];

const store = createStore(
  reducer,
  intitialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
