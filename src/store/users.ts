import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import { getUsersProfile } from "../api/users";
import { RootState } from "./store";
import { User, UserFilters,  } from "../types/users";


export const fetchUsers = createAsyncThunk<
  User[], 
  UserFilters | undefined, 
  { state: RootState } 
>("users/fetchUsers", async (arg = {}, { getState }) => {
  const state = getState();
  const usersState = state.users;
  const sortBy = usersState.sortBy; 
  const sortOrder = usersState.sortOrder;
  const isBlocked = usersState.isBlocked;
  const search = usersState.search;
  const response = await getUsersProfile({
    sortBy,
    sortOrder,
    isBlocked,
    search,
  });
  console.log("Фанк вернул", response);
  return response;
});

const usersSlice = createSlice({
  name: "users",
  initialState: {
    userData: {},
    list: [],
    status: "idle", // 'idle' | 'loading' | 'succeeded' | 'failed'
    error: null,
    sortBy: "id",
    sortOrder: "asc",
    isBlocked: "",
    search: "",
  },
  reducers: {
    selectUserProfile(state, action) {
      state.userData = action.payload;
    },
    setSortBy(state, action) {
      state.sortBy = action.payload;
    },
    setSortOrder(state, action) {
      state.sortOrder = action.payload;
    },

    setBlocked(state, action) {
      state.isBlocked = action.payload;
    },
    setSearch(state, action) {
      state.search = action.payload;
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
