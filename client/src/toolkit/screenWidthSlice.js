import { createSlice } from "@reduxjs/toolkit"

const screenWidthSlice = createSlice({
    name: "screenWidth",
    initialState: {
        width: window.innerWidth
    },
    reducers: {
        setWidth: (state, action) => {
            state.width = action.payload;
        }
    }
})

export const { setWidth } = screenWidthSlice.actions
export default screenWidthSlice.reducer;