import { createStore, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
// import logger from "redux-logger";
import rootReducer from "../reducers/root_reducer";

const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const configureStore = (preloadedState = {}) =>
  createStore(rootReducer, preloadedState, composeEnhancer(applyMiddleware(thunk)));

export default configureStore;