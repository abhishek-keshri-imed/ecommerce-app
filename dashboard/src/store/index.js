import { configureStore } from "@reduxjs/toolkit";
import rootReducer from "./reducers/rootReducer";

/**
 * CONFIGURE STORE
 * This function creates the Redux store. It automatically sets up
 * the Redux DevTools and includes 'redux-thunk' for async logic.
 */
const store = configureStore({
  // 1. Reducer: The map of all your state slices
  reducer: rootReducer,

  // 2. Middleware: Functions that run between dispatching an action and the reducer
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware({
      // Disabling serializableCheck prevents errors when passing
      // non-standard data (like Dates or specialized objects) through Redux.
      serializableCheck: false,
    });
  },

  // 3. DevTools: Enables the Redux DevTools browser extension
  // Highly recommended for debugging state changes in real-time.
  devTools: true,
});

export default store;
