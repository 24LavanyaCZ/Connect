import React, {useState} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Image,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {responsiveWidth} from 'react-native-responsive-dimensions';
import { useDispatch } from 'react-redux';

import { AppDispatch } from '../Redux/store';
import { signUpWithEmailAndPassword } from '../Config/EmailAndPassword';

export default function Signup() {
  const navigation = useNavigation();
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const dispatch = useDispatch<AppDispatch>()
  
  const handleSignUp = ()=>{
    dispatch(signUpWithEmailAndPassword({email, username, password}))
    navigation.navigate('Login')
  }
  return (
    <View style={styles.container}>
      <View style={styles.innerContainer}>
        <Image
          source={require('../Assets/Images/logo.png')} // update path as per your structure
          style={styles.logo}
          resizeMode="cover"
        />

        <View style={styles.form}>
          <TextInput
            style={styles.input}
            placeholder="Email"
            placeholderTextColor="#ccc"
            value={email}
            onChangeText={setEmail}
          />
          <TextInput
            style={styles.input}
            placeholder="Username"
            placeholderTextColor="#ccc"
            value={username}
            onChangeText={setUsername}
          />
          <TextInput
            style={styles.input}
            placeholder="Password"
            placeholderTextColor="#ccc"
            secureTextEntry
            value={password}
            onChangeText={setPassword}
          />
          <TouchableOpacity style={styles.button} onPress={(()=>handleSignUp())}>
            <Text style={styles.buttonText}>Sign Up</Text>
          </TouchableOpacity>
        </View>

        <Text style={styles.signUpText}>
          Already have an account?{' '}
          <Text
            style={styles.signUpLink}
            onPress={() => navigation.navigate('Login')}>
            Login
          </Text>
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#18181b', // zinc-900
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 20,
    width: '100%',
  },
  innerContainer: {
    alignItems: 'center',
    gap: 20,
    paddingHorizontal: 16,
    width: '100%',
  },
  logo: {
    width: responsiveWidth(40),
    height: responsiveWidth(20),
  },
  form: {
    width: '100%',
  },
  input: {
    backgroundColor: '#18181b', // zinc-900
    borderColor: '#27272a', // zinc-800
    borderWidth: 2,
    borderRadius: 8,
    paddingVertical: 10,
    paddingHorizontal: 12,
    marginTop: 8,
    color: '#fff',
  },
  button: {
    backgroundColor: '#3b82f6', // blue-500
    paddingVertical: 12,
    paddingHorizontal: 12,
    borderRadius: 8,
    marginTop: 8,
  },
  buttonText: {
    color: '#fff',
    textAlign: 'center',
  },
  signUpText: {
    color: '#fff',
    marginTop: 10,
  },
  signUpLink: {
    color: '#3b82f6', // blue-500
  },
});
