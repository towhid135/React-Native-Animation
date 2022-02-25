import React,{useEffect} from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import 
Animated,
{
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  withSpring,
  withRepeat,
} 
from 'react-native-reanimated';

const SIZE = 100.0;
//Worklet or js function to manage rotation
const handleRotation = (progress) => {
 'worklet';
 //console.log('type',typeof progress);
 return `${progress * 2 * Math.PI}rad`;
}
export default function App() {

  /*useShared value allows to update and pass value to the UI thread */
  const progress = useSharedValue(1);
  const scale = useSharedValue(2);
  const reanimatedStyle = useAnimatedStyle(() =>{
    return {
      opacity: progress.value,
      transform: [{scale: scale.value},{rotate: handleRotation(progress.value) }],
      borderRadius: (progress.value * SIZE) / 2,
    };
  },[progress]
  )
  //console.log('progress',progress.value);
  //console.log('opacity',reanimatedStyle.opacity);

  useEffect(()=>{
    progress.value = withRepeat( withTiming(0,{duration: 2000}), -1, true );
    scale.value = withRepeat( withTiming(1,{duration: 2000}), -1, true);
    //scale.value = withSpring(2);
  },[])
  return (
    <View style={styles.container}>
      <Animated.View 
       style = {[{height: SIZE,width: SIZE, backgroundColor: 'blue'},reanimatedStyle]}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
