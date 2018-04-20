import { combineReducers } from "redux";

import itemsReducer from "./modules/Items"; //alternatively we can import fruit from "./modules/fruits" because it's exported as a default

export default combineReducers({
  items: itemsReducer //if imported as fruit, we can just have fruit inside here (no fruit: fruitReducer) because of the naming convention
});
