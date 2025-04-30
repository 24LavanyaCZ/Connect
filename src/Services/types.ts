import {
  doc,
  FirebaseFirestoreTypes,
  getDoc,
  updateDoc,
} from '@react-native-firebase/firestore';


export interface Comment {
  id: string;
  userId: string;
  text: string;
}

//separate posts db
export interface Post {
  id: string;
  userId: string;
  username: string;
  postImage: string;
  caption: string;
  likes: number;
  likedBy: Array<{uid: string}>;
  time: FirebaseFirestoreTypes.Timestamp | null;
  timeString: string;
  comments: Comment[];
}

export type RootStack = {
  Login: undefined;
  SignUp: undefined;
  Home: undefined;
};

export interface User {
  uid: string;
  username: string;
  email: string;
  desc: string;
  photoURL: string | null;
  // createdAt: string;
  posts: Array<{id: string}>;
}

export type UserState = {
  users: User[];
};

export type PostState = {
  postsArr: Post[];
};
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
  user: User | null;
  loading: boolean;
  error: null;
};

export type TabParamList = {
  Home: undefined;
  Search: undefined;
  Create: undefined;
  Reels: undefined;
  Profile: {
    isOwnProfile?: boolean;
    item?: User;
    _timestamp?: number;
  }
};

export type StackParamList = {
  Signup: undefined;
  Login: undefined;
  MyTabs: {
    screen: keyof TabParamList;
    params: TabParamList[keyof TabParamList]; //values of each key in the tab eg: value of key home is userif param...for search its undefined
  };
  ViewPosts: {
    post: Post;
    loggedIn: User;
  };
  Edit: {
    loggedIn: User;
  };
};


export type ImageData = {
  width?: number;
  height?: number;
  type?: string;
  fileName?: string;
  fileSize?: number;
  uri?: string;
};
