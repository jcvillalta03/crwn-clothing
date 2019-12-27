import { combineReducers } from "redux";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

import userReducer from "./user/user.reducer";
import cartReducer from "./cart/cart.reducer";
import directoryReducer from "./directory/directory.reducer";
import shopReducer from "./shop/shop.reducer";

/**
 * Make a persistence configuration object naming the key to store in,
 * as well as reducers we wish to store in local storage
 */
const persistConfig = {
  key: "root",
  storage,
  whitelist: ["cart"] // call out reducers we wish to persist into local storage
};

/**
 * save our root reducer into an object
 */
const rootReducer = combineReducers({
  user: userReducer,
  cart: cartReducer,
  directory: directoryReducer,
  shop: shopReducer
});

/**
 * export out a persist reducer that combines our root reducer with our persistence configuration
 */
export default persistReducer(persistConfig, rootReducer);
