import { createStore, applyMiddleware } from "redux";
import rootReducer from "./Reducers";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";

const middleware = store => next => action => {
  console.group(action.type);
  console.info("dispatching", action);
  let result = next(action);
  console.log("next state", store.getState());
  console.groupEnd(action.type);
  return result;
};

export default createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(middleware, thunk))
);
