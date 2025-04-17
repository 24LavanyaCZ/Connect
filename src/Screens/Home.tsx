import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {useEffect} from 'react';
import {
  responsiveFontSize,
  responsiveHeight,
  responsiveWidth,
} from 'react-native-responsive-dimensions';
import ff from '../Services/fontFamily';
import Icon from 'react-native-vector-icons/AntDesign';
import Ion from 'react-native-vector-icons/Ionicons';
import StoryView from '../Components/StoryView';
import PostView from '../Components/PostView';
import {ScrollView} from 'react-native-gesture-handler';
import {useDispatch, useSelector} from 'react-redux';
import {AppDispatch, RootState, store} from '../Redux/store';
import {listenToUsers} from '../Redux/UserSlice';
import { dispatch } from '../Services/Data';
import { listenToPosts } from '../Redux/PostsSlice';

const Home = () => {
  // type Route = RouteProp<RootStack, 'Home'>
  // const route = useRoute<Route>()
  // const uid=route.params;
  // console.log(uid,"uid")
  const loggedInUser = useSelector((state: RootState) => state.auth.user); //get the current user from store
  
  console.log(loggedInUser, 'loggedin');
  const allUsers = useSelector((state: RootState)=> state.users)
  //get users from store 
  useEffect(()=>{
    listenToUsers(dispatch);
    listenToPosts(dispatch)
  },[dispatch])

  console.log('Users====', allUsers);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.appName}>Connect</Text>
        <View style={styles.iconHeader}>
          <Icon name="hearto" size={20} />
          <Ion name="chatbox-outline" size={22} />
        </View>
      </View>

      {/* STORY */}
      <StoryView />

      {/* POST */}
      <ScrollView showsVerticalScrollIndicator={false}>
        {Array.from({length: 4}).map((_, i) => (
          <PostView key={i} />
        ))}
      </ScrollView>
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: responsiveHeight(1),
    paddingHorizontal: responsiveWidth(4),
  },
  iconHeader: {
    flexDirection: 'row',
    gap: responsiveWidth(3),
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: responsiveWidth(1),
  },
  appName: {
    fontSize: responsiveFontSize(2.5),
    fontFamily: ff.lBI,
  },
});
