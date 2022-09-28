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

const Register = ({ navigation }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setconfirmPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    const passwordRef = createRef();
    const confirmPasswordRef = createRef();

    const emailRegex =
        /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;

    const tryRegister = async () => {
        setErrorMessage('');
        if (!email.match(emailRegex)) {
            setErrorMessage('Correo invalido');
            return;
        }
        if (password.length < 6) {
            setErrorMessage('La contraseña debe contener al menos 6 caracteres.');
            return;
        }
        if (password != confirmPassword) {
            setErrorMessage('Los campos de contraseña y confirmar contraseña no concuerdan');
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
                        <View style={styles.inputDiv}>
                            <TextInput
                                style={styles.input}
                                onChangeText={(confirmPassword) =>
                                    setPassword(confirmPassword)
                                }
                                placeholder="Confirmar Contraseña"
                                placeholderTextColor="#CCCCCC"
                                ref={confirmPasswordRef}
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
                            onPress={tryRegister}>
                            <Text style={styles.buttonText}>SIGN UP</Text>
                        </TouchableOpacity>
                        <Text
                            style={styles.registerText}
                            onPress={() => navigation.replace('Login')}>
                            ¿Ya tienes una cuenta? Inicia sesión aquí
                        </Text>
                    </KeyboardAvoidingView>
                </View>
            </ScrollView>
        </View>
    );
};
export default Register;

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
