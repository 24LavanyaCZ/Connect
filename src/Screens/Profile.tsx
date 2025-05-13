import {
  RouteProp,
  useIsFocused,
  useNavigation,
  useRoute,
} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {RootStackParamList} from '../Navigation/ParamList';
import React, {useEffect} from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  Dimensions,
} from 'react-native';

import {useDispatch, useSelector} from 'react-redux';
import {AppDispatch, RootState} from '../Redux/store';
import Entypo from 'react-native-vector-icons/Entypo';
import {
  responsiveFontSize,
  responsiveHeight,
  responsiveWidth,
} from 'react-native-responsive-dimensions';
import {
  Menu,
  MenuOptions,
  MenuOption,
  MenuTrigger,
} from 'react-native-popup-menu';
import ff from '../Services/fontFamily';
import {logout} from '../Config/EmailAndPassword';
import {Post, TabParamList} from '../Services/types';
import {listenToUsers} from '../Redux/UserSlice';

const Profile = () => {
  const route = useRoute<RouteProp<TabParamList, 'Profile'>>();
  const loggedIn = useSelector((state: RootState) => state.auth.user);
  const allPosts = useSelector((state: RootState) => state.posts.postsArr);
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const isFocused = useIsFocused();
  const dispatch = useDispatch<AppDispatch>();

  // 💡 Dynamically determine profile view
  const isOwnProfile = !route.params?.item || route.params.isOwnProfile;
  const currentProfileUser = isOwnProfile ? loggedIn : route.params.item;

  // 🔄 Real-time Firestore updates
  useEffect(() => {
    const unsubscribeUsers = listenToUsers(dispatch);
    return () => unsubscribeUsers?.();
  }, [dispatch]);

  // 📝 Filter posts for current profile
  const userPostIds = currentProfileUser?.posts?.map(p => p.id) || [];
  const posts = allPosts.filter(post =>
    isOwnProfile
      ? userPostIds.includes(post.id)
      : post.userId === currentProfileUser?.uid,
  );

  // 🔄 Reset to own profile on tab press
  useEffect(() => {
    const unsubscribe = navigation.addListener('tabPress', e => {
      if (route.name === 'Profile') {
        e.preventDefault();
        navigation.navigate('Profile', {isOwnProfile: true});
      }
    });
    return unsubscribe;
  }, [navigation, route.name]);

  const handleLogout = async () => {
    try {
      await logout();
      navigation.navigate('Login');
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  const handleEdit = () => {
    navigation.navigate('Edit', {loggedIn});
  };

  const handleFollow = () => {
    console.log('Follow');
  };

  const showPost = (item: Post) => {
    navigation.navigate('ViewPosts', {post: item});
  };

  return (
    <View style={styles.container}>
      {isOwnProfile && (
        <View
          style={{
            position: 'absolute',
            right: responsiveWidth(4),
            top: 10,
          }}>
          <Menu>
            <MenuTrigger>
              <Entypo name="dots-three-vertical" size={20} color="black" />
            </MenuTrigger>
            <MenuOptions
              customStyles={{
                optionsContainer: {
                  width: 150,
                  padding: 5,
                  borderRadius: 8,
                  backgroundColor: 'white',
                },
              }}>
              <MenuOption onSelect={() => console.log('Settings')}>
                <Text>Settings</Text>
              </MenuOption>
              <MenuOption onSelect={handleLogout}>
                <Text style={{color: 'red'}}>Logout</Text>
              </MenuOption>
            </MenuOptions>
          </Menu>
        </View>
      )}

      {/* Top Section */}
      <View style={styles.topSection}>
        {currentProfileUser?.photoURL!==null ? (
          <Image source={{uri: currentProfileUser?.photoURL}}
            style={styles.profilePic}
          />       
        ) : (
          <Image
            source={require('../Assets/Images/user.png')}
            style={styles.profilePic}
          />
        )}

        <View style={styles.stats}>
          <View style={styles.stat}>
            <Text style={styles.statNumber}>{posts.length || 0}</Text>
            <Text style={styles.statLabel}>Posts</Text>
          </View>
          <View style={styles.stat}>
            <Text style={styles.statNumber}>1.2k</Text>
            <Text style={styles.statLabel}>Followers</Text>
          </View>
          <View style={styles.stat}>
            <Text style={styles.statNumber}>180</Text>
            <Text style={styles.statLabel}>Following</Text>
          </View>
        </View>
      </View>

      {/* Username */}
      <Text style={styles.username}>
        {currentProfileUser?.username || 'User'}
      </Text>
      <Text style={[styles.username, {fontSize: responsiveFontSize(1.5)}]}>
        {currentProfileUser?.desc || ''}
      </Text>

      {/* Edit / Follow Button */}
      <TouchableOpacity
        style={
          isOwnProfile
            ? styles.editProfileBtn
            : [styles.editProfileBtn, {backgroundColor: '#1877F2'}]
        }
        onPress={isOwnProfile ? handleEdit : handleFollow}>
        <Text
          style={[styles.editProfileText, !isOwnProfile && {color: '#FFFFFF'}]}>
          {isOwnProfile ? 'Edit Profile' : 'Follow'}
        </Text>
      </TouchableOpacity>

      {/* Posts Grid */}
      <FlatList
        data={posts}
        keyExtractor={item => item.id}
        numColumns={3}
        renderItem={({item}) => (
          <TouchableOpacity onPress={() => showPost(item)}>
            <Image source={{uri: item.postImage}} style={styles.postImage} />
          </TouchableOpacity>
        )}
        style={styles.postsGrid}
      />
    </View>
  );
};

export default Profile;

const styles = StyleSheet.create({
  container: {flex: 1, backgroundColor: 'white', paddingHorizontal: 10},
  topSection: {flexDirection: 'row', alignItems: 'center', marginTop: 20},
  profilePic: {
    width: responsiveWidth(20),
    height: responsiveWidth(20),
    borderRadius: responsiveWidth(10),
  },
  iconDot: {
    position: 'absolute',
    right: responsiveWidth(4),
  },
  stats: {flexDirection: 'row', justifyContent: 'space-around', flex: 1},
  stat: {alignItems: 'center'},
  statNumber: {fontSize: responsiveFontSize(2), fontWeight: 'bold'},
  statLabel: {fontSize: responsiveFontSize(1.5), color: 'gray'},
  username: {
    marginTop: responsiveHeight(1),
    fontSize: responsiveFontSize(2),
    fontFamily: ff.lBI,
  },
  editProfileBtn: {
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    paddingVertical: 5,
    alignItems: 'center',
    marginTop: 10,
  },
  editProfileText: {fontSize: responsiveFontSize(1.7), fontFamily: ff.lBI},
  postsGrid: {marginTop: 10},
  postImage: {
    width: Dimensions.get('window').width / 3 - responsiveWidth(2),
    height: Dimensions.get('window').width / 3 - responsiveWidth(1),
    marginTop: responsiveHeight(1),
    marginRight: responsiveWidth(1),
  },
});
