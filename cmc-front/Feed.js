import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import TextCard from './Cards/TextCard';
import PhotoCard from './Cards/PhotoCard';
import CelebrationCard from './Cards/CelebrationCard';
import { NativeBaseProvider, ScrollView } from 'native-base';
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
                {cards.map(card => {
                    if(card.type == "celebration") {
                        return <CelebrationCard photo={card.img} title={card.title} author={card.author} text={card.message} date={card.timestamp} />
                    } else if (card.type == "text") {
                        return <TextCard title={card.title} author={card.author} text={card.message} date={card.timestamp} />
                    } else if (card.type == "photo") {
                        return <PhotoCard photo={card.img} title={card.title} author={card.author} text={card.message} date={card.timestamp} />
                    }
                })}
            </ScrollView>
        </NativeBaseProvider>
    );
}
export default Feed;