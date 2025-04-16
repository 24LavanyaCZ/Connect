import { createUserWithEmailAndPassword } from '@react-native-firebase/auth';
import { auth, db } from './firebaseConfig';
import { doc, getDoc, serverTimestamp, setDoc } from '@react-native-firebase/firestore';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { AuthState, User } from '../Services/types';


export const signUpWithEmailAndPassword = createAsyncThunk(
    'auth/signup',
    async (
      {email,username,password}: AuthState['signup']) => {
      try {
        console.log(password)
        const userCredential = await auth.createUserWithEmailAndPassword(email, password);
        const user = userCredential.user;
        console.log(user.uid)

        const currUser = {
            uid: user.uid,
            email: user.email || '',
        }

        const userData = {
          uid: user.uid,
          username,
          email: user.email || '',
          photoURL: user.photoURL || null,
          createdAt: serverTimestamp(),
          posts: []
        }
        const userDoc = await setDoc(doc(db, 'Users', user.uid), userData )

        return currUser

      } catch (error: any) {
        console.log(error)
      }
    }
  );
  
  export const signInWithEandPass = createAsyncThunk(
    'auth/login',
    async ({email, password}:AuthState['login']) => {
      try {
        const userInfo = await auth.signInWithEmailAndPassword(email, password);
        const user = userInfo.user
        console.log("Id", user)
        const addedUser  = await getDoc(doc(db, 'Users', user.uid));
        if (addedUser) {
          console.log('Added user data:', addedUser.data());
          const userData = addedUser.data();  
          return userData as User
        }
        return null
      
    } catch (error) {
      console.error('Error signing out:', error);
    }
    })
  