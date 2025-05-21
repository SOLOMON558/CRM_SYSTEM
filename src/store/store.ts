import { configureStore } from "@reduxjs/toolkit";
import statusSlice from "./Slice";
import authSlice from "./isAuthSlice"


const store = configureStore({
  reducer: {
    status: statusSlice,
    autorization: authSlice,

  },
},);

export default store;
