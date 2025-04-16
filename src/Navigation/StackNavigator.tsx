
import { createStackNavigator } from '@react-navigation/stack';
import SignUp from '../Screens/SignUp';
import Login from '../Screens/Login';
import { MyTabs } from './TabNavigator';
import { StackParamList } from '../Services/types';

export function MyStack() {
  
  const Stack = createStackNavigator<StackParamList>();
  return (
    <Stack.Navigator screenOptions={{ headerShown: false}}>
      <Stack.Screen name="Signup" component={SignUp}/>
      <Stack.Screen name="Login" component={Login}/>
      <Stack.Screen name="MyTabs" component={MyTabs}/>

    </Stack.Navigator>
  );
}
