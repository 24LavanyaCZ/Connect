import { configureStore } from "@reduxjs/toolkit";
import { postSlice } from "./PostsSlice";
import { authSlice } from "./AuthSlice";
import { UserSlice } from "./UserSlice";


export const store = configureStore({
    reducer:{
        posts: postSlice.reducer,
        auth: authSlice.reducer,
        users: UserSlice.reducer
    }
})

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
