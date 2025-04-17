import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import * as Dm from 'zeego/dropdown-menu';
import RoundBtn from './RoundBtn';
import Colors from '@/constants/Colors';
import { Ionicons } from '@expo/vector-icons';

const DropDown = () => {
  return (
  <Dm.Root>
    <Dm.Trigger>
        <RoundBtn icon="ellipsis-horizontal" text='More'/>
    </Dm.Trigger>

    <Dm.Content>
        <Dm.Item key='statement'>
            <Dm.ItemTitle>Statement</Dm.ItemTitle>
            <Dm.ItemIcon/>
        </Dm.Item>
        <Dm.Item key='converter'>
            <Dm.ItemTitle>Converter</Dm.ItemTitle>
            <Dm.ItemIcon/>
        </Dm.Item>
        <Dm.Item key='background'>
            <Dm.ItemTitle>Background</Dm.ItemTitle>
            <Dm.ItemIcon/>
        </Dm.Item>
        <Dm.Item key='account'>
            <Dm.ItemTitle>Add New Account</Dm.ItemTitle>
            <Dm.ItemIcon/>
        </Dm.Item>
    </Dm.Content>
  </Dm.Root>
  )
}

export default DropDown

const styles = StyleSheet.create({
 
})