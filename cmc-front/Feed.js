import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import TextCard from './Cards/TextCard';
import PhotoCard from './Cards/PhotoCard';
import CelebrationCard from './Cards/CelebrationCard';
import { NativeBaseProvider } from 'native-base';

const Feed = ({ navigation }) => {
    return (
        <NativeBaseProvider>
            <TextCard title='Holiiii' author='Mariana' text='Este es un post de texto de prueba' date='Hoy' />
            <PhotoCard photo='https://www.northcotevet.com.au/wp-content/uploads/2019/03/tips-puppies-jumping-barking.jpg' title='Holi otra vez' author='Mariana Mtz Celis' text='Este es un post de foto de prueba' date='Ayer' />
            <CelebrationCard photo='https://avatars.githubusercontent.com/u/25236391?v=4' title='Happy birthday Diego' author='Mariana Mtz' text='Este es un post de celebracion de prueba' date='Hace una semana' />
        </NativeBaseProvider>
    );
}
export default Feed;