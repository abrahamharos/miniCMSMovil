import {View, Text} from 'react-native';  

const Register = ({navigation}) => {
    return (
        <View>
        <Text>Registro</Text>
        <Text
            style={{margin: 100}}
            onPress={() => navigation.replace('Login')}
        >Regreso a login</Text>
        </View>
    );
}
export default Register;