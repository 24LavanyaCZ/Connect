import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import Entypo from 'react-native-vector-icons/Entypo';
import {
  responsiveFontSize,
  responsiveHeight,
  responsiveWidth,
} from 'react-native-responsive-dimensions';
import ff from '../Services/fontFamily';
import Icon from 'react-native-vector-icons/AntDesign';
import Ion from 'react-native-vector-icons/Ionicons';
import StoryView from '../Components/StoryView';
import {ScrollView} from 'react-native-gesture-handler';
import {useDispatch, useSelector} from 'react-redux';
import {AppDispatch, RootState} from '../Redux/store';
import {listenToPosts, updatePost} from '../Redux/PostsSlice';
import {listenToUsers} from '../Redux/UserSlice';
import axios from 'axios';
import {doc, getDoc, updateDoc} from '@react-native-firebase/firestore';
import {db} from '../Config/firebaseConfig';
import {Post} from '../Services/types';
import PostCard from '../Components/PostCard';
import {useNavigation} from '@react-navigation/native';

const Home = () => {
  const dispatch = useDispatch<AppDispatch>();
  const loggedInUser = useSelector((state: RootState) => state.auth.user); //get the current user from store
  const allPosts = useSelector((state: RootState) => state.posts.postsArr);
  const allUsers = useSelector((state: RootState) => state.users);
  const [dummy, setDummy] = useState([]);
  const [liked, setLiked] = useState<Boolean>();
  const navigation = useNavigation();
  console.log(loggedInUser, 'loggedin');
  console.log(allPosts, 'posts');
  // console.log(allUsers, 'users');

  const fetchPosts = async () => {
    console.log('Run server in mockoon');
    const response = await axios.get(
      'http://172.16.16.46:3001/posts/dummyPosts',
    );
    console.log('Data', response.data);
    setDummy(response.data);
    return response.data;
  };

  //get users from store
  useEffect(() => {
    const setup = async () => {
      await fetchPosts();
      const unsubscribeUsers = listenToUsers(dispatch);
      const unsubscribePosts = await listenToPosts(dispatch);

      return () => {
        unsubscribeUsers?.();
        unsubscribePosts?.();
      };
    };
    setup();
  }, [dispatch]);

  const data = [...allPosts, ...dummy];

  const handleLike = async ({item}) => {
    console.log(item);

    const postRef = doc(db, 'Posts', item.id); // Find post based on the id
    const postDoc = await getDoc(postRef); // Get that post document

    if (postDoc) {
      let updatedLikes = 0;
      const postData = postDoc.data() as Post; // Get the post data
      const alreadyLiked = postData.likedBy?.includes(loggedInUser?.uid);
      setLiked(alreadyLiked);
      if (alreadyLiked) {
        updatedLikes = postData.likes - 1;
        const removeLikedBy = postData.likedBy.filter(
          user => user !== loggedInUser?.uid,
        ); // Remove the user who unliked the post
        await updateDoc(postRef, {
          likes: updatedLikes, // Update in Firebase
          likedBy: removeLikedBy,
        });

        // Update local state (Redux)
        dispatch(
          updatePost({
            ...postData,
            likes: updatedLikes,
            likedBy: removeLikedBy,
          }),
        );

        console.log('Likes updated to:', allPosts);
      } else {
        updatedLikes = postData.likes + 1;
        const updatedLikedBy = [...postData.likedBy, loggedInUser?.uid]; // Add the user who liked the post
        await updateDoc(postRef, {
          likes: updatedLikes, // Update in Firebase
          likedBy: updatedLikedBy,
        });

        // Update local state (Redux)
        dispatch(
          updatePost({
            id: item.id,
            likes: updatedLikes,
            likedBy: updatedLikedBy,
          }),
        );

        console.log('Likes updated to:', allPosts);
      }
    } else {
      console.log('Post not found');
    }
  };

  const renderPosts = ({item}) => {
    console.log('DATA', item);
    return (
      <View
        style={{
          flex: 1,
          marginTop: responsiveHeight(2),
        }}>
        <View
          style={{
            width: responsiveWidth(100),
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            paddingHorizontal: responsiveWidth(3),
            paddingVertical: responsiveWidth(2),
          }}>
          <View
            style={{
              alignItems: 'center',
              flexDirection: 'row',
              gap: responsiveWidth(1),
            }}>
            <TouchableOpacity
              onPress={() => {
                console.log('Pressed');
                if (item?.userId === loggedInUser?.uid) {
                  // Navigate to own profile
                  navigation.navigate('MyTabs', {
                    screen: 'Profile',
                    params: {
                      isOwnProfile: true,
                      _timestamp: Date.now(), // Force refresh
                    },
                  });
                } else {
                  // Navigate to another user's profile
                  navigation.navigate('MyTabs', {
                    screen: 'Profile',
                    params: {
                      item, // Pass the user item
                      isOwnProfile: false, // This is NOT the user's own profile
                      _timestamp: Date.now(), // Force refresh
                    },
                  });
                }
              }}>
              <View style={styles.story}></View>
            </TouchableOpacity>
            <Text>{item?.username}</Text>
          </View>
          <TouchableOpacity>
            <Entypo name="dots-three-vertical" size={20} color="black" />
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
            width: responsiveWidth(100),
            paddingHorizontal: responsiveWidth(4),
            paddingVertical: responsiveWidth(2),
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}>
          <View
            style={{
              flexDirection: 'row',
              gap: responsiveWidth(2),
              alignItems: 'center',
            }}>
            <TouchableOpacity
              style={{
                flexDirection: 'row',
                gap: responsiveWidth(1),
                alignItems: 'center',
              }}
              onPress={() => handleLike({item})}>
              {liked ? (
                <Icon name="hearto" size={22} />
              ) : (
                <Icon name="heart" size={22} color="red" />
              )}
            </TouchableOpacity>
            <Text>{item?.likes}</Text>

            <TouchableOpacity
              style={{
                flexDirection: 'row',
                gap: responsiveWidth(1),
                alignItems: 'center',
              }}>
              <Ion name="chatbox-outline" size={22} />
            </TouchableOpacity>
            <Text>
              {item.postImage.startsWith('https://picsum.photos/seed/')
                ? item.comments
                : item.comments.length}
            </Text>
          </View>
          <TouchableOpacity style={{}}>
            <Ion name="share-outline" size={20} />
          </TouchableOpacity>
        </View>
        <View style={styles.captionContainer}>
          <Text style={[{fontFamily: ff.lBI, fontSize: responsiveWidth(3.8)}]}>
            {item?.username}{' '}
          </Text>
          <Text style={[{fontSize: responsiveWidth(3.7)}]}>
            {item?.caption}
          </Text>
        </View>
      </View>
    );
  };

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
      <FlatList
        data={data}
        keyExtractor={item => item.id.toString()}
        renderItem={renderPosts}
      />
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
    width: responsiveWidth(8),
    height: responsiveWidth(8),
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
    width: responsiveWidth(100),
    height: responsiveHeight(55),
  },

  captionContainer: {
    marginHorizontal: responsiveWidth(4),
    flexDirection: 'row',
    alignItems: 'center',
    gap: responsiveWidth(2),
  },
});
