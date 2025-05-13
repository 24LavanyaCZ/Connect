import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {Post, PostState} from '../Services/types';
import {collection, onSnapshot} from '@react-native-firebase/firestore';
import {db} from '../Config/firebaseConfig';


const initialState: PostState = {
  postsArr: [],
};





export const listenToPosts = async (dispatch: any) => {
  // 2. Start listening to Firestore posts
  const posts = collection(db, 'Posts');

  const unsubscribe = onSnapshot(posts, (snapshot) => {
    const allPosts: Post[] = snapshot.docs.map(doc => {
      const data = doc.data();
      return {
        id: doc.id,
        ...data,
        time: data.time?.toDate().toISOString(), 
      }
    }) as Post[];

    
    const sortedPosts = allPosts.sort(
      (a, b) =>
        new Date(b.timeString).getTime() - new Date(a.timeString).getTime(),
    );
    dispatch(setAllPosts(sortedPosts));
  });

  return unsubscribe;
};

export const postSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    setAllPosts: (state, action: PayloadAction<Post[]>) => {
      state.postsArr = action.payload;
    },
    updatePost: (state, action: PayloadAction<{ id: string; likes: number; likedBy: string[] }>) => {
      const { id, likes, likedBy } = action.payload;
      const index = state.postsArr.findIndex(post => post.id === id);
      if (index !== -1) {
        state.postsArr[index] = {
          ...state.postsArr[index],
          likes,
          likedBy,
        };
      }
    },    
    deletePost: (state, action: PayloadAction<{ id: string; }>) => {
      const { id } = action.payload;
      state.postsArr = state.postsArr.filter(post => post.id!== id)
    },    
  },
});

export const {setAllPosts, updatePost, deletePost} = postSlice.actions;
export default postSlice.reducer;
