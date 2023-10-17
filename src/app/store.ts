import { configureStore } from "@reduxjs/toolkit";

// reducer
import showFilterReducer from "../features/showFilter/showFilterSlice";

const store = configureStore({
  reducer: {
    showFilter: showFilterReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;