import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { getUsersProfile } from "../api/users";
import { getUserData } from "../api/auth";
import { tokenService } from "../services/token.service";

// Создаем thunk
export const fetchUserData = createAsyncThunk(
  "users/fetchUserData", // тип действия
  async () => {
    const response = await getUserData();
    console.log("Фанк с пользователем", response);
    return response;
  }
);

const userDataSlice = createSlice({
  name: "userData",
  initialState: {
    userData: {},
    status: "idle", // 'idle' | 'loading' | 'succeeded' | 'failed'
    error: null,
  },
  reducers: {
    
  },

  extraReducers: (builder) => {
    builder
      .addCase(fetchUserData.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchUserData.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.userData = action.payload;
      })
      .addCase(fetchUserData.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export default userDataSlice.reducer;
export const userDataActions = userDataSlice.actions;
