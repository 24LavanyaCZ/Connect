import './gesture-handler';
import { SafeAreaView, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { NavigationContainer } from '@react-navigation/native';
import { MyTabs } from './src/Navigation/TabNavigator';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { MyStack } from './src/Navigation/StackNavigator';
import { store } from './src/Redux/store';
import { Provider } from 'react-redux';

const App = () => {
  return (
    <Provider store={store}>
      <SafeAreaProvider style={{flex:1}}>
      <SafeAreaView style={{flex:1}}>
      <GestureHandlerRootView style={styles.container}>
      <NavigationContainer>
        <MyStack/>
      </NavigationContainer>
      </GestureHandlerRootView>
      </SafeAreaView>
    </SafeAreaProvider>
    </Provider>
  )
}

export default App

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
})