import { configureStore } from '@reduxjs/toolkit';
import screenWidthReducer from "./screenWidthSlice.js"

export const store = configureStore({
    reducer: {
        screenWidth: screenWidthReducer,
    },
});