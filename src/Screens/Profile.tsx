import {RouteProp, useNavigation, useRoute} from '@react-navigation/native';
import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  Dimensions,
} from 'react-native';
import {useSelector} from 'react-redux';
import {RootState} from '../Redux/store';
import Entypo from 'react-native-vector-icons/Entypo';
import {
  responsiveHeight,
  responsiveWidth,
} from 'react-native-responsive-dimensions';
import {
  Menu,
  MenuOptions,
  MenuOption,
  MenuTrigger,
} from 'react-native-popup-menu';
import {logout} from '../Config/EmailAndPassword';

const Profile = () => {
  const loggedIn = useSelector((state: RootState) => state.auth.user);
  const allPosts = useSelector((state: RootState) => state.posts.postsArr);

  const [showPostModal, setShowPostModal] = useState<Boolean>(false)
  const navigation = useNavigation();
  // console.log('UserId in profile', user);
  // console.log('posts====', allPosts);
  const userPostIds = loggedIn?.posts?.map(p => p.id) || [];
  const posts = allPosts.filter(post => userPostIds.includes(post.id));

  const handleLogout = async () => {
    try {
      console.log('Logging out...');
      await logout();
      console.log('Logged out successfully');
      navigation.navigate('Login');
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };


  const showPost = ()=>{
    setShowPostModal(!showPostModal)
  }
  return (
    <View style={styles.container}>
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
            <MenuOption onSelect={() => handleLogout()}>
              <Text style={{color: 'red'}}>Logout</Text>
            </MenuOption>
          </MenuOptions>
        </Menu>
      </View>

      {/* Top Section */}
      <View style={styles.topSection}>
        <Image
          source={{uri: 'https://i.pravatar.cc/150?img=5'}}
          style={styles.profilePic}
        />
        <View style={styles.stats}>
          <View style={styles.stat}>
            <Text style={styles.statNumber}>24</Text>
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
      <Text style={styles.username}>{loggedIn?.username}</Text>

      {/* Edit Profile Button */}
      <TouchableOpacity style={styles.editProfileBtn}>
        <Text style={styles.editProfileText}>Edit Profile</Text>
      </TouchableOpacity>

      {/* Posts Grid */}
      <FlatList
        data={posts}
        keyExtractor={item => item.id}
        numColumns={3}
        renderItem={({item}) => (
          <TouchableOpacity onPress={showPost}>
            <Image
              source={{
                uri: item.postImage,
              }}
              style={styles.postImage}
            />
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
    width: 80,
    height: 80,
    borderRadius: 40,
    marginRight: 20,
  },
  iconDot: {
    position: 'absolute',
    right: responsiveWidth(4),
  },
  stats: {flexDirection: 'row', justifyContent: 'space-between', flex: 1},
  stat: {alignItems: 'center'},
  statNumber: {fontSize: 16, fontWeight: 'bold'},
  statLabel: {fontSize: 12, color: 'gray'},
  username: {marginTop: 10, fontSize: 16, fontWeight: '500'},
  editProfileBtn: {
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    paddingVertical: 5,
    alignItems: 'center',
    marginTop: 10,
  },
  editProfileText: {fontSize: 14},
  postsGrid: {marginTop: 10},
  postImage: {
    width: Dimensions.get('window').width / 3 - responsiveWidth(2),
    height: Dimensions.get('window').width / 3 - responsiveWidth(1),
    marginTop: responsiveHeight(2),
    marginRight: responsiveWidth(1)
  },
});
