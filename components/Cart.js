import React, { useState } from "react";
import { View, Text, StyleSheet, Touchable } from 'react-native';
import { TouchableOpacity } from "react-native-gesture-handler";
import Icon1 from 'react-native-vector-icons/MaterialCommunityIcons';
import Icon2 from 'react-native-vector-icons/FontAwesome';
export default Cart = ({ route, navigation }) => {
    const { payMeth } = route.params;
    const { userInfo } = route.params;
    const { postData } = route.params;
    const[totalPrice,setTotalPrice] = useState(0)
    const[tax, setTax] = useState(0);
    const[discount, setDiscount] = useState(0)
    // Calculate total price based on taxes and discounts
    const calculateTotalPrice = () => {
        const price = Number(postData.price);
        const taxAmount = price * 0.1;
        setTax(taxAmount);
        const discountAmount = price * 0.02;
        setDiscount(discountAmount);
        const total = price + taxAmount - discountAmount;
        setTotalPrice(total); // Update total price state
    };
    useEffect(() => {
        calculateTotalPrice();
    }, []);
    return (
        <View style={{ backgroundColor: "white" }}>

            <View style={styles.detailsView}>
                <View style={{ flexDirection: "row", justifyContent: "space-between", margin: 12, marginVertical: 10 }}>
                    <Text style={styles.headers}>
                        Car Title
                    </Text>
                    <Text style={styles.text}>
                        {postData.title}
                    </Text>
                </View>
                <View style={{ flexDirection: "row", justifyContent: "space-between", margin: 12, marginVertical: 10 }}>
                    <Text style={styles.headers}>
                        Car Owner
                    </Text>
                    <Text style={styles.text}>
                        {userInfo.name}
                    </Text>
                </View>
                <View style={{ flexDirection: "row", justifyContent: "space-between", margin: 12, marginVertical: 10 }}>
                    <Text style={styles.headers}>
                        Car Model
                    </Text>
                    <Text style={styles.text}>
                        {postData.model}
                    </Text>
                </View>
                <View style={{ flexDirection: "row", justifyContent: "space-between", margin: 12, marginVertical: 10 }}>
                    <Text style={styles.headers}>
                        Reg Year
                    </Text>
                    <Text style={styles.text}>
                        {postData.regDate}
                    </Text>
                </View>
            </View>

            <View style={styles.detailsView}>
                <View style={{ flexDirection: "row", justifyContent: "space-between", margin: 12, marginVertical: 10 }}>
                    <Text style={styles.headers}>
                        Amount
                    </Text>
                    <Text style={styles.text}>
                        {postData.price}
                    </Text>
                </View>
                <View style={{ flexDirection: "row", justifyContent: "space-between", margin: 12, marginVertical: 10 }}>
                    <Text style={styles.headers}>
                        Taxes & Fees (10%)
                    </Text>
                    <Text style={styles.text}>
                        {tax}
                    </Text>
                </View>
                <View style={{ flexDirection: "row", justifyContent: "space-between", margin: 12, marginVertical: 10 }}>
                    <Text style={styles.headers}>
                        Discount (2%)
                    </Text>
                    <Text style={styles.text}>
                        {discount}
                    </Text>
                </View>

                <View style={{ marginVertical: 9, borderColor: "rgba(0, 0, 0, 0.08)", borderWidth: 0.3 }} />

                <View style={{ flexDirection: "row", justifyContent: "space-between", margin: 12, marginVertical: 10 }}>
                    <Text style={styles.headers}>
                        Total
                    </Text>
                    <Text style={styles.text}>
                        {totalPrice}
                    </Text>
                </View>
            </View>

            <View style={styles.changePayMeth}>
                <View style={{ flexDirection: "row", justifyContent: "center", alignItems: "center", marginLeft: -1 }}>
                    {payMeth === "cod" ?
                        (<Icon1 name="account-cash" size={27} color="rgb(230, 219, 12)" />) :
                        (<Icon2 name="cc-mastercard" size={27} color="rgb(75, 65, 53)" />)
                    }
                    {payMeth === "cod" ?
                        (<Text style={[styles.text, { marginLeft: 17 }]}> Cash on Delivery</Text>) :
                        (<Text style={[styles.text, { marginLeft: 17 }]}> **** **** **** 1234</Text>)
                    }
                </View>
                <TouchableOpacity onPress={() => navigation.navigate("PayMethods")}>
                    <Text style={{ fontWeight: "bold", color: "rgb(64,123,255)", marginRight: 9 }}>
                        Change
                    </Text>
                </TouchableOpacity>
            </View>

            <View style={[styles.button, { paddingTop: 60 }]}>
                <TouchableOpacity style={{ backgroundColor: "rgb(64,123,255)", height: 60, width: 301, borderRadius: 10, justifyContent: "center", alignItems: "center" }} onPress={()=>{
                  navigation.navigate("Home")  
                }} >
                    <Text style={[styles.text, { color: "rgb(255, 255, 255)", fontSize: 16, fontWeight: "bold" }]}>
                        Confirm Payment
                    </Text>
                </TouchableOpacity>
            </View>
        </View >
    )
}

const styles = StyleSheet.create({

    text: {
        color: "black",
        fontSize: 16,
    },
    headers: {
        color: "rgba(0, 0, 0, 0.56)",
        fontSize: 16
    },
    detailsView: {
        marginTop: 15,
        marginHorizontal: 25,
        padding: 15,
        backgroundColor: "rgba(64, 124, 255, 0.06)",
        borderRadius: 15
    },
    changePayMeth: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginTop: 25,
        marginHorizontal: 25,
        padding: 15,
        paddingLeft: 25,
        backgroundColor: "rgba(64, 124, 255, 0.06)",
        borderRadius: 15

    },
    button: {
        margin: 30,
        borderRadius: 10,
        height: 60
    },
})