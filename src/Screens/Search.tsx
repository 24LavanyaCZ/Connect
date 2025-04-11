import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { FlatList, TextInput } from 'react-native-gesture-handler'
import { responsiveHeight, responsiveWidth } from 'react-native-responsive-dimensions'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '@reduxjs/toolkit/query'


const Search = () => {
  // const posts = useSelector((state: RootState )=> state.posts)
  const dispatch = useDispatch()
  return (
    <View style={styles.container}>
      <TextInput placeholder='Search' style={styles.input}/>

      {/* GRID OF POSTS */}
      
    </View>
  )
}

export default Search

const styles = StyleSheet.create({
  container:{
    flex:1,
    backgroundColor:"#fff"
  },
  input:{
    backgroundColor:"#f9f9f9",
    width:responsiveWidth(90),
    height: responsiveHeight(6),
    borderRadius:responsiveWidth(5),
    paddingLeft:responsiveWidth(4),
    marginTop:responsiveHeight(2),
    alignSelf:"center",
  },

})