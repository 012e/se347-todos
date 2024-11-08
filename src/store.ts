import { configureStore } from "@reduxjs/toolkit";
import visibleReducer from "./visibleSlide";

export default configureStore({
  reducer: {
    visible: visibleReducer,
  },
});
