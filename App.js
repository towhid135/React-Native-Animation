import React,{useEffect} from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import 
Animated,
{
  useSharedValue,
  useAnimatedStyle,
  useAnimatedGestureHandler

} 
from 'react-native-reanimated';

import {GestureHandlerRootView,PanGestureHandler} from 'react-native-gesture-handler';

const SIZE = 100.0;

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
    onEnd: () => {}
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
        <PanGestureHandler onGestureEvent={panGestureEvent}>
          <Animated.View style = {[styles.square,reanimated]}/>
        </PanGestureHandler>
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
  }
});
