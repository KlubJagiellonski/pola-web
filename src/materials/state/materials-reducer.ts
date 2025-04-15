import { createSlice } from "@reduxjs/toolkit";
import { IMaterial } from "materials";

export interface IMaterialsState {
  initialized: boolean;
  data: IMaterial[];
}

const initialState: IMaterialsState = {
  initialized: false,
  data: [],
};

const materialsSlice = createSlice({
  name: "materials",
  initialState,
  reducers: {
    loadMaterials: (state, action) => {
      state.initialized = true;
      state.data = action.payload;
    },
  },
});

export const { loadMaterials } = materialsSlice.actions;
export default materialsSlice.reducer;
