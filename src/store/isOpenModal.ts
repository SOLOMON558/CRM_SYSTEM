import { createSlice} from "@reduxjs/toolkit";
const initialState = {
    currentUser: null,
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