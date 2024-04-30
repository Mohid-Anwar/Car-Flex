import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, Image, TextInput } from 'react-native';
import { TouchableOpacity } from "react-native-gesture-handler";
import firestore from '@react-native-firebase/firestore';
import Auth from '@react-native-firebase/auth';
export default newCard = ({ navigation }) => {
    function generateRandomId() {
        const chars = '0123456789'; // Characters to use for random ID
        const idLength = 13; // Desired length of the ID

        let randomId = '';
        for (let i = 0; i < idLength; i++) {
            const randomIndex = Math.floor(Math.random() * chars.length);
            randomId += chars[randomIndex];
        }
        return randomId;
    }
    const cardId = generateRandomId();
    const [name, setName] = useState("");
    const [number, setNumber] = useState("")
    const [month, setMonth] = useState("");
    const [year, setYear] = useState("");
    const [cvc, setCvc] = useState("")

    const formatCreditCardNumber = (input) => {
        // Remove non-numeric characters
        const numericInput = input.replace(/\D/g, '');

        // Add a space every 4 digits
        const formattedInput = numericInput.replace(/(\d{4})/g, '$1 ');

        // Trim any extra spaces
        const trimmedInput = formattedInput.trim();

        return trimmedInput;
    };

    const handleNumberChange = (input) => {
        const formattedInput = formatCreditCardNumber(input);
        setNumber(formattedInput);
    };

    const displayMaskedCardNumber = () => {
        // Extract the last 4 digits
        const last4Digits = number.slice(-4);

        // Mask the first 12 digits with asterisks
        const maskedDigits = '**** **** **** ';

        // Concatenate the masked and last 4 digits
        const maskedNumber = maskedDigits + last4Digits;

        return maskedNumber;
    };

    const addButtonHandle = async()=>{
        const userId = Auth().currentUser.uid
        const userDocRef = firestore().collection('Users').doc(userId);
        await firestore()
            .collection('Cards') // Use 'users' instead of 'User'
            .doc(cardId)
            .set({
                cardId: cardId,
                cardOwner: name,
                cardNum: number,
                expMonth: month,
                expYear: year,
                cvc: cvc,
            });
        await userDocRef.update({
            cards: firestore.FieldValue.arrayUnion(cardId),
        })
        setCvc("");
        setNumber("");
        setName("");
        setMonth("");
        setYear("");
        navigation.goBack();
    }
    return (
        <View style={{ backgroundColor: "rgb(255,255,255)" }}>

            <Image
                source={require('../assets/images/CardImage.png')}
                style={styles.image}>
            </Image>

            <Text style={{ color: "white", position: "absolute", top: 220, left: 55, fontSize: 18 }}>
                {name}
            </Text>

            <Text style={{ color: "white", position: "absolute", top: 168, left: 55, fontSize: 18 }}>
                {displayMaskedCardNumber()}
            </Text>

            <Text style={{ color: "white", position: "absolute", top: 171, left: 250, fontSize: 7 }}>
                VALID
            </Text>
            <Text style={{ color: "white", position: "absolute", top: 181, left: 250, fontSize: 7 }}>
                THRU
            </Text>

            <Text style={{ color: "white", position: "absolute", top: 168, left: 280, fontSize: 17 }}>
                {month}
            </Text>
            <Text style={{ color: "white", position: "absolute", top: 168, left: 300, fontSize: 17 }}>
                /
            </Text>
            <Text style={{ color: "white", position: "absolute", top: 168, left: 310, fontSize: 17 }}>
                {year.slice(-2)}
            </Text>

            <TextInput
                placeholder="Enter your name"
                value={name}
                onChangeText={(text) => {
                    if (isNaN(text)) {
                        setName(text);
                    }
                    else {
                        setName("")
                    }
                }}
                style={styles.input}
                placeholderTextColor="dimgray"
            />

            <TextInput
                value={number}
                placeholder="Card Number"
                onChangeText={handleNumberChange}
                keyboardType="numeric"
                multiline={false}
                maxLength={19}
                style={styles.input}
                placeholderTextColor="dimgray"
            />

            <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
                <View style={{ flexDirection: "row", width: 290, justifyContent: "center", marginHorizontal: -4 }}>
                    <TextInput
                        value={month}
                        onChangeText={(text) => {
                            const numericValue = parseInt(text);

                            if (!isNaN(numericValue) && numericValue >= 0 && numericValue <= 12) {
                                setMonth(numericValue.toString());
                            }
                            else {
                                setMonth("");
                            }
                        }}
                        placeholder="Exp Month"
                        style={[styles.input, { width: "40%", marginRight: 0 }]}
                        keyboardType="numeric"
                        multiline={false}
                        maxLength={2}
                        placeholderTextColor="dimgray" />
                    <TextInput
                        value={year}
                        onChangeText={(text => {
                            const numericValue = parseInt(text);

                            if (!isNaN(numericValue)) {
                                setYear(numericValue.toString());
                            }
                            else {
                                setYear("")
                            }
                        })}
                        placeholder="Exp Year"
                        style={[styles.input, { width: "40%", marginLeft: 8 }]}
                        keyboardType="numeric"
                        multiline={false}
                        maxLength={4}
                        placeholderTextColor="dimgray"
                    />
                </View>
                <TextInput
                    value={cvc}
                    placeholder="CVC"
                    onChangeText={(text => {
                        const numericValue = parseInt(text);

                        if (!isNaN(numericValue)) {
                            setCvc(numericValue.toString());
                        }
                        else {
                            setCvc("")
                        }
                    })}
                    keyboardType="numeric"
                    multiline={false}
                    maxLength={3}
                    style={[styles.cvc, { width: "18%", marginLeft: 0 }]}
                    placeholderTextColor="dimgray"
                />
            </View>

            <View style={[styles.button, { paddingTop: 148 }]}>
                <TouchableOpacity style={{ backgroundColor: "rgb(64,123,255)", height: 60, width: 332, borderRadius: 10, justifyContent: "center", alignItems: "center", alignSelf:"center" }}
                    onPress={addButtonHandle}>
                    <Text style={[styles.text, { color: "rgb(255, 255, 255)", fontSize: 16, fontWeight: "bold" }]}>
                        Add
                    </Text>
                </TouchableOpacity>
            </View>

        </View >
    )
}

const styles = StyleSheet.create({

    text: {
        color: "black",
        fontSize: 17,
    },
    header: {
        marginLeft: 20,
        marginTop: 20
    },
    image: {
        height: 280,
        marginLeft: 30,
        width: '85%',
        resizeMode: 'contain',
        marginTop: 20,
    },
    input: {
        color: "black",
        marginHorizontal: 15,
        marginVertical: 10,
        paddingHorizontal: 15,
        paddingVertical: 10,
        backgroundColor: "rgba(64, 124, 255, 0.14)",
        borderRadius: 10,
    },
    cvc: {
        color: "black",
        marginRight:30,
        marginVertical: 10,
        paddingHorizontal: 15,
        paddingVertical: 10,
        backgroundColor: "rgba(64, 124, 255, 0.14)",
        borderRadius: 10,
    },
    button: {
        margin: 5,
        borderRadius: 10,
        height: 60
    },
})