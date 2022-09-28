import React, { useState, createRef } from 'react';
import {
    StyleSheet,
    TextInput,
    View,
    Text,
    ScrollView,
    Keyboard,
    TouchableOpacity,
    KeyboardAvoidingView,
} from 'react-native';

const Login = ({ navigation }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    const passwordRef = createRef();

    const emailRegex =
        /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;

    const tryLogin = async () => {
        setErrorMessage('');
        if (!email.match(emailRegex)) {
            setErrorMessage('Correo invalido');
            return;
        }
        if (password.length < 6) {
            setErrorMessage('La contraseña debe contener al menos 6 caracteres.');
            return;
        }
    }

    return (
        <View style={styles.main}>
            <ScrollView
                keyboardShouldPersistTaps="handled"
                contentContainerStyle={{
                    flex: 1,
                    justifyContent: 'center',
                    alignContent: 'center',
                }}>
                <View>
                    <KeyboardAvoidingView enabled>
                        <View style={{ alignItems: 'center' }}>
                            <Text style={styles.title}>Mini CMS</Text>
                        </View>
                        <View style={styles.inputDiv}>
                            <TextInput
                                style={styles.input}
                                onChangeText={(email) =>
                                    setEmail(email)
                                }
                                placeholder="Correo"
                                keyboardType="email-address"
                                placeholderTextColor="#CCCCCC"
                                returnKeyType="next"
                                onSubmitEditing={() =>
                                    passwordRef.current &&
                                    passwordRef.current.focus()
                                }
                            />
                        </View>
                        <View style={styles.inputDiv}>
                            <TextInput
                                style={styles.input}
                                onChangeText={(password) =>
                                    setPassword(password)
                                }
                                placeholder="Contraseña"
                                placeholderTextColor="#CCCCCC"
                                ref={passwordRef}
                                onSubmitEditing={Keyboard.dismiss}
                                secureTextEntry={true}
                                returnKeyType="next"
                            />
                        </View>
                        {errorMessage != '' ? (
                            <Text style={styles.error}>
                                {errorMessage}
                            </Text>
                        ) : null}
                        <TouchableOpacity
                            style={styles.button}
                            activeOpacity={0.5}
                            onPress={tryLogin}>
                            <Text style={styles.buttonText}>LOGIN</Text>
                        </TouchableOpacity>
                        <Text
                            style={styles.registerText}
                            onPress={() => navigation.replace('Register')}>
                            No tienes cuenta? Registrate aqui
                        </Text>
                    </KeyboardAvoidingView>
                </View>
            </ScrollView>
        </View>
    );
};
export default Login;

const styles = StyleSheet.create({
    main: {
        flex: 1,
        justifyContent: 'center',
        backgroundColor: '#307ecc',
        alignContent: 'center',
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        color: 'white',
        marginBottom: 10
    },
    inputDiv: {
        flexDirection: 'row',
        height: 40,
        marginVertical: 10,
        marginHorizontal: 30
    },
    button: {
        backgroundColor: '#7DE24E',
        borderWidth: 0,
        color: 'white',
        height: 40,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 30,
        marginVertical: 10,
        marginHorizontal: 30
    },
    buttonText: {
        color: 'white',
        fontSize: 16,
    },
    input: {
        flex: 1,
        color: 'white',
        paddingLeft: 15,
        paddingRight: 15,
        borderWidth: 1,
        borderRadius: 30,
        borderColor: '#dadae8',
    },
    registerText: {
        color: 'white',
        textAlign: 'center',
        fontWeight: 'bold',
        fontSize: 14,
        alignSelf: 'center',
        padding: 10,
    },
    error: {
        color: 'red',
        textAlign: 'center',
        fontSize: 14,
    },
});
