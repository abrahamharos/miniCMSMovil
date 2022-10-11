import React from 'react';
import {
    StyleSheet,
    View,
    Text,
} from 'react-native';

const TextCard = ({ text }) => {

    return (
        <View style={styles.main}>
            <Text>
                {text}
            </Text>
        </View>
    );
};
export default TextCard;

const styles = StyleSheet.create({
    main: {
        width: '100%',
        backgroundColor: 'gray',
        padding: 10,
        borderBottomColor: 'black',
        borderBottomWidth: 1,
    }
});
