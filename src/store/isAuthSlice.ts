import { createSlice } from "@reduxjs/toolkit";
const initialIsAuth = {
    isAuth: false,
  };
  
  const authSlice = createSlice ({
    name: "autorization",
    initialState: initialIsAuth,
    reducers: {
      setAuthStatusTrue: (state) => {
        state.isAuth = true
      },
      setAuthStatusFalse: (state) => {
        state.isAuth = !state.isAuth
      }
    }
  });

  export default authSlice.reducer;
  export const authActions = authSlice.actions