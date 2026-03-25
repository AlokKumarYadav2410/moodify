import { configureStore } from "@reduxjs/toolkit";
import songReducer from "../features/home/song.slice";

export const store = configureStore({
  reducer: {
    song: songReducer,
  },
});