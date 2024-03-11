import { createSlice } from "@reduxjs/toolkit";
const setRestaurantSlice = createSlice({
    name: "restaurant",
    initialState: {array:[],sortArray:[]},
    reducers: {
        setRestaurant: (state,actions) => {
            state.array=actions.payload
        }
    }
})
export const { setRestaurant } = setRestaurantSlice.actions;
export default setRestaurantSlice.reducer;