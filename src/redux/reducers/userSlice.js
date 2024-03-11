import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
    name: "user",
    initialState: { data: {} },
    reducers: {
        login: (state, action) => {
            state.data = action.payload;
            sessionStorage.setItem('user', JSON.stringify(action.payload));
        }
    },
});

export const { login } = userSlice.actions;

export default userSlice.reducer;
