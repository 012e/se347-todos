import { createSlice } from "@reduxjs/toolkit";

export const visibleSlide = createSlice({
  name: "counter",
  initialState: {
    visible: true,
  },
  reducers: {
    toggle: (state) => {
      state.visible = !state.visible;
    },
  },
});

// Action creators are generated for each case reducer function
export const { toggle } = visibleSlide.actions;

export default visibleSlide.reducer;
