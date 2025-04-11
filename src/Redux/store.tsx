import { configureStore } from "@reduxjs/toolkit";
import { postSlice } from "./PostsSlice";
import { authSlice } from "./AuthSlice";


export const store = configureStore({
    reducer:{
        // posts: postSlice.reducer,
        auth: authSlice.reducer
    }
})
console.log(store.getState())
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
