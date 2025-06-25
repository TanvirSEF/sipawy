import { configureStore } from "@reduxjs/toolkit";
import Productslice from "./Components/Slice/Productslice"


export const store = configureStore({
  reducer: {
    order: Productslice,
  },
});
