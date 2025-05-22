import { createSlice } from "@reduxjs/toolkit";
const initialState = {
    isAdmin: false,
    isModer: false
  };
  
  const stuffSlice = createSlice ({
    name: "staff",
    initialState,
    reducers: {
      setAdminStatus: (state) => {
        state.isAdmin = true
      },
      setModerStatus: (state) => {
        state.isModer = true
      }
    }
  });

  export default stuffSlice.reducer;
  export const stuffActions = stuffSlice.actions