import { StyleSheet, Text, TextInput, View } from 'react-native'
import React, { useState } from 'react'
import { responsiveHeight, responsiveWidth } from 'react-native-responsive-dimensions'

const InputField = () => {
    const [focus, setFocus] = useState(false)
    const [caption, setCaption] = useState('')

  return (
    <TextInput  
        placeholder='Add Caption'
        placeholderTextColor='#666'
        style={[styles.input, focus && {borderColor:"#999",borderWidth: 0.1}]}
        onFocus={()=> setFocus(true)}
        value={caption}
        onChangeText={setCaption}
    />
  )
}

export default InputField

const styles = StyleSheet.create({
    input:{
        paddingVertical: responsiveHeight(1),
        paddingHorizontal: responsiveWidth(2),
        backgroundColor:"#f9f9f9",
        borderRadius: responsiveWidth(3)
    }
})