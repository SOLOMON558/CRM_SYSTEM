import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  currentStatusType: "all",
};


const statusSlice = createSlice({
  name: "status",
  initialState,
  reducers: {
    setStatus: (state, action) => {
      state.currentStatusType = action.payload;
    },
  },
});



export const { setStatus } = statusSlice.actions;
export default statusSlice.reducer;
