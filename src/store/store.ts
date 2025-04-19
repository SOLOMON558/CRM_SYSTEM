import { configureStore } from "@reduxjs/toolkit";
import statusSlice from "./Slice";
import authSlice from "./isAuthSlice"
import accessTokenSlice from "./accessTokenSlice";

const store = configureStore({
  reducer: {
    status: statusSlice,
    autorization: authSlice,
    accessToken: accessTokenSlice,
  },
  
},);

export default store;
