import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Post, PostState } from "../Services/types";
import { collection, onSnapshot } from "@react-native-firebase/firestore";
import { db } from "../Config/firebaseConfig";



const initialState: PostState  = {
    postsArr: []
}

export const listenToPosts = (dispatch:any)=>{
    const posts = collection(db, 'Posts')
    onSnapshot(posts, (snapshot)=>{
      const allPosts : Post[] = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as Post[]
  
      dispatch(setAllPosts(allPosts))
    })
  }
  
export const postSlice = createSlice({
    name:'posts',
    initialState,
    reducers:{
        setAllPosts: (state,action:PayloadAction<Post[]>)=>{
            state.postsArr = action.payload
        },
    }
})


export const { setAllPosts } = postSlice.actions;
export default postSlice.reducer;