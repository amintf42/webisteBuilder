// src/app/store.ts
import { configureStore } from "@reduxjs/toolkit";
// import editorReducer from "@/editor/editorSlice";
// import editorReducer from "../editor/editorSlice";
import editorReducer from "@/app/editor/editorSlice";

export const store = configureStore({
  reducer: {
    editor: editorReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
