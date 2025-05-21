import { createSlice } from "@reduxjs/toolkit";
const initialIsAuth = {
    isAuth: false,
  };
  
  const authSlice = createSlice ({
    name: "autorization",
    initialState: initialIsAuth,
    reducers: {
      login: (state) => {
        state.isAuth = true
      },
      logout: (state) => {
        state.isAuth = false
      }
    }
  });

  export default authSlice.reducer;
  export const authActions = authSlice.actions