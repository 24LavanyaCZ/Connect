export interface Comment{
  id: string;
  userId: string;
  text: string;
};

export interface Post {
  id: string;
  userId: string;
  postImage: string;
  caption: string;
  likes: number;
  time: string;
  comments: Comment[];
}


export type RootStack = {
  Login: undefined,
  SignUp: undefined,
  Home: undefined,
  
}

// export interface CurrUser {
//   uid: string,
//   email: string
// }
export interface User {
  uid: string,
  username: string,
  email: string,
  photoURL: string | null,
  createdAt: string,
  posts: Post[] ,
}

export type UserState = {
  users: User[]
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


export type TabParamList = {
  Home: undefined;
  Search: undefined;
  Create: undefined;
  Reels: undefined;
  Profile: undefined;
}

export type StackParamList = {
  Signup: undefined;
  Login: undefined;
  MyTabs: {
    screen: keyof TabParamList,
    params: TabParamList[keyof TabParamList]   //values of each key in the tab eg: value of key home is userif param...for search its undefined
   }
};
