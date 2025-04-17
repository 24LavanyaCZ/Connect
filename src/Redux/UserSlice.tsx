import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {User, UserState} from '../Services/types';
import { collection, onSnapshot } from '@react-native-firebase/firestore';
import { db } from '../Config/firebaseConfig';

const initialState: UserState = {
  users: []
};

export const UserSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {   
    // addUser: (state, action: PayloadAction<User>) =>{
    //     state.users.push(action.payload)
    // },
    setAllUsers: (state, action: PayloadAction<User[]>)=>{
      state.users = action.payload
    }
  },
});

export const listenToUsers = (dispatch:any)=>{
  const users = collection(db, 'Users')
  onSnapshot(users, (snapshot)=>{
    const allUsers : User[] = snapshot.docs.map(doc => ({
      uid: doc.id,
      ...doc.data()
    })) as User[]

    dispatch(setAllUsers(allUsers))
  })
}

export const { setAllUsers } = UserSlice.actions;
export default UserSlice.reducer;
