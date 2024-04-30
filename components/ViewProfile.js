import React, { useState, useEffect } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import { View, TextInput, TouchableOpacity, Text, StyleSheet, Image, Pressable, } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import Auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';

const ViewProfile = ({ navigation }) => {
    const [name, setName] = useState('');
    const [dateCalender, setDateCalender] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [gender, setGender] = useState('');
    const [open, setOpen] = useState(false);
    const [isEmailFocused, setIsEmailFocused] = useState(false);
    const [image, setImage] = useState('');
    useFocusEffect(
        React.useCallback(() => {
            const fetchData = async () => {
                try {
                    const userDocument = firestore().collection('Users').doc(Auth().currentUser.uid);
                    const userData = await userDocument.get();

                    if (userData.exists) {
                        const data = userData.data();
                        const name = data.name;
                        const gender = data.gender;
                        const imageUrl = data.imageUrl;
                        const date = data.date.toDate();
                        const email = Auth().currentUser.email;
                        const phoneNum = data.phoneNumber;

                        const formattedDate = `${date.getDate()}-${date.getMonth() + 1}-${date.getFullYear()}`;
                        console.log(name, gender, imageUrl);

                        setName(name);
                        setImage(imageUrl);
                        setDateCalender(formattedDate);
                        setPhone(phoneNum);
                        setGender(gender);
                        setEmail(email);
                    } else {
                        console.log('No such document!');
                    }
                } catch (error) {
                    console.log('Error getting document:', error);
                }
            };
            fetchData();
        }, [])
    );
        return (
            <SafeAreaProvider>
                <View style={styles.container}>
                    {/* Profile Image Upload */}
                    <View style={styles.imageContainer}>
                        
                            {image ? (
                                <Image
                                    source={{ uri: image }}
                                    style={styles.profileImage}
                                    resizeMode='cover'
                                />
                            ) : (
                                <Icon name="camera" size={50} color="#212121" />
                            )}
                        
                    </View>


                    {/* Name */}
                    <TextInput
                        placeholder="Name"
                        value={name}
                        style={styles.input}
                        placeholderTextColor="dimgray"
                        editable={false}
                    />

                    {/* Date (Calendar Select) */}
                    <View>
                        <Pressable
                            style={styles.dateContainer}>
                            <Text
                                style={styles.dateInput}
                            >{dateCalender ? dateCalender : "Date"}</Text>

                        </Pressable>
                    </View>

                    {/* Email */}
                    <Pressable
                        style={styles.dateContainer}
                        onPress={() => setOpen(true)}>
                        <TextInput
                            placeholderTextColor="dimgray"
                            placeholder="Email"
                            editable={false}
                            value={email}
                            style={[
                                styles.dateInput,
                                { color: isEmailFocused ? 'black' : '#212121' },
                            ]}
                            onFocus={() => setIsEmailFocused(true)}
                            onBlur={() => setIsEmailFocused(false)}
                        />
                        {isEmailFocused ? (
                            <Icon name="mail-open" size={20} color="#212121" />
                        ) : (
                            <Icon name="mail" size={20} color="#212121" />
                        )}
                    </Pressable>

                    {/* Phone Number */}
                    <TextInput
                        placeholder="Phone Number"
                        value={phone}
                        onChangeText={text => setPhone(text)}
                        keyboardType="numeric"
                        style={styles.input}
                        placeholderTextColor="dimgray"
                        editable={false}
                    />

                    {/* Gender */}
                    <Pressable
                        style={styles.dateContainer}>
                        <Text
                            style={styles.dateInput}
                        >{gender ? gender : "Gender"}</Text>

                    </Pressable>

                    {/* Submit and Cancel buttons */}
                    <TouchableOpacity onPress={() => {
                        navigation.navigate('Profile', { isEditing: true });
                    }} style={styles.submitButton}>
                        <Text style={styles.buttonText}>Edit</Text>
                    </TouchableOpacity>

                    <TouchableOpacity onPress={() => {
                        navigation.goBack();
                    }} style={styles.cancelButton}>
                        <Text style={styles.buttonText}>Cancel</Text>
                    </TouchableOpacity>
                </View>
            </SafeAreaProvider>
        );
    }

  

const styles = StyleSheet.create({
    imageContainer: {
        backgroundColor: '#E6ECFB',
        marginBottom: 10,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 100,
        height: 120,
        width: 120,
        alignSelf: 'center',
    },
    profileImage: {
        height: '100%',
        width: '100%',
        borderRadius: 100,
    },
    container: {
        padding: 20,
        backgroundColor: 'white',
        flex: 1,
        fontFamily: 'Urbanist-Regular',
    },
    input: {
        backgroundColor: '#E6ECFB',
        color: '#212121',
        marginBottom: 10,
        padding: 10,
        borderRadius: 5,
        fontFamily: 'Urbanist-Regular',
    },
    passwordContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#E6ECFB',
        marginBottom: 10,
        padding: 10,
        borderRadius: 5,
    },
    passwordInput: {
        flex: 1,
        color: '#212121',
        fontFamily: 'Urbanist-Regular',
    },
    eyeIconContainer: {
        marginLeft: 10,
    },
    dateContainer: {
        backgroundColor: '#E6ECFB',
        marginBottom: 10,
        padding: 10,
        flexDirection: 'row',
        alignItems: 'center',
        borderRadius: 5,
        fontFamily: 'Urbanist-Regular',
    },
    dateInput: {
        flex: 1,
        color: '#212121',
        fontFamily: 'Urbanist-Regular',
    },
    submitButton: {
        backgroundColor: '#A7FF7D',
        padding: 15,
        borderRadius: 5,
        marginBottom: 10,
    },
    cancelButton: {
        backgroundColor: '#FF9466',
        padding: 15,
        borderRadius: 5,
        marginBottom: 10,
    },
    buttonText: {
        color: '#000000',
        textAlign: 'center',
        fontFamily: 'Urbanist-Regular',
    },
});

export default ViewProfile;
