import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { getUsersProfile } from "../api/users";

// Создаем thunk
export const fetchUsers = createAsyncThunk(
  "users/fetchUsers", // тип действия
  async (arg = {}) => {
    const { sortBy, sortOrder, isBlocked, search } = arg;
    console.log(sortOrder, "SORT ORDER В фанке")
    console.log(sortBy, " SORT BY В фанке")
    const response = await getUsersProfile(sortBy, sortOrder, isBlocked,search);
    console.log("Фанк вернул", response);
    return response;
  }
);

const usersSlice = createSlice({
  name: "users",
  initialState: {
    userData: {},
    list: [],
    status: "idle", // 'idle' | 'loading' | 'succeeded' | 'failed'
    error: null,
  },
  reducers: {
    selectUserProfile(state,action) {
      state.userData = action.payload
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(fetchUsers.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.list = action.payload;
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export default usersSlice.reducer;
export const usersActions = usersSlice.actions;
