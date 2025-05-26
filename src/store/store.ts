import { configureStore } from "@reduxjs/toolkit";
import statusSlice from "./Slice";
import authSlice from "./isAuthSlice"
import stuffSlice from "./isStuff"
import usersSlice from "./users"
import modalSlice from "./isOpenModal"
import userDataSlice from "./userData"

const store = configureStore({
  reducer: {
    status: statusSlice,
    autorization: authSlice,
    stuff: stuffSlice,
    users: usersSlice,
    modal: modalSlice,
    userData: userDataSlice,
  
  },})
  

export default store;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
