import { createSlice } from "@reduxjs/toolkit";

export const querySlice = createSlice({
    name: "query",
    initialState: {
        queryString: "",
        showPaidStudents: false
    },
    reducers: {
        updateQuery: (state, action) => {
            state.queryString = action.payload 
        },
        togglePaidStudents: (state, action) => {
            state.showPaidStudents = action.payload
        }
    }
})

export const {updateQuery, togglePaidStudents} = querySlice.actions;
export default querySlice.reducer;
