import { createSlice } from "@reduxjs/toolkit";
const initialState = {
    accessToken: null
  };
  
  const accessTokenSlice = createSlice ({
    name: "accessToken",
    initialState,
    reducers: {
      setAccessToken: (state ,action) => {
        state.accessToken = action.payload
      },
      clearAccessToken:(state, action)=> {
        state.accessToken = null
      }

      
    }
  });

  export default accessTokenSlice.reducer;
  export const accessTokenActions= accessTokenSlice.actions