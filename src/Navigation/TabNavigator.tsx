import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Home from '../Screens/Home';
import Profile from '../Screens/Profile';
import Create from '../Screens/Create';
import Search from '../Screens/Search';
import Ion from 'react-native-vector-icons/Ionicons';
import Entypo from 'react-native-vector-icons/Entypo';
import Reels from '../Screens/Reels';
import { StyleSheet, View } from 'react-native';
import { responsiveHeight, responsiveWidth } from 'react-native-responsive-dimensions';
import { TabParamList } from '../Services/types';


export function MyTabs() {
  
   const Tab = createBottomTabNavigator<TabParamList>();
  return (
    <Tab.Navigator screenOptions={{ headerShown: false, tabBarShowLabel: false,tabBarStyle: { height: responsiveHeight(5) }}}>
      <Tab.Screen name="Home" component={Home} options={{tabBarIcon:()=>(
        <Entypo name="home" size={22} color="black"/>
      )}}/>
      <Tab.Screen name="Search" component={Search} options={{tabBarIcon:()=>(
         <Ion name="search-outline" size={22} color="black" />
      )}}/>
      <Tab.Screen name="Create" component={Create} options={{tabBarIcon:()=>(
         <Ion name="add-outline" size={22} color="black" />
      )}}/>
      <Tab.Screen name="Reels" component={Reels} options={{tabBarIcon:()=>(
         <Entypo name="video" size={22} color="black" />
      )}}/>
      <Tab.Screen name="Profile" component={Profile} options={{tabBarIcon:()=>(
         <View style={styles.story}></View>
      )}}/>
    </Tab.Navigator>
  );
}

export const styles = StyleSheet.create({
   story: {
      borderWidth: 1,
      width: responsiveWidth(6),
      height: responsiveWidth(6),
      borderRadius: responsiveWidth(7.5),
      backgroundColor: 'grey',
      borderColor: '#ccc',
    },
})