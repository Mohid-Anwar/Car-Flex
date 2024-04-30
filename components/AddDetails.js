import React, { useState, useEffect } from 'react';
import { useRoute } from '@react-navigation/native';
import {
    View,
    TouchableOpacity,
    Text,
    StyleSheet,
    Image,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import firestore from '@react-native-firebase/firestore';
const AddDetails = ({navigation}) => {
    const [fav, setFav] = useState(false);
    const route = useRoute();
    const { postData } = route.params;
    const { userInfo } = route.params;
    const [date, setDate] = useState("");
    const[title, setTitle] = useState("")
    const[data, setData] = useState("");
    const[description, setDescription] = useState("")
    useEffect(() => {
        const tempDate = userInfo.date.toDate();
        const formattedDate = `${tempDate.getDate()}-${tempDate.getMonth() + 1}-${tempDate.getFullYear()}`;
        setDate(formattedDate);
        setTitle(postData.title)
        gettingData();
    }, [])
    const gettingData = async()=>{
        const url = "https://cars-by-api-ninjas.p.rapidapi.com/v1/cars?model=Corolla";
        const options = {
            method: 'GET',
            headers: {
                'X-RapidAPI-Key': '5d5d2ab5b6mshcb7a8a99cea2c71p1e1ef5jsn67029e0bcad2',
                'X-RapidAPI-Host': 'cars-by-api-ninjas.p.rapidapi.com'
            }
        };
        // { "city_mpg": 23, "class": "compact car", "combination_mpg": 24, "cylinders": 4, "displacement": 1.6, "drive": "fwd", "fuel_type": "gas", "highway_mpg": 26, "make": "toyota", "model": "corolla", "transmission": "a", "year": 1993 }
        try {
            const response = await fetch(url, options);
            const result = await response.json();
            setDescription("This " + result[0].drive +" car embodies fuel efficiency (" + result[0].combination_mpg + ") having fuel type (" + result[0].fuel_type +") is the best option for you.......")
        } catch (error) {
            console.error(error);
        }
    }
    return (
        <View>
            <View style={styles.body}>
                <Image style={styles.image} source={{ uri: postData.imageUrl }} resizeMode='cover'
                />
                <TouchableOpacity style={styles.favIcon} onPress={async() => {
                    fav ? setFav(false) : setFav(true);
                    if (!fav) {
                        const userDocRef = firestore().collection('Users').doc(userInfo.userId);
                        await userDocRef.update({
                            favPost: firestore.FieldValue.arrayUnion(postData.postId),
                        })
                    }else{
                        const userDocRef = firestore().collection('Users').doc(userInfo.userId);
                        await userDocRef.update({
                            favPost: firestore.FieldValue.arrayRemove(postData.postId),
                        });

                    }
                   
                }}>
                    <Icon name={fav ? "favorite" : "favorite-border"} size={25} color="#608AF2" style={styles.icon} />
                </TouchableOpacity>
                <View style={{ padding: 15 }}>
                    <Text style={styles.headerTitle1}>
                        {postData.title} {postData.model}
                    </Text>
                    <Text style={styles.headerTitle2}>
                        PKR {postData.price}
                    </Text>
                </View>
                
                <View>
                    <View style={{ flexDirection: "row", justifyContent: "space-between", marginHorizontal: 20, borderBottomWidth: 1, borderColor: "#e0e0e0", marginBottom: 10, paddingBottom: 10 }}>
                        <Text style={styles.tableText}>Year</Text>
                        <Text style={styles.tableText}>
                            {postData.regDate}
                        </Text>
                    </View>
                    <View style={{ flexDirection: "row", justifyContent: "space-between", marginHorizontal: 20, borderBottomWidth: 1, borderColor: "#e0e0e0", marginBottom: 10, paddingBottom: 10 }}>
                        <Text style={styles.tableText}>Model</Text>
                        <Text style={styles.tableText}>
                            {postData.model}
                        </Text>
                    </View>
                    <View style={{ flexDirection: "row", justifyContent: "space-between", marginHorizontal: 20, borderBottomWidth: 1, borderColor: "#e0e0e0", marginBottom: 10, paddingBottom: 10 }}>
                        <Text style={styles.tableText}>Condition</Text>
                        <Text style={styles.tableText}>
                            {postData.condition}
                        </Text>
                    </View>
                    <View style={{ flexDirection: "row", justifyContent: "space-between", marginHorizontal: 20, borderBottomWidth: 1, borderColor: "#e0e0e0", marginBottom: 10, paddingBottom: 10 }}>
                        <Text style={styles.tableText}>Location</Text>
                        <Text style={styles.tableText}>
                            {postData.location}
                        </Text>
                    </View>
                </View>
                <View style={{ paddingHorizontal: 14 }}>
                    <Text style={styles.headerTitle2}>
                        Car Details
                    </Text>
                    <Text style={styles.description}>
                        {description}
                    </Text>
                </View>

                <View style={{ paddingHorizontal: 14 }}>
                    <Text style={styles.headerTitle2}>
                        Seller Details
                    </Text>
                    <View style={{flexDirection:"row", justifyContent:"space-between"}}>
                        <View>
                    <Text style={styles.profileName}>
                        {userInfo.name}
                    </Text>
                            <Text style={styles.profileDate}>
                                Member since {date}
                            </Text>
                        </View>
                    <Image style={styles.profilePic} source={{uri:userInfo.imageUrl}} resizeMode='cover'/>
                    </View>   
                </View>
                <View style={{ flexDirection: "row", justifyContent:"center", alignItems:"center", marginTop:30 }}>
                    <TouchableOpacity style={styles.addCartBtn} onPress={()=>{
                        navigation.goBack();
                    }} >
                        <Text style={styles.addCartText}>Go Back</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.sellBtn} onPress={()=>{
                        navigation.navigate('PaymentMethod', {userInfo:userInfo,postData:postData});
                    }} >
                        <Text style={styles.sellText}>Buy Now</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>

    )
};



