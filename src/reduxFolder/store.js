import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./userSlice"
import queryReducer from "./querySlice";
import paginationReducer from "./paginationSlice";

export default configureStore({
    reducer: {
        user: userReducer,
        query: queryReducer,
        pagination: paginationReducer,
    },
})