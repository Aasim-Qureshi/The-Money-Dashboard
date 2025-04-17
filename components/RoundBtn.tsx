import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { Ionicons } from '@expo/vector-icons'
import Colors from '@/constants/Colors';

type RoundBtnProps = {
    text: string,
    icon: typeof Ionicons.defaultProps,
    onPress?: () => void;
}

const RoundBtn = ({icon, text, onPress}: RoundBtnProps) => {
  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
        <View style={styles.circle} >
            <Ionicons name={icon} size={30} color={Colors.dark} />  
        </View>
            <Text style={styles.label}>{text}</Text>
    </TouchableOpacity>
  )
}

export default RoundBtn

const styles = StyleSheet.create({
    container: {
        alignItems: "center"
    },
    circle: {
        width: 60,
        height: 60,
        borderRadius: 60,
        backgroundColor: Colors.lightGray,
        justifyContent: "center",
        alignItems: "center"
    },
    label: {
        color: Colors.dark,
        fontWeight: "500",
        fontSize: 16
    }
})