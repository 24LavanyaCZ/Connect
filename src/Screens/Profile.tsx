import {RouteProp, useRoute} from '@react-navigation/native';
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
import { useDispatch, useSelector } from 'react-redux';
import { fetchAll } from '../Redux/UserSlice';
import { AppDispatch, RootState } from '../Redux/store';

const Profile = () => {
  // console.log('UserId in profile', user);
  return (
    <View style={styles.container}>
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
      {/* <Text style={styles.username}>{user?.username}</Text> */}

      {/* Edit Profile Button */}
      <TouchableOpacity style={styles.editProfileBtn}>
        <Text style={styles.editProfileText}>Edit Profile</Text>
      </TouchableOpacity>

      {/* Posts Grid */}
      {/* <FlatList
        data={dummyPosts}
        keyExtractor={item => item.id}
        numColumns={3}
        renderItem={({item}) => (
          <Image source={{uri: item.image}} style={styles.postImage} />
        )}
        style={styles.postsGrid}
      /> */}
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
    width: Dimensions.get('window').width / 3 - 2,
    height: Dimensions.get('window').width / 3 - 2,
    margin: 1,
  },
});
