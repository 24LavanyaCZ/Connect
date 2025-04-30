
import { createStackNavigator } from '@react-navigation/stack';
import SignUp from '../Screens/SignUp';
import Login from '../Screens/Login';
import ViewPosts from '../Screens/ViewPosts';
import { StackParamList } from '../Services/types';
import MyTabs from './TabNavigator';
import EditProfile from '../Screens/EditProfile';

export function MyStack() {
  
  const Stack = createStackNavigator<StackParamList>();
  return (
    <Stack.Navigator screenOptions={{ headerShown: false}}>
      <Stack.Screen name="Signup" component={SignUp}/>
      <Stack.Screen name="Login" component={Login}/>
      <Stack.Screen name="MyTabs" component={MyTabs}/>
      <Stack.Screen name="ViewPosts" component={ViewPosts} initialParams={{post: null, loggedIn:null}}/>
      <Stack.Screen name="Edit" component={EditProfile} initialParams={{loggedIn:null}}/>
    </Stack.Navigator>
  );
}
