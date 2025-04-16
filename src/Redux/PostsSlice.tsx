import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Post } from "../Services/types";

// const dummyPosts = Array.from({length: 12}).map((_, i) => ({
//   id: i.toString(),
//   image: `https://picsum.photos/seed/${i}/300/300`,
// }));

const initialState: Post[]  = []

export const postSlice = createSlice({
    name:'posts',
    initialState,
    reducers:{
        addPost: (state,action:PayloadAction<Post>)=>{
            state.push(action.payload)
        }, 
        
    }
})

export const { addPost } = postSlice.actions;
export default postSlice.reducer;