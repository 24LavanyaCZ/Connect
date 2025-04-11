
import { createStackNavigator } from '@react-navigation/stack';
import SignUp from '../Screens/SignUp';
import Login from '../Screens/Login';
import { MyTabs } from './TabNavigator';
const Stack = createStackNavigator();

export function MyStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false}}>
      <Stack.Screen name="Signup" component={SignUp}/>
      <Stack.Screen name="Login" component={Login}/>
      <Stack.Screen name="MyTabs" component={MyTabs}/>

    </Stack.Navigator>
  );
}

