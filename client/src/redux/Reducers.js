import { combineReducers } from "redux";

import itemsReducer from "./modules/Items";

export default combineReducers({
  itemsData: itemsReducer
  //   profileData: profileReducer
});
