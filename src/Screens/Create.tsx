import {
  Alert,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {
  responsiveFontSize,
  responsiveHeight,
  responsiveWidth,
} from 'react-native-responsive-dimensions';
import ff from '../Services/fontFamily';
import {launchImageLibrary} from 'react-native-image-picker';

import {useSelector} from 'react-redux';
import {RootState} from '../Redux/store';
import {TextInput} from 'react-native-gesture-handler';
import {
  addDoc,
  collection,
  getDoc,
  serverTimestamp,
} from '@react-native-firebase/firestore';
import {db} from '../Config/firebaseConfig';
import {useNavigation} from '@react-navigation/native';
import {dispatch} from '../Services/Data';
import {setUser} from '../Redux/AuthSlice';
import {Post, User} from '../Services/types';

type ImageData = {
  width?: number;
  height?: number;
  type?: string;
  fileName?: string;
  fileSize?: number;
  uri?: string;
};
const Create = () => {
  const [image, setImage] = useState<string | null>(null);
  const [imageData, setImageData] = useState<ImageData | null>(null);
  const [focus, setFocus] = useState<boolean>(false);
  const [caption, setCaption] = useState<string>('');

  const navigation = useNavigation();

  useEffect(() => {
    console.log(imageData);
    console.log(image)
  }, [imageData]);

  const handlePickImage = () => {
    launchImageLibrary({mediaType: 'photo'}, async response => {
      if (response.didCancel) return;
      if (response.errorCode) {
        Alert.alert('Error', response.errorMessage || 'Something went wrong');
        return;
      }
      const imageData = response.assets?.[0];
      if (!imageData) return;
  
      console.log(imageData);
      setImageData(imageData);
      setImage(imageData?.uri); 
    });
  };
  
  const uploadToCloud = async() => {
    const formData = new FormData();

    formData.append('file', {
      uri: imageData?.uri,
      type: imageData?.type,
      fileName: imageData?.fileName,
    });

    formData.append('upload_preset', process.env.CLOUDINARY_UPLOAD_PRESET);
    console.log("here")
    try {
      const res = await fetch(
        `https://api.cloudinary.com/v1_1/${process.env.CLOUDINARY_CLOUD_NAME}/image/upload`,
        {
          method: 'POST',
          body: formData,
        },
      );
      console.log("first")
      const data = await res.json();
      console.log('Image uploaded to Cloudinary:', data);
      
      // Save URL in state
      return data.secure_url;
    } catch (error) {
      console.error('Upload failed:', error);
      Alert.alert('Upload failed', 'Please try again later.');
    }
  };
  //create post in firestore then get it with id complete object and addPost to the postArr
  let loggedInUser = useSelector((state: RootState) => state.auth.user);

  const handlePost = async () => {
    if (!loggedInUser) {
      Alert.alert('Error', 'User is not logged in');
      return;
    }

    const imageUrl = await uploadToCloud();
    console.log("uri",imageUrl)
    if(!imageUrl) return;
    const postData = {
      userId: loggedInUser.uid.toString(),
      postImage: imageUrl,
      caption,
      likes: 0,
      time: serverTimestamp(),
      comments: [],
    };
    const posts = await addDoc(collection(db, 'Posts'), postData);
    const postId = posts?.id;

    const userRef = collection(db, 'Users').doc(postData.userId);
    const userDoc = await getDoc(userRef);
    if (userDoc) {
      const userData = userDoc.data() as User;

      // Append the new post ID to the existing posts array
      const updatedPosts = [...userData.posts, {id: postId}];

      // Update the user's document with the new posts array
      await userRef.update({
        posts: updatedPosts, // Add the new post's ID to the user's posts array
      });
    }

    const updatedUserDoc = await userRef.get();
    const updatedUser = updatedUserDoc.data() as User;
    console.log(updatedUser);
    dispatch(setUser(updatedUser));
    Alert.alert('Post created successfully');
    navigation.navigate('Home');
  };

  return (
    <View style={styles.container}>
      <View>
        <Text style={styles.heading}>New Post</Text>
        <TouchableOpacity style={styles.imagePicker} onPress={handlePickImage}>
          {image ? (
            <Image source={{uri: image}} style={styles.image} />
          ) : (
            <Text style={styles.imagePlaceholder}>Tap to select image</Text>
          )}
        </TouchableOpacity>

        <TextInput
          placeholder="Add Caption"
          placeholderTextColor="#666"
          style={[
            styles.input,
            focus && {borderColor: '#999', borderWidth: 0.1},
          ]}
          onFocus={() => setFocus(true)}
          value={caption}
          onChangeText={setCaption}
        />
      </View>

      <TouchableOpacity style={styles.postBtn} onPress={handlePost}>
        <Text style={styles.postText}>Post</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Create;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
    backgroundColor: '#fff',
    paddingVertical: responsiveHeight(1),
    paddingHorizontal: responsiveWidth(4),
  },
  heading: {
    fontSize: responsiveFontSize(2.5),
    fontFamily: ff.lBI,
  },
  imagePicker: {
    // backgroundColor: '#1c1c1e',
    backgroundColor: '#f9f9f9',
    height: responsiveHeight(50),
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: responsiveWidth(2),
    marginVertical: responsiveHeight(2),
  },
  imagePlaceholder: {
    color: '#666',
  },
  image: {
    width: '100%',
    height: '100%',
    borderRadius: 12,
  },
  input: {
    paddingVertical: responsiveHeight(1),
    paddingHorizontal: responsiveWidth(2),
    backgroundColor: '#f9f9f9',
    borderRadius: responsiveWidth(3),
  },
  postBtn: {
    backgroundColor: '#3b82f6',
    padding: 14,
    borderRadius: 10,
    alignItems: 'center',
  },
  postText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
});
