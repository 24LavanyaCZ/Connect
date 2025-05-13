import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
  Alert,
} from 'react-native';
import React, {useState} from 'react';
import Icon from 'react-native-vector-icons/Ionicons';
import {
  responsiveWidth,
  responsiveHeight,
  responsiveFontSize,
} from 'react-native-responsive-dimensions';
import {useNavigation, useRoute} from '@react-navigation/native';
import {launchImageLibrary} from 'react-native-image-picker';
import {ImageData, User} from '../Services/types';
import {
  addDoc,
  collection,
  doc,
  getDoc,
  updateDoc,
} from '@react-native-firebase/firestore';
import {db} from '../Config/firebaseConfig';
import {setUser} from '../Redux/AuthSlice';
import {useDispatch} from 'react-redux';
import {AppDispatch} from '../Redux/store';
import { updateUser } from '../Redux/UserSlice';

const EditProfile = () => {
  const {loggedIn} = useRoute().params;
  const [username, setUsername] = useState(loggedIn?.username);
  const [email, setEmail] = useState(loggedIn?.email);
  const [desc, setDesc] = useState(loggedIn?.desc);
  const [password, setPassword] = useState('6895312');
  const [showPassword, setShowPassword] = useState(false);
  const navigation = useNavigation();

  const [image, setImage] = useState<string | null>(null);
  const [imageData, setImageData] = useState<ImageData | null>(null);
  const dispatch = useDispatch<AppDispatch>();
  const photoURL = image ? image : loggedIn?.photoURL ; 
  // console.log(photoURL,"photot") 
  const handlePickImage = () => {
    launchImageLibrary({mediaType: 'photo'}, async response => {
      if (response.didCancel) return;
      if (response.errorCode) {
        Alert.alert('Error', response.errorMessage || 'Something went wrong');
        return;
      }
      const imageData = response.assets?.[0];
      if (!imageData) return;

      // console.log(imageData);
      setImageData(imageData);
      setImage(imageData?.uri);
    });
  };

  const uploadToCloud = async () => {
    const formData = new FormData();

    formData.append('file', {
      uri: imageData?.uri,
      type: imageData?.type,
      name: imageData?.fileName,
    });

    formData.append('upload_preset', process.env.CLOUDINARY_UPLOAD_PRESET);
    // console.log("here")
    try {
      const res = await fetch(
        `https://api.cloudinary.com/v1_1/${process.env.CLOUDINARY_CLOUD_NAME}/image/upload`,
        {
          method: 'POST',
          body: formData,
        },
      );
      // console.log('res',res);
      const data = await res.json();
      console.log('Image uploaded to Cloudinary:', data);
      if(data.error){
        console.log("here")
        return null;
      }
      // Save URL in state
      return data.secure_url;
    } catch (error) {
      console.error('Upload failed:', error);
      Alert.alert('Upload failed', 'Please try again later.');
    }
  };

  const handleEditProfile = async () => {
    if (!loggedIn) {
      Alert.alert('Error', 'User is not logged in');
      return;
    }
  
    try {
      const imageUrl = await uploadToCloud();
      // console.log(imageUrl,"imageUrl")  
      const userRef = collection(db, 'Users').doc(loggedIn?.uid);
      const userDoc = await getDoc(userRef);
      // console.log(userDoc);
      if (userDoc) {
        const userData = userDoc.data() as User;
        const updatedUser = {
          ...userData,
          username,
          email,
          desc,
          photoURL: imageUrl || loggedIn?.photoURL ,
        };
  
        await updateDoc(userRef, updatedUser);
        dispatch(updateUser(updatedUser));
  
        Alert.alert('Updated successfully', '', [
          {
            text: 'OK',
            onPress: () => navigation.navigate('MyTabs', 
                {
                    screen:'Profile'
                }
            ),
          },
        ]);
      } else {
        Alert.alert('User not found');
      }
    } catch (error) {
      console.error('Failed to update profile:', error);
      Alert.alert('Error', 'Could not update profile');
    }
  };
  

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Icon name="chevron-back" size={24} color="#000" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Edit Profile</Text>
        <TouchableOpacity onPress={handleEditProfile}>
          <Icon name="checkmark" size={24} color="#000" />
        </TouchableOpacity>
      </View>

      {/* Profile Image */}
      <View style={styles.profileImageContainer}>
        {photoURL ? (
          <Image
            source={{uri: photoURL}}
            style={styles.photoImage}
            resizeMode="cover"
          />
        ) : (
          <Image
            source={require('../Assets/Images/user.png')}
            style={styles.profileImage}
            resizeMode="cover"
          />
        )}
        <TouchableOpacity style={styles.editIcon} onPress={handlePickImage}>
          <Icon name="camera" size={20} color="#fff" />
        </TouchableOpacity>
      </View>

      {/* Inputs */}
      <View style={styles.inputGroup}>
        {/* <Text style={styles.label}>Name</Text>
          <TextInput value={name} onChangeText={setName} style={styles.input} /> */}

        <Text style={styles.label}>User name</Text>
        <TextInput
          value={username}
          onChangeText={setUsername}
          style={styles.input}
        />

        <Text style={styles.label}>E mail address</Text>
        <TextInput
          value={email}
          onChangeText={setEmail}
          style={styles.input}
          keyboardType="email-address"
        />

        <Text style={styles.label}>Bio</Text>
        <TextInput
          value={desc}
          placeholder="Tell us about yourself"
          placeholderTextColor="#aaa"
          onChangeText={setDesc}
          numberOfLines={4}
          multiline={true}
          style={[
            styles.input,
            {
              minHeight: responsiveHeight(15),
              textAlignVertical: 'top',
            },
          ]}
        />

        <Text style={styles.label}>Password</Text>
        <View style={styles.passwordContainer}>
          <TextInput
            value={password}
            onChangeText={setPassword}
            style={[styles.input, {flex: 1}]}
            secureTextEntry={!showPassword}
          />
          <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
            <Icon
              name={showPassword ? 'eye' : 'eye-off'}
              size={20}
              color="#aaa"
            />
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
};

export default EditProfile;

const styles = StyleSheet.create({
  container: {
    padding: responsiveWidth(5),
    backgroundColor: '#fff',
    flexGrow: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: responsiveHeight(2),
  },
  headerTitle: {
    fontSize: responsiveFontSize(2.2),
    fontWeight: '600',
    color: '#000',
  },
  profileImageContainer: {
    alignItems: 'center',
    marginBottom: responsiveHeight(3),
    position: 'relative',
  },
  profileImage: {
    width: responsiveWidth(30),
    height: responsiveWidth(30),
    borderRadius: responsiveWidth(15),
    padding: responsiveWidth(5),
  },
  photoImage:{
    width: responsiveWidth(35),
    height: responsiveWidth(35),
    borderRadius: responsiveWidth(13),
    padding: responsiveWidth(5),
  },
  editIcon: {
    position: 'absolute',
    right: responsiveWidth(33),
    bottom: responsiveHeight(1),
    backgroundColor: '#000',
    borderRadius: 20,
    padding: 6,
  },
  inputGroup: {
    gap: responsiveHeight(2),
  },
  label: {
    fontSize: responsiveFontSize(1.8),
    color: '#555',
    marginBottom: 4,
  },
  input: {
    backgroundColor: '#f1f1f1',
    borderRadius: 10,
    padding: responsiveWidth(3),
    fontSize: responsiveFontSize(1.9),
    color: '#000',
  },
  passwordContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: responsiveWidth(2),
  },
});
