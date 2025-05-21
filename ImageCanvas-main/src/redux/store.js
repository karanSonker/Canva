// src/redux/store.js
import { createStore, combineReducers } from "redux";
import editorReducer from "./reducers"; // Adjust path if needed

const rootReducer = combineReducers({
  editor: editorReducer,
});

const store = createStore(rootReducer);

export default store;
