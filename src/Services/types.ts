export interface Comment{
  id: string;
  user: string;
  text: string;
};

export interface Post {
  id: string;
  username: string;
  profileImage: string;
  postImage: string;
  caption: string;
  likes: number;
  time: string;
  comments: Comment[];
}


export type RootStack = {
  Login: undefined,
  SignUp: undefined,
  Home: {userId: string}
}
export interface User {
  uid: string,
  username: string,
  email: string,
  photoURL: string,
  createdAt: string,
}

export type AuthState = {
  login: {
    email: string;
    password: string;
  };
  signup: {
    email: string;
    username: string;
    password: string;
  };
  user: User | null,
  loading: boolean,
  error: null,
};