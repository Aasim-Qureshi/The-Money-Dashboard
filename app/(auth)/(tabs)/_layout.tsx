import React from 'react'
import { Tabs } from 'expo-router'
import { FontAwesome } from '@expo/vector-icons'
import Colors from '@/constants/Colors'
import { BlurView } from 'expo-blur'
import CustomHeader from '@/components/CustomHeader'

export default function Layout() {
  return (
    <Tabs screenOptions={{
        tabBarActiveTintColor: Colors.primary,
        tabBarBackground : () => (
            <BlurView
                intensity={100}
                tint='extraLight'
                style={{
                    flex: 1,
                    backgroundColor: 'rgba(0,0,0,0.07)'
                }}
            />
        ),
        tabBarStyle: {
            backgroundColor: 'transparent',
            position: 'absolute',
            bottom: 0,
            left: 0,
            right: 0,
            elevation: 0,
            borderTopWidth: 0
        }
        }} >
        <Tabs.Screen
            name='home'
            options={{
                tabBarIcon: ({size, color}) => (
                    <FontAwesome name='registered' size={size} color={color} />
                ),
                header: () => <CustomHeader/>,
                headerTransparent: true
            }}
        />
        <Tabs.Screen
            name='crypto'
            options={{
                tabBarIcon: ({size, color}) => (
                    <FontAwesome name='bitcoin' size={size} color={color} />
                )
            }}
        />
        <Tabs.Screen
            name='invest'
            options={{
                tabBarIcon: ({size, color}) => (
                    <FontAwesome name='line-chart' size={size} color={color} />
                )
            }}
        />
        <Tabs.Screen
            name='transfers'
            options={{
                tabBarIcon: ({size, color}) => (
                    <FontAwesome name='exchange' size={size} color={color} />
                )
            }}
        />
        <Tabs.Screen
            name='lifestyle'
            options={{
                tabBarIcon: ({size, color}) => (
                    <FontAwesome name='th' size={size} color={color} />
                )
            }}
        />

    </Tabs>
  )
}