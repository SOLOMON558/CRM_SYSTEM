import { createSlice } from "@reduxjs/toolkit";
const initialAccessToken = {
    accessToken: null
  };
  
  const accessTokenSlice = createSlice ({
    name: "accessToken",
    initialState: initialAccessToken,
    reducers: {
      setAccessToken: (state ,action) => {
        state.accessToken = action.payload
      },
      
    }
  });

  export default accessTokenSlice.reducer;
  export const accessTokenActions= accessTokenSlice.actions