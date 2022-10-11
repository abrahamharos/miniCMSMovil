import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import TextCard from './Cards/TextCard';

const Feed = ({ navigation }) => {
    return (
        <View style={styles.main}>
            <TextCard text='fuera' />
            <TextCard text='fuera' />
            <TextCard text='fuera' />
            <TextCard text='fuera' />
        </View>
    );
}
export default Feed;

const styles = StyleSheet.create({
    main: {
        display: 'flex',
        flexDirection: 'column',
        flex: 1,
        flexGrow: 1,
        paddingTop: 50,
    }
});