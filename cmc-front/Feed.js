import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import TextCard from './Cards/TextCard';
import { NativeBaseProvider } from 'native-base';

const Feed = ({ navigation }) => {
    return (
        <NativeBaseProvider>
            <TextCard text='fuera' />
            <TextCard text='fuera' />
            <TextCard text='fuera' />
            <TextCard text='fuera' />
        </NativeBaseProvider>
    );
}
export default Feed;