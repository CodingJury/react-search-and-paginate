import { createSlice } from "@reduxjs/toolkit";

export const paginationSlice = createSlice({
    name: "pagination",
    initialState: {
        currentPage: 1,
        itemsPerPage: 5,
        pageNumberLimit: 5,
        minPageNumberLimit: 0,
        maxPageNumberLimit: 5,
    },
    reducers: {
        setCurrentPage: (state, action) => {
            state.currentPage = action.payload 
        },
        setItemsPerPage: (state, action) => {
            state.itemsPerPage = action.payload 
        },
        setPageNumberLimit: (state, action) => {
            state.pageNumberLimit = action.payload 
        },
        setMinPageNumberLimit: (state, action) => {
            state.minPageNumberLimit = action.payload 
        },
        setMaxPageNumberLimit: (state, action) => {
            state.maxPageNumberLimit = action.payload 
        },
    }
})

export const { setCurrentPage, setItemsPerPage, setPageNumberLimit, setMinPageNumberLimit, setMaxPageNumberLimit } = paginationSlice.actions;
export default paginationSlice.reducer;
