// Copy and paste the code inside app.js

import React,{useEffect} from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View,Dimensions } from 'react-native';
import Page from './components/Page';
import 
Animated,
{
  useSharedValue,
  useAnimatedStyle,
  useAnimatedScrollHandler,
  event
} 
from 'react-native-reanimated';

const WORD = ["Whats", "Up", "Mobile", "Devs?"];

export default function App() {
  const translateX = useSharedValue(0);

  const scrolHandler = useAnimatedScrollHandler((event) =>{
    //console.log('contentOffset',event.contentOffset.x);
    translateX.value = event.contentOffset.x;
  })
  return (
    <Animated.ScrollView 
      onScroll={scrolHandler}
      /*onScroll will fire each 16ms. 1sec/60 = 16ms. that means 60fps */
      scrollEventThrottle = {16}
      horizontal 
      style={styles.container} 
    >
      {WORD.map((title,index) => {
        
        return (
          <Page key={index.toString()} title={title} index={index} translateX={translateX} />
        )
      })}
    </Animated.ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});
