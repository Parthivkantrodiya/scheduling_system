import { configureStore } from "@reduxjs/toolkit";
import hostReducer from "./slice/hostSlice";

export const store = configureStore({
  reducer: {
    hosts: hostReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;