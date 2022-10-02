import { createSlice } from "@reduxjs/toolkit";
// usersArray: [
//     {first_name:"Dhananjay", last_name: "Patel", email_id: "dp@gmail.com", is_paid: false},
//     {first_name:"Akash", last_name: "Patel", email_id: "ap@gmail.com", is_paid: true}
// ],
export const userSlice = createSlice({
    name: "user",
    initialState: {
        usersArray: [],
    },
    reducers: {
        replaceToNewUsers: (state, action) => {
            state.usersArray = [...action.payload] 
        },
        markAsPaid: (state, action) => {
            state.usersArray =  state.usersArray.map((user)=>user.id===action.payload?{...user, is_paid: true}:user)
        },
        deleteAddData: (state, action) => {
            state.usersArray = [];
        }
    }
})

export const {replaceToNewUsers, markAsPaid, deleteAddData} = userSlice.actions;
export default userSlice.reducer;
