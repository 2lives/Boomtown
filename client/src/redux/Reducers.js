import { combineReducers } from 'redux';

import itemsReducer from './modules/Items';
import profileReducer from './modules/Profiles';

export default combineReducers({
    itemsData: itemsReducer,
    profileItems: profileReducer
});
