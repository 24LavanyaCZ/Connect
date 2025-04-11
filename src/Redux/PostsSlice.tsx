import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Post } from "../Services/types";

const initialState: Post[] = [
    {
      id: '1',
      username: 'lavanya.codes',
      profileImage: 'https://randomuser.me/api/portraits/women/44.jpg',
      postImage: 'https://source.unsplash.com/600x600/?nature,water',
      caption: 'Exploring the beauty of nature 🌿💧',
      likes: 120,
      time: '2h',
      comments:[]
    },
    {
      id: '2',
      username: 'tech_guru',
      profileImage: 'https://randomuser.me/api/portraits/men/33.jpg',
      postImage: 'https://source.unsplash.com/600x600/?technology,code',
      caption: 'New setup, new vibes 🔥💻',
      likes: 210,
      time: '3h',
      comments:[]
    },
    {
      id: '3',
      username: 'travel.dreamer',
      profileImage: 'https://randomuser.me/api/portraits/women/22.jpg',
      postImage: 'https://source.unsplash.com/600x600/?travel,beach',
      caption: 'Sandy toes & ocean breeze 🌊☀️',
      likes: 98,
      time: '5h',
      comments:[]
    },
  ]

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