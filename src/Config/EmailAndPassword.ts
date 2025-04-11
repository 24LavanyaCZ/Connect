import { createUserWithEmailAndPassword } from '@react-native-firebase/auth';
import { auth, db } from './firebaseConfig';
import { doc, getDoc, serverTimestamp, setDoc } from '@react-native-firebase/firestore';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { AuthState } from '../Services/types';

// export const signUpWithEmailAndPassword = async (email, username, password) => {
//     try {
//       const userCredential = await auth.createUserWithEmailAndPassword(email, password);
//       const user = userCredential.user;
//       console.log(user)
//       const userDoc = await setDoc(doc(db, 'Users', user.uid), {
//         uid: user.uid,
//         username: user.username,
//         email: user.email,
//         photoURL: user.photoURL || null,
//         createdAt: serverTimestamp(),
//       });
  
//       return user;
//     } catch (error) {
//       console.error('Error signing out:', error);
//     }
//   };

export const signUpWithEmailAndPassword = createAsyncThunk(
    'auth/signup',
    async (
      {email,username,password}: AuthState['signup']) => {
      try {
        console.log(password)
        const userCredential = await auth.createUserWithEmailAndPassword(email, password);
        const user = userCredential.user;
        console.log(user.uid)
        console.log('Writing user to Firestore...');
        const userDoc = await setDoc(doc(db, 'Users', user.uid), {
                uid: user.uid,
                username,
                email: user.email,
                photoURL: user.photoURL || null,
                createdAt: serverTimestamp(),
        })
            console.log(userDoc)
            
            return userDoc
       
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
      const addedUser = await getDoc(doc(db, 'Users', user.uid));
      if (addedUser) {
        console.log('Added user data:', addedUser.data());
        const userData = addedUser.data();
        console.log("Login", userData)
        return userData
      }
      
    } catch (error) {
      console.error('Error signing out:', error);
    }
    })
  