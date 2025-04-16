import {Alert, Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, { useState } from 'react';
import {
  responsiveFontSize,
  responsiveHeight,
  responsiveWidth,
} from 'react-native-responsive-dimensions';
import ff from '../Services/fontFamily';
import { launchImageLibrary } from 'react-native-image-picker';
import InputField from '../Components/Common/InputField';

const Create = () => {
  const [image, setImage] = useState<string | null>(null);

  const handlePickImage = ()=>{
    launchImageLibrary({ mediaType: 'photo' }, (response) => {
      if (response.didCancel) return;
      if (response.errorCode) {
        Alert.alert('Error', response.errorMessage || 'Something went wrong');
        return;
      }
      const uri = response.assets?.[0]?.uri;
      if (uri) setImage(uri);
    });
  }

  return (
    <View style={styles.container}>
      <View>
      <Text style={styles.heading}>New Post</Text>
      <TouchableOpacity style={styles.imagePicker} onPress={handlePickImage}>
        {image ? (
          <Image source={{ uri: image }} style={styles.image}/>
        ) : (
          <Text style={styles.imagePlaceholder}>Tap to select image</Text>
        )}
      </TouchableOpacity>

      <InputField/>
      </View>

      <TouchableOpacity style={styles.postBtn}>
        <Text style={styles.postText}>Post</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Create;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent:'space-between',
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
