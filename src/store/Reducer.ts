import { configureStore } from "@reduxjs/toolkit";
import statusReducer from "./Slice";

const store = configureStore({
  reducer: {
    status: statusReducer,
  },
});

export default store;
