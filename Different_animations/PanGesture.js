//RUN IT ON APP.JS

import React,{useEffect} from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import 
Animated,
{
  useSharedValue,
  useAnimatedStyle,
  useAnimatedGestureHandler,
  withSpring,

} 
from 'react-native-reanimated';

import {GestureHandlerRootView,PanGestureHandler} from 'react-native-gesture-handler';

const SIZE = 100.0;
const RADIUS = SIZE * 2;

export default function App() {
  const translateX = useSharedValue(0);
  const translateY = useSharedValue(0)

  const panGestureEvent = useAnimatedGestureHandler({
    onStart: (event,context) =>{
      context.translateX = translateX.value;
      context.translateY = translateY.value;
    },
    onActive: (event,context) => {
      translateX.value = event.translationX + context.translateX,
      translateY.value = event.translationY + context.translateY
    },
    onEnd: () => {
      const distance = Math.sqrt( (translateX.value ** 2) + (translateY.value ** 2) );
      if(distance < RADIUS + SIZE/2){
        translateX.value = withSpring(0);
        translateY.value = withSpring(0);
      }
    }
  })

  const reanimated = useAnimatedStyle(() =>{
    return {
      transform: [
        {translateX: translateX.value},
        {translateY: translateY.value}
      ]
    }
  })

  return (
    <GestureHandlerRootView style={{flex:1}}>
      <View style={styles.container}>
          <View style={styles.circle}>
            <PanGestureHandler onGestureEvent={panGestureEvent}>
              <Animated.View style = {[styles.square,reanimated]}/>
            </PanGestureHandler>
          </View>
      </View>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  square:{
    height: SIZE,
    width: SIZE, 
    backgroundColor: 'rgba(0,0,256,0.5)',
    borderRadius: 20
  },
  circle:{
    height: RADIUS * 2,
    width: RADIUS * 2,
    borderRadius: RADIUS,
    borderWidth: 5,
    borderColor: 'rgba(0,0,256,0.5)',
    alignItems: 'center',
    justifyContent: 'center',
  }
});
