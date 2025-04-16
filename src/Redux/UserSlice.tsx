import {createAsyncThunk, createSlice, PayloadAction} from '@reduxjs/toolkit';
import {User, UserState} from '../Services/types';
import { collection, getDocs } from '@react-native-firebase/firestore';
import { db } from '../Config/firebaseConfig';

const initialState: UserState = {
  users: []
};

export const fetchAll = createAsyncThunk('users/fetchAll',async()=>{
  const querySnapshot = await getDocs(collection(db, 'Users'));
  return querySnapshot.docs.map(doc => ({
    uid: doc.id,
    ...doc.data(),
  }));
})

export const UserSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {   
    // addUser: (state, action: PayloadAction<User>) =>{
    //     state.users.push(action.payload)
    // },
    setUsers: (state, action: PayloadAction<User[]>)=>{
      state.users.push(action.payload)
    }
  },
  extraReducers: (builder) => {
    builder.addCase(fetchAll.fulfilled, (state, action: PayloadAction<User[]>) => {
      state.users = action.payload;
    });
  }  
});

export const { setUsers } = UserSlice.actions;
export default UserSlice.reducer;
