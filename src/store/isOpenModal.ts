import { createSlice} from "@reduxjs/toolkit";
import store from "./store";
import { User } from "../types/users";
interface ModalState {
  currentUser: User | null;
  activeModal: string | null;
}

const initialState: ModalState = {
    currentUser:  null,
    activeModal: null,
  };
  
  const modalSlice = createSlice ({
    name: "modal",
    initialState,
    reducers: {
      openModal: (state, action) => {
        state.activeModal= action.payload
      },
      closeModal: (state) => {
        state.activeModal = null
      },
      setCurrentUser: (state, action)=> {
        state.currentUser= action.payload
      }
    }
  });

  export default modalSlice.reducer;
  export const modalActions = modalSlice.actions
