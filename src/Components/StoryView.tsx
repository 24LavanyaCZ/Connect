import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {
  responsiveHeight,
  responsiveWidth,
} from 'react-native-responsive-dimensions';
import {ScrollView} from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/AntDesign';


const StoryView = () => {
  return (
    <View
      style={{
        flexDirection: 'row',
        marginVertical: responsiveHeight(1),
        marginHorizontal: responsiveWidth(4),
      }}>
      <View
        style={
          {
            // borderRightWidth: 1,
            // borderColor: '#ccc'
          }
        }>
        {/* YOUR STORY */}
        <TouchableOpacity style={{alignItems: 'center'}}>
          <View style={styles.story}>
            <Icon name="plus" style={styles.addIcon} color="white" />
          </View>
          <Text>Your Story</Text>
        </TouchableOpacity>
      </View>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.scrollStory}>
        {Array.from({length: 8}).map((_, i) => (
          <TouchableOpacity style={{alignItems: 'center'}} key={i}>
            <View style={styles.story}></View>
            <Text>Name</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
};

export default StoryView;

const styles = StyleSheet.create({
  story: {
    borderWidth: 1,
    width: responsiveWidth(15),
    height: responsiveWidth(15),
    marginRight: responsiveWidth(2),
    borderRadius: responsiveWidth(7.5),
    backgroundColor: 'white',
    borderColor: '#ccc',
    marginBottom: responsiveHeight(1),
  },
  scrollStory: {
    paddingHorizontal: responsiveWidth(2),
  },
  addIcon: {
    backgroundColor: '#000',
    position: 'absolute',
    padding: responsiveWidth(1),
    borderRadius: responsiveWidth(10),
    bottom: responsiveHeight(-0.2),
    right: responsiveWidth(0),
  },
});
