import React from "react";
import {View,Text,StyleSheet,Dimensions} from 'react-native';
import Animated,{interpolate, useAnimatedStyle, useDerivedValue, useSharedValue} from 'react-native-reanimated';

const {height, width} = Dimensions.get('window');
const RADIUS = height/4;

const Page = props =>{
    // let translateX = props.translateX.value;
    // translateX = useDerivedValue(()=>{
    //     const value = props.translateX;
    //     return value;
    // })
    const reanimatedStyle = useAnimatedStyle(()=>{
        const scale = interpolate(props.translateX.value,
            [(props.index-1) * width,(props.index) * width,(props.index+1) * width],
            [0,1,0]
            )
        return {
            transform: [{scale: scale}]
        }
    })
    return (
        <Animated.View style={[{...styles.container,backgroundColor: `rgba(0,0,256,0.${props.index+2})`},reanimatedStyle]} >
            <View style={styles.circle}>
              <Text style={styles.textStyle}>{props.title}</Text>
            </View>
        </Animated.View>
    )
}

const styles = StyleSheet.create({
    container:{
        flex: 1,
        width,
        height: height,
        alignItems: 'center',
        justifyContent: 'center',
    },
    textStyle:{
        fontSize: 50,
        fontWeight: 'bold',
        color: 'white'
    },
    circle:{
        height: RADIUS,
        width: RADIUS,
        borderRadius: RADIUS/2,
        backgroundColor: 'rgba(0,0,256,0.5)',
        alignItems: 'center',
        justifyContent: 'center'
    }
})

export default Page;