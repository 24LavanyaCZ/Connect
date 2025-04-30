import {Alert, Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {useEffect} from 'react';
import {useRoute, RouteProp, useNavigation} from '@react-navigation/native';
import {Post, RootStack} from '../Services/types';
import {
  responsiveHeight,
  responsiveWidth,
} from 'react-native-responsive-dimensions';
import Icon from 'react-native-vector-icons/AntDesign';
import Ion from 'react-native-vector-icons/Ionicons';
import Entypo from 'react-native-vector-icons/Entypo';
import ff from '../Services/fontFamily';
import {deleteDoc, doc, getDoc, updateDoc} from '@react-native-firebase/firestore';
import {db} from '../Config/firebaseConfig';
import {useSelector} from 'react-redux';
import {RootState} from '../Redux/store';
import {deletePost, listenToPosts, updatePost} from '../Redux/PostsSlice';
import {dispatch} from '../Services/Data';
import {
  Menu,
  MenuOption,
  MenuOptions,
  MenuTrigger,
} from 'react-native-popup-menu';

const ViewPosts = () => {
  const navigation = useNavigation();
  
  const route = useRoute<RouteProp<RootStack, 'ViewPosts'>>();
  const {post} = route.params;
  const loggedIn = useSelector((state: RootState) => state.auth.user);
  console.log(loggedIn);

  console.log('Post', post);
  const date = new Date(post?.timeString);

  const formattedDate = date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
  const getTimeAgo = (timestamp: string) => {
    const date = new Date(timestamp);
    const now = new Date();
    const seconds = Math.floor((now.getTime() - date.getTime()) / 1000);

    if (seconds < 60) {
      return 'Just now';
    } else if (seconds < 3600) {
      const minutes = Math.floor(seconds / 60);
      return `${minutes} minute${minutes > 1 ? 's' : ''} ago`;
    } else if (seconds < 86400) {
      const hours = Math.floor(seconds / 3600);
      return `${hours} hour${hours > 1 ? 's' : ''} ago`;
    } else {
      const formattedDate = date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      });
      return formattedDate;
    }
  };

  const alreadyLiked = post.likedBy?.includes(loggedIn?.uid);

  const handleDelete = async({post}) => {
    console.log('Clicked');
    const postRef = doc(db, 'Posts', post.id); //find post based on the id
    const postDoc = await getDoc(postRef); //get that post document

    if (postDoc) {
      const postData = postDoc.data() as Post; //its data
      console.log(postData);
      await deleteDoc(postRef);

        // dispatch(
        //   updatePost({
        //     ...postData,
        //     likes: updatedLikes,
        //     likedBy: removeLikedBy,
        //   }),
        // );
         Alert.alert(
              'Post deleted successfully',
              '',
              [
                {
                  text: 'OK',
                  onPress: () => {
                    navigation.navigate('MyTabs',{screen: 'Profile',params: undefined});
                  },
                },
              ],
              { cancelable: false }
            );
            dispatch(deletePost(post.id));
        console.log('deleted:', post.id);
    } else {
      console.log('Post not found');
    }
  };
  const handleLike = async ({post}) => {
    console.log(post);
    const postRef = doc(db, 'Posts', post.id); //find post based on the id
    const postDoc = await getDoc(postRef); //get that post document

    if (postDoc) {
      let updatedLikes = 0;
      const postData = postDoc.data() as Post; //its data
      console.log(postData);

      if (alreadyLiked) {
        updatedLikes = postData.likes - 1;
        const removeLikedBy = postData.likedBy.filter(
          user => user !== loggedIn?.uid,
        ); //remove the user who unliked the post
        await updateDoc(postRef, {
          likes: updatedLikes, //update in firebase
          likedBy: removeLikedBy,
        });

        dispatch(
          updatePost({
            ...postData,
            likes: updatedLikes,
            likedBy: removeLikedBy,
          }),
        );
        console.log('Likes updated to:', updatedLikes);
      } else {
        updatedLikes = postData.likes + 1;
        const updatedLikedBy = [...postData.likedBy, loggedIn?.uid]; //add the user who liked the post
        await updateDoc(postRef, {
          likes: updatedLikes, //update in firebase
          likedBy: updatedLikedBy,
        });
        dispatch(
          updatePost({
            ...postData,
            likes: updatedLikes,
            likedBy: updatedLikedBy,
          }),
        );

        console.log('Likes updated to:', updatedLikes);
      }
    } else {
      console.log('Post not found');
    }
  };
  return (
    <View style={styles.container}>
      {/* Post Header */}
      <View style={styles.postHeader}>
        <TouchableOpacity style={styles.userInfo}>
          <View style={styles.story}></View>
          <Text style={[styles.username, {fontFamily: ff.lBI}]}>
            {post?.username}
          </Text>
        </TouchableOpacity>

        <View
          style={{
            position: 'absolute',
            right: responsiveWidth(4),
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

              <MenuOption onSelect={()=>handleDelete({post})}>
                <Text style={{color: 'red'}}>Delete</Text>
              </MenuOption>
            </MenuOptions>
          </Menu>
        </View>
      </View>

      {/* Post Image */}
      <Image source={{uri: post?.postImage}} style={styles.postImage} />

      {/* Post Footer */}
      <View style={styles.postFooter}>
        <View style={styles.actionRow}>
          <TouchableOpacity
            style={styles.iconButton}
            onPress={() => handleLike({post})}>
            {alreadyLiked ? (
              <Icon name="heart" size={22} color="red" />
            ) : (
              <Icon name="hearto" size={22} />
            )}
          </TouchableOpacity>
          <Text style={styles.likes}>{post?.likes}</Text>
          <TouchableOpacity style={styles.iconButton}>
            <Ion name="chatbox-outline" size={22} />
            <Text style={styles.likes}>{post?.comments.length}</Text>
          </TouchableOpacity>
        </View>
        <TouchableOpacity style={styles.iconButton}>
          <Ion name="share-outline" size={22} />
        </TouchableOpacity>
      </View>

      {/* Caption */}
      <View style={styles.captionContainer}>
        <Text style={[{fontFamily: ff.lBI, fontSize: responsiveWidth(3.8)}]}>
          {post?.username}{' '}
        </Text>
        <Text style={[{fontSize: responsiveWidth(3.7)}]}>{post?.caption}</Text>
      </View>

      {/* Comments */}
      {/* {Array.isArray(post?.comments) && post.comments.length > 0 && (
        <TouchableOpacity style={styles.viewComments}>
          <Text style={{color: 'gray'}}>
            View all {post.comments.length} comments
          </Text>
        </TouchableOpacity>
      )} */}

      <Text style={styles.date}>
        {/* {formattedDate} */}
        {getTimeAgo(post?.timeString)}
      </Text>
    </View>
  );
};

export default ViewPosts;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  postHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: responsiveWidth(4),
  },
  userInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  story: {
    width: responsiveWidth(10),
    height: responsiveWidth(10),
    borderRadius: responsiveWidth(5),
    backgroundColor: '#ccc',
    marginRight: responsiveWidth(2),
  },
  username: {
    fontSize: responsiveWidth(4),
  },
  postImage: {
    width: '100%',
    height: responsiveHeight(55),
    resizeMode: 'cover',
  },
  postFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: responsiveWidth(4),
    paddingVertical: responsiveWidth(2),
    alignItems: 'center',
  },
  actionRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconButton: {
    flexDirection: 'row',
    gap: responsiveWidth(1.2),
    alignItems: 'center',
    marginRight: responsiveWidth(3),
  },
  saveButton: {},
  likes: {
    fontSize: responsiveWidth(4),
  },
  captionContainer: {
    marginHorizontal: responsiveWidth(4),
    flexDirection: 'row',
    alignItems: 'center',
    gap: responsiveWidth(2),
  },
  viewComments: {
    marginHorizontal: responsiveWidth(4),
    marginTop: 5,
  },
  date: {
    fontSize: responsiveWidth(3.4),
    color: '#ccc',
    marginHorizontal: responsiveWidth(4),
    marginVertical: responsiveHeight(0.3),
  },
});
