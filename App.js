import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import Animated,{useSharedValue,useAnimatedStyle} from 'react-native-reanimated';

const SIZE = 100.0;
export default function App() {
  const progress = useSharedValue(0);
  const reanimatedStyle = useAnimatedStyle(() =>{
    return {
      opacity: progress.value,
    }
  },[])
  return (
    <View style={styles.container}>
      <Text>Open up App.js to start working on your app!</Text>
      <StatusBar style="auto" />
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
