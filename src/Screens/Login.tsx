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
import type {StackNavigationProp} from '@react-navigation/stack';
import {AuthState, RootStack} from '../Services/types';
import {responsiveWidth} from 'react-native-responsive-dimensions';
import {useDispatch, useSelector} from 'react-redux';
import {AppDispatch, RootState} from '../Redux/store';
import {signInWithEandPass} from '../Config/EmailAndPassword';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  type StackNavigation = StackNavigationProp<RootStack, 'Login'>;
  const navigation = useNavigation<StackNavigation>();

  //ROOT STATE RETURNS THE ENTIRE TYPE OF PRESENT STATE SO IT WILL RETURN THE TYPE OF AUTHSTATE
  //SO WE CAN USE THE AUTHSTATE TYPE TO GET THE LOGIN STATE

  const login = useSelector((state: RootState) => state.auth.login);

  const dispatch = useDispatch<AppDispatch>();
  const handleLogin = async() => {
    const user = await dispatch(signInWithEandPass({email, password}));
    if (signInWithEandPass.fulfilled.match(user)) {
      // result.payload contains the user
      const payload = {...user.payload}
      navigation.navigate('Home', {userId: payload.uid});
      console.log(payload.uid)
    } else {
      console.log('Login failed:', user.error?.message);
    }
  };
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
            placeholder="Password"
            placeholderTextColor="#ccc"
            secureTextEntry
            value={password}
            onChangeText={setPassword}
          />
          <TouchableOpacity style={styles.button} onPress={handleLogin}>
            <Text style={styles.buttonText}>Log In</Text>
          </TouchableOpacity>
        </View>

        <Text style={styles.signUpText}>
          Don't have an account?{' '}
          <Text
            style={styles.signUpLink}
            onPress={() => navigation.navigate('Signup')}>
            Sign Up
          </Text>
        </Text>
      </View>
    </View>
  );
};
export default Login;
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
