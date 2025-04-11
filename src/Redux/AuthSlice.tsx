import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {AuthState} from '../Services/types';
import {signUpWithEmailAndPassword} from '../Config/EmailAndPassword';

const initialState: AuthState = {
  login: {
    email: '',
    password: '',
  },
  signup: {
    email: '',
    username: '',
    password: '',
  },
  user: null,
  loading: false,
  error: null,
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login: (
      state,
      action: PayloadAction<{email: string; password: string}>,
    ) => {
      state.login.email = action.payload.email;
      state.login.password = action.payload.password;
    },
    signup: (
      state,
      action: PayloadAction<{
        email: string;
        username: string;
        password: string;
      }>,
    ) => {
      state.signup.email = action.payload.email;
      state.signup.username = action.payload.username;
      state.signup.password = action.payload.password;
    },
    setUser: (state, action: PayloadAction<any>) => {
      state.user = action.payload;
    },
  },
//   extraReducers: builder => {
//     builder
//       .addCase(signUpWithEmailAndPassword.pending, state => {
//         state.loading = true;
//         state.error = null;
//       })
//       .addCase(signUpWithEmailAndPassword.fulfilled, (state, action) => {
//         state.loading = false;
//         state.user = action.payload;
//       })
//       .addCase(signUpWithEmailAndPassword.rejected, (state, action) => {
//         state.loading = false;
//         state.error = action.payload;
//       });
//   },
});

export const {login, signup, setUser} = authSlice.actions;
export default authSlice.reducer;
