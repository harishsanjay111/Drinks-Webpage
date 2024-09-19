// store.js
import { combineReducers, configureStore } from "@reduxjs/toolkit";
import storage from "redux-persist/lib/storage";
import { persistStore, persistReducer } from "redux-persist";
import CartSlice from "./cart-slice"; // adjust this path

const persistConfig = {
  key: 'root',
  storage,
};

const rootReducer = combineReducers({
  cart: CartSlice,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        // Ignore these action types
        ignoredActions: ['your/action/type'],
        // Ignore these field paths in all actions
        ignoredActionPaths: ['meta.arg', 'payload.timestamp'],
        // Ignore these paths in the state
        ignoredPaths: ['items.dates'],
      },
    }),
  reducer: persistedReducer,
});

const persistor = persistStore(store);
export default store
export {  persistor };
