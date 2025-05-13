import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {Image, StyleSheet, View} from 'react-native';
import Home from '../Screens/Home';
import Search from '../Screens/Search';
import Create from '../Screens/Create';
import Reels from '../Screens/Reels';
import Profile from '../Screens/Profile';
import {TabParamList} from '../Services/types';
import {useSelector} from 'react-redux';
import {RootState} from '../Redux/store';
import Ion from 'react-native-vector-icons/Ionicons';
import Entypo from 'react-native-vector-icons/Entypo';

const MyTabs = () => {
  const Tab = createBottomTabNavigator<TabParamList>();
  const loggedInUser = useSelector((state: RootState) => state.auth.user);
  console.log(loggedInUser, 'loggedin');
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
        // Add other common tab styling here
      }}>
      <Tab.Screen
        name="Home"
        component={Home}
        options={{
          tabBarIcon: () => <Entypo name="home" size={22} color="black" />,
        }}
      />
      <Tab.Screen
        name="Search"
        component={Search}
        options={{
          tabBarIcon: () => (
            <Ion name="search-outline" size={22} color="black" />
          ),
        }}
      />
      <Tab.Screen
        name="Create"
        component={Create}
        options={{
          tabBarIcon: () => <Ion name="add-outline" size={22} color="black" />,
        }}
      />
      <Tab.Screen
        name="Reels"
        component={Reels}
        options={{
          tabBarIcon: () => <Entypo name="video" size={22} color="black" />,
        }}
      />
      <Tab.Screen
        name="Profile"
        component={Profile}
        options={{
          tabBarIcon: () => 
            {
            return loggedInUser?.photoURL !== null ? (
              <Image
                source={{ uri: loggedInUser?.photoURL }}
                style={styles.story} />
            ) : (
              <Image
                source={require('../Assets/Images/user.png')}
                style={styles.story} />
            );
          },
        }}
        //With e.preventDefault(): You prevent the default behavior, so the tab won't switch automatically.
        // In short, e.preventDefault() stops the tab from changing to the Profile screen immediately and allows you to implement any custom behavior before triggering navigation to that screen.
        listeners={({navigation}) => ({
          tabPress: e => {
            e.preventDefault(); // Prevent default behavior
            navigation.navigate('Profile', {
              isOwnProfile: true,
              item: loggedInUser,
              _timestamp: Date.now(), // You are passing _timestamp: Date.now() to force a re-render whenever the tab is pressed, ensuring fresh data is shown (like the latest profile).
            });
          },
        })}
      />
    </Tab.Navigator>
  );
};

export default MyTabs;

const styles = StyleSheet.create({
  story: {
    borderWidth: 1,
    width: 25,
    height: 25,
    borderRadius: 25,
    backgroundColor: 'white',
    borderColor: '#ccc',
  },
});
