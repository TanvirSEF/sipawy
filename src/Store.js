import { configureStore } from "@reduxjs/toolkit";
import Productslice from "./components/Slice/Productslice";

export const store = configureStore({
  reducer: {
    order: Productslice,
  },
});
