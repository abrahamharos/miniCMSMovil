import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import TextCard from './Cards/TextCard';
import PhotoCard from './Cards/PhotoCard';
import CelebrationCard from './Cards/CelebrationCard';
import { NativeBaseProvider, ScrollView } from 'native-base';
import { Header } from '@react-navigation/stack';

const Feed = ({ navigation }) => {
    return (
        <NativeBaseProvider>
            <ScrollView>
                <TextCard title='Holiiii' author='Mariana' text='Este es un post de texto de prueba' date='Hoy' />
                <PhotoCard photo='https://www.northcotevet.com.au/wp-content/uploads/2019/03/tips-puppies-jumping-barking.jpg' title='Holi otra vez' author='Mariana Mtz Celis' text='Este es un post de foto de prueba' date='Ayer' />
                <CelebrationCard photo='https://avatars.githubusercontent.com/u/25236391?v=4' title='Happy birthday Diego' author='Mariana Mtz' text='Este es un post de celebracion de prueba' date='Hace una semana' />
                <TextCard title='Otro post!' author='Equipo 1' text='Otra prueba de post de tipo texto :)' date='Hace una semana' />
                <PhotoCard photo='https://imagesvc.meredithcorp.io/v3/mm/image?url=https%3A%2F%2Fstatic.onecms.io%2Fwp-content%2Fuploads%2Fsites%2F34%2F2018%2F05%2F12170411%2Fcat-kitten-138468381.jpg&q=60' title='Feliz Viernes!' author='Mariana Mtz Celis' text='Que todos tengan bonito fin de semana!' date='Hace 2 semanas' />
                <CelebrationCard photo='https://web-static.wrike.com/tp/storage/uploads/92025823-45d4-4b1c-bcef-6dffd4727344/scrum-cycle-resized.png' title='¡Otro sprint victorioso!' author='Mariana Mtz' text='Estamos terminando nuestro segundo sprint del proyecto. Fiesta!!!' date='Hace 3 semanas' />
            </ScrollView>
        </NativeBaseProvider>
    );
}
export default Feed;