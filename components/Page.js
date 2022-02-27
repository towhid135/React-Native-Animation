import React from "react";
import {View,Text,StyleSheet,Dimensions} from 'react-native';
import Animated,{Extrapolate, interpolate, useAnimatedStyle, useDerivedValue, useSharedValue} from 'react-native-reanimated';

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
            [0,1,0],
            /*If translateX.value is greater than the maximum given value and lower than the given
            minimum value than the interpolate will expand the value by learning from given value.
            but this method is not good for that reason we use Extraplate.CLAMP, it will make the
            scale value zero if translate.value is out of given range */
            Extrapolate.CLAMP
            )
        return {
            transform: [{scale: scale}]
        }
    })

    const reanimatedCircle = useAnimatedStyle(() =>{
        const borderRadius = interpolate(props.translateX.value,
            [(props.index-1) * width,(props.index) * width,(props.index+1) * width],
            [0,RADIUS/2,0],
            Extrapolate.CLAMP
            )
        return {
            borderRadius: borderRadius
        }
    })

    const rText = useAnimatedStyle(() =>{
        const translateY = interpolate(props.translateX.value,
            [(props.index-1) * width,(props.index) * width,(props.index+1) * width],
            [height/2,0,-height/2],
            Extrapolate.CLAMP
            )
        return {
            transform: [{translateY: translateY}]
        }
    })

    return (
        <Animated.View style={[{...styles.container,backgroundColor: `rgba(0,0,256,0.${props.index+2})`},reanimatedStyle]} >
            <Animated.View style={[styles.circle,reanimatedCircle]}>
                <Animated.View style={rText}>
                  <Text style={styles.textStyle}>{props.title}</Text>
               </Animated.View>
            </Animated.View>
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
        //borderRadius: RADIUS/2,
        backgroundColor: 'rgba(0,0,256,0.5)',
        alignItems: 'center',
        justifyContent: 'center'
    }
})

export default Page;