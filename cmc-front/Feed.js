import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import TextCard from './Cards/TextCard';
import { NativeBaseProvider } from 'native-base';

const Feed = ({ navigation }) => {
    return (
        <NativeBaseProvider>
            <TextCard title='Holiiii' author='Mariana' text='Este es un post de prueba de de Mariana :)' date='Hoy' />
        </NativeBaseProvider>
    );
}
export default Feed;