const styles = StyleSheet.create({
    body: {
        flexDirection: "column",
        width: '100%',
        height: '60%'

    },
    image: {
        width: '100%',
        height: '80%',
        borderRadius: 12
    },
    icon: {
        alignSelf: "center"
    },
    favIcon: {
        borderRadius: 25,
        borderWidth: 1,
        borderColor: 'black',
        backgroundColor: "white",
        width: 45,
        height: 45,
        justifyContent: "center",
        position: "absolute",
        top: 175,
        left: 300

    },
    headerTitle1: {
        fontFamily: 'Urbanist-Regular',
        color: "dimgray",
        fontSize: 20,
    },
    headerTitle2: {
        fontFamily: 'Urbanist-Regular',
        color: "black",
        fontSize: 20,
        fontWeight: "bold"
    },
    tableText: {
        fontFamily: 'Urbanist-Regular',
        color: "dimgray",
        fontSize: 15
    },
    title: {
        fontFamily: 'Urbanist-Regular',
        color: "black",
        fontSize: 22,
        fontWeight: "bold",

    },
    description: {
        color: "black",
        flexDirection: "row",
        flexWrap: "wrap",
        marginBottom:8
    }, profileName:{
        fontFamily: 'Urbanist-Regular',
        color: "black",
        fontWeight:"bold",
        flexDirection: "row",
        fontSize:16,
        marginTop:8
    },
    profileDate:{
        fontFamily: 'Urbanist-Regular',
        color: "dimgray",
        fontWeight: "bold",
        flexDirection: "row",
        fontSize: 14,
        
    },
    profilePic:{
        height:62,
        width:62,
        borderRadius:120,
        marginRight:10
    },
    addCartBtn:{
        borderWidth:1, 
        borderRadius: 6,
        borderColor:"#1877F2",
        height:50,
        width:130, 
        justifyContent:"center",
        alignItems:"center"
    },
    addCartText:{
        color:"#1877F2", 
        fontWeight:"500"
    },
    sellBtn:{
        borderWidth: 1,
        borderRadius:6,
        borderColor: "#1877F2",
        height: 50,
        width: 130,
        justifyContent: "center",
        alignItems: "center", 
        marginLeft:8, 
        backgroundColor:"#1877F2"
    },
    sellText: {
        color: "white",
        fontWeight: "500"
    },
    date: {
        fontFamily: 'Urbanist-Regular',
        color: "dimgray",
        fontSize: 15
    },
    input: {
        backgroundColor: '#E6ECFB',
        color: '#212121',
        marginBottom: 10,
        padding: 5,
        borderRadius: 5,
        fontFamily: 'Urbanist-Regular',
    },
})
export default AddDetails;
