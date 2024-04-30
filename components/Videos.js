import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, Image, TextInput, Linking, ImageBackground, ScrollView } from 'react-native';
import { TouchableOpacity } from "react-native-gesture-handler";
import Icon1 from 'react-native-vector-icons/Feather';

export default Videos = ({ navigation }) => {

    const openYouTubeVideo = (url) => {
        Linking.openURL(url);
    };

    return (
        <View style={{ backgroundColor: "rgb(255,255,255)", height: "100%" }}>

            {/* SEARCH BAR */}
            <View style={styles.searchBar}>
                <Icon1 style={{ marginLeft: 10, marginTop: 7 }} name="search" size={27} color="rgba(126, 126, 126, 0.6)" />
                <TextInput style={styles.input} placeholder="Search CarFlex Videos" placeholderTextColor="dimgray" />
            </View>

            {/* FEATURED VIDEOS */}
            <View style={{ marginLeft: 21, marginTop: 10, marginBottom: 15, }}>
                <Text style={[styles.text, { fontWeight: "bold" }]}>
                    Featured Video
                </Text>
            </View>

            {/* MAIN IMAGE */}
            <View style={{ height: "34%", backgroundColor: "white" }} >
                <TouchableOpacity
                    onPress={() => { openYouTubeVideo("https://youtu.be/FhdWqdFzvGM") }}>
                    <Image style={styles.mainImage} source={require('../assets/images/yaris.jpg')} resizeMode="cover" />
                </TouchableOpacity>
            </View>

            {/* OTHER VIDEOS */}
            <View style={{ marginLeft: 21, marginTop: -5, marginBottom: -5, paddingBottom: 15 }}>
                <Text style={[styles.text, { fontWeight: "bold" }]}>
                    Other Videos
                </Text>
            </View>

            {/* SCROLL VIEW */}
            <ScrollView style={styles.container} contentContainerStyle={styles.scrollContainer}>
                <View style={styles.descriptionViews}>
                    <TouchableOpacity style={styles.touchOpacity}
                        onPress={() => { openYouTubeVideo("https://youtu.be/NcoWB34KYV0") }}>
                        <Image style={styles.image} source={require('../assets/images/mclaren.jpg')} resizeMode="cover" />
                        <View style={styles.description}>
                            <Text style={styles.title}>Mclaren 720s</Text>
                            <Text style={styles.date}>Upload on: 12/12/12</Text>
                        </View>
                    </TouchableOpacity>
                </View>

                <View style={styles.descriptionViews}>
                    <TouchableOpacity style={styles.touchOpacity}
                        onPress={() => { openYouTubeVideo("https://youtu.be/v61SqSsyIZ8") }}>
                        <Image style={styles.image} source={require('../assets/images/audi.jpg')} resizeMode="cover" />
                        <View style={styles.description}>
                            <Text style={styles.title}>Audi R8 V10</Text>
                            <Text style={styles.date}>Upload on: 12/12/12</Text>
                        </View>
                    </TouchableOpacity>
                </View>

                <View style={styles.descriptionViews}>
                    <TouchableOpacity style={styles.touchOpacity}
                        onPress={() => { openYouTubeVideo("https://youtu.be/lSOMqfdvvM0") }}>
                        <Image style={styles.image} source={require('../assets/images/ferrari.jpg')} resizeMode="cover" />
                        <View style={styles.description}>
                            <Text style={styles.title}>Ferrari SUV</Text>
                            <Text style={styles.date}>Upload on: 12/12/12</Text>
                        </View>
                    </TouchableOpacity>
                </View>

                <View style={styles.descriptionViews}>
                    <TouchableOpacity style={styles.touchOpacity}
                        onPress={() => { openYouTubeVideo("https://youtu.be/a4O8pAVouEw") }}>
                        <Image style={styles.image} source={require('../assets/images/lambo.jpg')} resizeMode="cover" />
                        <View style={styles.description}>
                            <Text style={styles.title}>Lamborghini</Text>
                            <Text style={styles.date}>Upload on: 12/12/12</Text>
                        </View>
                    </TouchableOpacity>
                </View>

                <View style={styles.descriptionViews}>
                    <TouchableOpacity style={styles.touchOpacity}
                        onPress={() => { openYouTubeVideo("https://youtu.be/9ll2_BDZpI4") }}>
                        <Image style={styles.image} source={require('../assets/images/tesla.jpg')} resizeMode="cover" />
                        <View style={styles.description}>
                            <Text style={styles.title}>Cybertruck</Text>
                            <Text style={styles.date}>Upload on: 12/12/12</Text>
                        </View>
                    </TouchableOpacity>
                </View>

            </ScrollView>

        </View >
    )
}

const styles = StyleSheet.create({

    text: {
        color: "black",
        fontSize: 17,
    },
    searchBar: {
        flexDirection: "row",
        justifyContent: "flex-start",
        aligntouchOpacitys: "center",
        backgroundColor: "rgba(64, 124, 255, 0.14)",
        marginHorizontal: 20,
        marginVertical: 10,
        paddingHorizontal: 15,
        paddingVertical: 6,
        borderRadius: 10,
        height: 56
    },
    input: {
        color: "black",
        marginLeft: 15
    },
    mainImage: {
        width: '100%',
        height: '96%',
        borderRadius: 12,
    },
    scrollContainer: {
        paddingBottom: 50,
    },
    container: {
        flex: 1,
        backgroundColor: 'white',
        paddingTop: 5,
        paddingBottom: 20,
    },
    image: {
        width: '100%',
        height: '100%',
        borderRadius: 12,
        backgroundColor: "lightgreen"
    },
    descriptionViews: {
        backgroundColor: "rgba(64, 124, 255, 0.14)",
        marginHorizontal: 22,
        marginVertical: 10,
        borderRadius: 12,
    },
    touchOpacity: {
        flexDirection: 'row',
        width: '50%',
        height: 115,
        backgroundColor: 'white',
    },
    description: {
        height: 115,
        padding: 10,
        borderRadius: 12
    },
    title: {
        fontFamily: 'Urbanist-Regular',
        color: 'black',
        fontSize: 20,
        fontWeight: 'bold',
    },
    date: {
        fontFamily: 'Urbanist-Regular',
        color: 'dimgray',
        paddingTop: 5,
        fontSize: 13,
    },
})