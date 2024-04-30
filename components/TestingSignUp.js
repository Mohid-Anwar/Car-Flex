import React, { useState } from 'react';
import {
    View,
    ScrollView,
    Text,
    TextInput,
    TouchableOpacity,
    StyleSheet,
    Alert,
    ToastAndroid,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome'; // Import the FontAwesome icon
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';

const TestingSignUp = ({ navigation }) => {
    const [email, setEmail] = useState('');
    const [name, setName] = useState(''); // name
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);


    // Set Name
    const handleNameChange = text => {
        setName(text);
    };
    const handleEmailChange = text => {
        setEmail(text);
    };

    const handlePasswordChange = text => {
        setPassword(text);
    };

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/;
    const nameRegex = /^[A-Za-z\s]+$/;


    const handleSignUpPress = async () => {
        try {
            if (name === '') {
                throw new Error('Name cannot be empty');
            }
            if (!nameRegex.test(name)) {
                throw new Error('Name should contain only letters');
            }

            if (email === '') {
                throw new Error('Email cannot be empty');
            }
            if (!emailRegex.test(email)) {
                throw new Error('Email address is invalid');
            }

            if (password === '') {
                throw new Error('Password cannot be empty');
            }
            if (!passwordRegex.test(password)) {
                throw new Error('Password should contain at least 8 characters including one uppercase letter, one lowercase letter, and one number');
            }
            const isUserCreated = await auth().createUserWithEmailAndPassword(
                email,
                password,
            );
            const store = firestore()
                .collection('Users') // Use 'users' instead of 'User'
                .doc(isUserCreated.user.uid)
                .set({
                    name: name,
                    userId: isUserCreated.user.uid,
                    date: '',
                    email: isUserCreated.user.email,
                    phoneNumber: '',
                    gender: '',
                    posts: [],
                    favPost: [],
                    cards: []
                });
            if (isUserCreated) {
                ToastAndroid.show(
                    'User account created & signed in!',
                    ToastAndroid.SHORT,
                );
            }
        } catch (error) {
            if (error.message === 'Name cannot be empty') {
                ToastAndroid.show('Name cannot be empty', ToastAndroid.SHORT);
            } else if (error.message === 'Name should contain only letters') {
                ToastAndroid.show('Name should contain only letters', ToastAndroid.SHORT);
            } else if (error.message === 'Email cannot be empty') {
                ToastAndroid.show('Email cannot be empty', ToastAndroid.SHORT);
            } else if (error.message === 'Email address is invalid') {
                ToastAndroid.show('Email address is invalid', ToastAndroid.SHORT);
            } else if (error.message === 'Password cannot be empty') {
                ToastAndroid.show('Password cannot be empty', ToastAndroid.SHORT);
            } else if (error.message === 'Password should contain at least 8 characters including one uppercase letter, one lowercase letter, and one number') {
                ToastAndroid.show('Password should contain at least 8 characters including one uppercase letter, one lowercase letter, and one number', ToastAndroid.SHORT);
            } else if (error.code === 'auth/email-already-in-use') {
                ToastAndroid.show('That email address is already in use!', ToastAndroid.SHORT);
            } else if (error.code === 'auth/invalid-email') {
                ToastAndroid.show('That email address is invalid!', ToastAndroid.SHORT);
            } else {
                ToastAndroid.show(error.toString(), ToastAndroid.SHORT);
            }
        }
    };

    return (
        <ScrollView
            style={{
                backgroundColor: '#FFFFFF',
                paddingHorizontal: 18,
                paddingTop: 40,
            }}>
            <Text style={styles.title}>Create Your </Text>
            <Text style={styles.carFlexText}>
                Car<Text style={styles.redText}>F</Text>lex Account
            </Text>

            <View style={styles.inputContainer}>
                <TouchableOpacity
                    style={styles.iconContainer}
                    onPress={() => console.log('Toggle Name Icon')}>
                    <Icon name="user" size={20} color="#9E9E9E" />
                </TouchableOpacity>
                <TextInput
                    placeholder="Name"
                    style={styles.input}
                    value={name}
                    onChangeText={handleNameChange}
                    placeholderTextColor="#737373"
                />
            </View>

            <View style={styles.inputContainer}>
                <TouchableOpacity
                    style={styles.iconContainer}
                    onPress={() => console.log('Toggle Email Icon')}>
                    <Icon
                        name={email ? 'envelope-open' : 'envelope'}
                        size={20}
                        color="#9E9E9E"
                    />
                </TouchableOpacity>
                <TextInput
                    placeholder="Email"
                    style={styles.input}
                    value={email}
                    onChangeText={handleEmailChange}
                    placeholderTextColor="#737373"
                    keyboardType="email-address"
                />
            </View>

            <View style={styles.inputContainer}>
                <Icon name="lock" size={20} color="#9E9E9E" style={styles.inputIcon} />
                <TextInput
                    placeholder="Password"
                    secureTextEntry={!showPassword}
                    style={styles.input}
                    value={password}
                    onChangeText={handlePasswordChange}
                    placeholderTextColor="#737373"
                />
                {/* Lock Icon */}
                <TouchableOpacity
                    style={styles.iconContainer}
                    onPress={() => setShowPassword(!showPassword)}>
                    <Icon
                        name={showPassword ? 'eye' : 'eye-slash'}
                        size={20}
                        color="#9E9E9E"
                    />
                </TouchableOpacity>
            </View>
            <View
                style={{
                    flexDirection: 'row',
                    justifyContent: 'center',
                }}>
                <TouchableOpacity
                    onPress={() => {
                        navigation.navigate('Login');
                    }}>
                    <Text style={styles.Remember}>
                        {' '}
                        Have an Account?{' '}
                        <Text style={styles.forgotPasswordText}>Login</Text>
                    </Text>
                </TouchableOpacity>
            </View>

            <TouchableOpacity style={styles.button} onPress={handleSignUpPress}>
                <Text style={styles.buttonText}>Sign Up</Text>
            </TouchableOpacity>

            <View style={styles.orContainer}>
                <View style={styles.line} />
                <Text style={styles.orText}>or continue with</Text>
                <View style={styles.line} />
            </View>

            {/* Google icon */}
            <TouchableOpacity style={styles.googleButton}>
                <Icon name="google" size={35} color="red" />
            </TouchableOpacity>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    title: {
        fontSize: 40,
        color: '#212121',
        fontFamily: 'Urbanist-Medium',
    },
    carFlexText: {
        fontSize: 40,
        color: '#407BFF',
        fontFamily: 'BrunoAce-Regular',
        flexDirection: 'row',
        display: 'flex',
        marginBottom: 91,
    },
    redText: {
        fontSize: 40,
        color: '#FF0000',
        fontFamily: 'BrunoAce-Regular',
        flexDirection: 'row',
        display: 'flex',
        marginBottom: 91,
        textAlign: 'center', // Center align the text
    },
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        height: 40,
        borderColor: '#E6ECFB',
        borderWidth: 1,
        marginBottom: 20,
        borderRadius: 5,
        paddingHorizontal: 13,
        backgroundColor: '#E6ECFB',
    },
    iconContainer: {
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
        // Adjusted icon margin
    },
    inputIcon: {
        marginRight: 4,
    },
    input: {
        flex: 1,
        color: '#212121',
    },
    button: {
        marginTop: 36,
        marginBottom: 36,
        backgroundColor: '#407BFF',
        paddingVertical: 12,
        paddingHorizontal: 120,
        marginBottom: 36,
        borderRadius: 10,
        elevation: 2,
        alignSelf: 'center', // Center align the button
    },
    buttonText: {
        fontSize: 18,
        letterSpacing: 0.01,
        color: '#FFFFFF',
        textAlign: 'center', // Center align the text
    },
    forgotPassword: {
        marginTop: 40,
        marginBottom: 20,
        alignSelf: 'center', // Center align the forgot password link
    },
    forgotPasswordText: {
        color: '#007AFF',
        fontSize: 14,
        fontFamily: 'Urbanist-Bold',
    },
    Remember: {
        color: '#212121',
        fontSize: 14,
        fontFamily: 'Urbanist-Bold',
    },
    googleButton: {
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#FFFFFF',
        marginBottom: 20,
        borderRadius: 5,
        borderColor: '#BEBEBE',
        borderWidth: 1,
        height: 50,
        width: 50, // Set the width to make it a square
        alignSelf: 'center', // Center align the Google button
    },
    orContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: 30,
    },
    line: {
        flex: 0.48,
        height: 1,
        backgroundColor: 'lightgray',
    },
    orText: {
        fontSize: 18,
        marginHorizontal: 16,
        color: '#212121',
        fontFamily: 'Urbanist-Medium',
    },
});

export default TestingSignUp;