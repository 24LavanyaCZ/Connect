import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { responsiveFontSize, responsiveHeight, responsiveWidth } from 'react-native-responsive-dimensions'
import Icon from 'react-native-vector-icons/AntDesign';
import Ion from 'react-native-vector-icons/Ionicons';
import Entypo from 'react-native-vector-icons/Entypo';
import Fontisto from 'react-native-vector-icons/Fontisto';
const PostView = () => {
  return (
    <View style={styles.postView}>
        <View style={styles.postHead}>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <TouchableOpacity>
            <View style={styles.story}></View>
            </TouchableOpacity>
            <View>
              <Text style={{fontSize: responsiveFontSize(1.6)}}>Name</Text>
              <Text style={{fontSize: responsiveFontSize(1.6)}}>Music</Text>
            </View>
          </View>
          <TouchableOpacity>
          <Entypo name="dots-three-vertical" size={16} style={styles.iconDot} />
          </TouchableOpacity>
        </View>
        <Image
          source={{
            uri: 'https://images.unsplash.com/photo-1573865526739-10659fec78a5?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8Y2F0fGVufDB8fDB8fHww',
          }}
          style={{width: responsiveWidth(100), height: responsiveHeight(45)}}
        />

        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            padding: responsiveWidth(3),
            gap: responsiveWidth(2),
          }}>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              gap: responsiveWidth(1),
            }}>
            <TouchableOpacity>
              <Icon name="hearto" size={20} />
            </TouchableOpacity>
            <Text style={{fontSize: responsiveFontSize(1.6)}}>1000</Text>
          </View>

          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              gap: responsiveWidth(1),
            }}>
            <TouchableOpacity>
              <Fontisto name="comment" size={22} />
            </TouchableOpacity>
            <Text style={{fontSize: responsiveFontSize(1.6)}}>1000</Text>
          </View>

          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              gap: responsiveWidth(1),
            }}>
            <TouchableOpacity>
              <Ion name="paper-plane" size={20} />
            </TouchableOpacity>
          </View>

          <View style={{position: 'absolute', right: responsiveWidth(3)}}>
            <TouchableOpacity>
              <Ion name="bookmark" size={20} />
            </TouchableOpacity>
          </View>
        </View>
      </View>
  )
}

export default PostView

const styles = StyleSheet.create({
    story: {
        borderWidth: 1,
        width: responsiveWidth(10),
        height: responsiveWidth(10),
        marginRight: responsiveWidth(2),
        borderRadius: responsiveWidth(7.5),
        backgroundColor: 'white',
        borderColor: '#ccc',
      },
      iconDot: {
        paddingTop: responsiveHeight(1),
      },
      postView: {
        marginVertical: responsiveHeight(1),
        // borderWidth: 1,
        // borderColor: '#ccc',
        // flexDirection: 'row',
      },
      postHead: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingVertical: responsiveHeight(0.7),
        paddingHorizontal: responsiveHeight(2),
      },
})