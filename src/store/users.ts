import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { getUsersProfile } from "../api/users";

// Создаем thunk
export const fetchUsers = createAsyncThunk(
  "users/fetchUsers", // тип действия
  async (arg = {}, { getState }) => {
    const state = getState();
    const usersState = state.users;
    const sortBy = arg.sortBy ?? usersState.sortBy;
    const sortOrder = arg.sortOrder ?? usersState.sortOrder;
    const isBlocked = arg.isBlocked ?? usersState.isBlocked;
    const search = arg.search ?? usersState.search;
    const response = await getUsersProfile(
      sortBy,
      sortOrder,
      isBlocked,
      search
    );
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
    sortBy: "id", // начальное значение сортировки
    sortOrder: "asc", // направление сортировки
    isBlocked: "", // фильтр по блокировке
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
