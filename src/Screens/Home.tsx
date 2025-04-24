import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
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
import {dispatch} from '../Services/Data';
import {listenToPosts} from '../Redux/PostsSlice';

const Home = () => {
  // type Route = RouteProp<RootStack, 'Home'>
  // const route = useRoute<Route>()
  // const uid=route.params;
  // console.log(uid,"uid")
  const dummyPosts = Array.from({length: 12}).map((_, i) => ({
    id: i,
    postImage: `https://picsum.photos/seed/${i}/300/300`,
    caption:'Hello World'
  }));
  const loggedInUser = useSelector((state: RootState) => state.auth.user); //get the current user from store
  const allPosts = useSelector((state: RootState) => state.posts.postsArr);
  console.log(loggedInUser, 'loggedin');
  
  const allUsers = useSelector((state: RootState) => state.users);
  //get users from store
  useEffect(() => {
    listenToUsers(dispatch);
    listenToPosts(dispatch);
  }, [dispatch]);
  
  console.log('Users====', allUsers);
  const data = [...dummyPosts, ...allPosts]
  console.log(allPosts, 'pOSTS');
  console.log(allPosts.length);
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
        {/* {Array.from({length: 4}).map((_, i) => (
          <PostView key={i} />
        ))} */}

        <FlatList
          data={data}
          keyExtractor={item => item.id}
          renderItem={({item}) => (
            // <TouchableOpacity onPress={showPost}>
            <View
              style={{
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center',
                marginTop: responsiveHeight(4),
              }}>
              <View
                style={{
                  width: responsiveWidth(90),
                  padding: responsiveWidth(2),
                }}>
                <TouchableOpacity
                  style={{
                    alignItems: 'center',
                    flexDirection: 'row',
                    gap: responsiveWidth(1),
                  }}>
                  <View style={styles.story}></View>
                  <Text>Name</Text>
                </TouchableOpacity>
              </View>

              <Image
                source={{
                  uri: item.postImage,
                }}
                style={styles.postImage}
              />

              <View
                style={{
                  width: responsiveWidth(90),
                  padding: responsiveWidth(2),
                  flexDirection:'row',
                  alignItems:'center',
                  justifyContent:'space-between'
                }}>
                <View style={{
                  flexDirection:'row',
                  gap:responsiveWidth(2),
                  alignItems:'center'
                }}>
                <TouchableOpacity
                  style={{
                  }}>
                  <Icon name="hearto" size={20} />
                </TouchableOpacity>

                <TouchableOpacity
                  style={{
                  }}>
                  <Ion name="chatbox-outline" size={22} />
                </TouchableOpacity>
                </View>
                <TouchableOpacity
                  style={{
                  }}>
                  <Icon name="share" size={20} />
                </TouchableOpacity>
              </View>
            </View>
            // </TouchableOpacity>
          )}
          // style={styles.postsGrid}
        />
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
  story: {
    borderWidth: 1,
    width: responsiveWidth(10),
    height: responsiveWidth(10),
    borderRadius: responsiveWidth(7.5),
    backgroundColor: 'white',
    borderColor: '#ccc',
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
  postImage: {
    width: responsiveWidth(90),
    height: responsiveHeight(60),
  },
});
