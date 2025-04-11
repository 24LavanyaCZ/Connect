import {initializeApp} from '@react-native-firebase/app';
import {getAuth} from '@react-native-firebase/auth';
import {getFirestore} from '@react-native-firebase/firestore'
import {API_KEY, PROJECT_ID, ANDROID_APP_ID, STORAGE_BUCKET} from '@env';


const firebaseConfig = {
  apiKey: process.env.API_KEY || 'default',
  projectId: process.env.PROJECT_ID || 'default',
  storageBucket: process.env.STORAGE_BUCKET || 'default',
  appId: process.env.ANDROID_APP_ID || 'default',
};

const app = initializeApp(firebaseConfig);

const auth = getAuth(app);
const db = getFirestore(app)

export {auth,db};
