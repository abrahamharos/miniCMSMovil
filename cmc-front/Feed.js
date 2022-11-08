import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import TextCard from './Cards/TextCard';
import PhotoCard from './Cards/PhotoCard';
import CelebrationCard from './Cards/CelebrationCard';
import { NativeBaseProvider, ScrollView } from 'native-base';
import { Header } from '@react-navigation/stack';
import { API_KEY } from '@env';
import axios from "axios";
import ProgressCard from './Cards/ProgressCard';
import DateCard from './Cards/DateCard';


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
                    } else if (card.type == "progress") {
                        return <ProgressCard title={card.title} author={card.author} date={card.date} progress={card.progress} color={card.color}/>
                    } else if (card.type == "date") {
                        return <DateCard title={card.title} author={card.author} date={card.date}/>
                    }
                })}
            </ScrollView>
        </NativeBaseProvider>
    );
}
export default Feed;