import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import TextCard from './Cards/TextCard';
import PhotoCard from './Cards/PhotoCard';
import CelebrationCard from './Cards/CelebrationCard';
import { NativeBaseProvider, ScrollView } from 'native-base';
import { Header } from '@react-navigation/stack';
import { API_KEY } from '@env';
import axios from "axios";


const Feed = ({ navigation }) => {
    const [cards, setCards] = useState([]);

    useEffect(() => {
        async function getPost() {
        const response = await axios.get('https://6qeaxhu5lk.execute-api.us-east-1.amazonaws.com/default/getPosts', { 'headers': { 'Content-Type': 'application/json', 'x-api-key': API_KEY } })
        if(response.status == 200){
            response.data.map(card =>{
                let date = new Date(card.timestamp * 1000);
                card.timestamp = date.toLocaleDateString("en-GB");
            })
            setCards(response.data);
        }
        }
        const interval = setInterval(() => {
            getPost();
        }, 1000);
        return () => clearInterval(interval);
    }, []);

    return (
        <NativeBaseProvider>
            <ScrollView>
<<<<<<< HEAD
                <TextCard title='Holiiii' author='Mariana' text='Este es un post de texto de prueba' date='Hoy' />
                <PhotoCard photo='https://www.northcotevet.com.au/wp-content/uploads/2019/03/tips-puppies-jumping-barking.jpg' title='Holi otra vez' author='Mariana Mtz Celis' text='Este es un post de foto de prueba' date='Ayer' />
                <CelebrationCard photo='https://avatars.githubusercontent.com/u/25236391?v=4' title='Happy birthday Diego' author='Mariana Mtz' text='Este es un post de celebracion de prueba' date='Hace una semana' />
                <TextCard title='Otro post!' author='Equipo 1' text='Otra prueba de post de tipo texto :)' date='Hace una semana' />
                <PhotoCard photo='https://imagesvc.meredithcorp.io/v3/mm/image?url=https%3A%2F%2Fstatic.onecms.io%2Fwp-content%2Fuploads%2Fsites%2F34%2F2018%2F05%2F12170411%2Fcat-kitten-138468381.jpg&q=60' title='Feliz Viernes!' author='Mariana Mtz Celis' text='Que todos tengan bonito fin de semana!' date='Hace 2 semanas' />
                <CelebrationCard photo='https://web-static.wrike.com/tp/storage/uploads/92025823-45d4-4b1c-bcef-6dffd4727344/scrum-cycle-resized.png' title='¡Otro sprint victorioso!' author='Mariana Mtz' text='Estamos terminando nuestro segundo sprint del proyecto. Fiesta!!!' date='Hace 3 semanas' />
=======
                {cards.map(card => {
                    if(card.type == "celebration") {
                        return <CelebrationCard photo={card.img} title={card.title} author={card.author} text={card.message} date={card.timestamp} />
                    } else if (card.type == "text") {
                        return <TextCard title={card.title} author={card.author} text={card.message} date={card.timestamp} />
                    } else if (card.type == "photo") {
                        return <PhotoCard photo={card.img} title={card.title} author={card.author} text={card.message} date={card.timestamp} />
                    }
                })}
>>>>>>> 8fcd6bde7b12065ccfd899435ebce1a3df2d6d51
            </ScrollView>
        </NativeBaseProvider>
    );
}
export default Feed;