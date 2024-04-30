import React, { useState } from "react";
import { View, Text, StyleSheet } from 'react-native';
import Icon1 from 'react-native-vector-icons/MaterialCommunityIcons';
import Icon2 from 'react-native-vector-icons/FontAwesome';
import Icon3 from 'react-native-vector-icons/Ionicons';
import { RadioButton } from "react-native-paper";
import { TouchableOpacity } from "react-native-gesture-handler";
import firestore from '@react-native-firebase/firestore';
import { useRoute } from '@react-navigation/native';
export default PaymentMethod = ({ navigation }) => {
    const route = useRoute();
    const { userInfo } = route.params;
    const { postData } = route.params;
    const [checked, setChecked] = useState("cod");
    const [borderWidth_cash, setborderWidth_cash] = React.useState(2);
    const [borderWidth_card, setborderWidth_card] = React.useState(0);

    function setBorderWidth_cash() {
        setborderWidth_card(0)
        setborderWidth_cash(2)
    }
    function setBorderWidth_card() {
        setborderWidth_cash(0)
        setborderWidth_card(2)
    }

    function dual_cash() {
        setChecked('cod');
        setBorderWidth_cash();
    }

    function dual_card() {
        setChecked('card')
        setBorderWidth_card();
    }

    return (
        <View style={{ backgroundColor: "rgb(255,255,255)" }}>
            <View style={styles.header}>
                <Text style={styles.text}>
                    Choose Payment Methods
                </Text>
            </View>

            <TouchableOpacity style={[styles.paymentSelection, { borderWidth: borderWidth_cash }]} onPress={dual_cash}>
                <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center", width: 180 }}>
                    <Icon1 name="account-cash" size={27} color="rgb(230, 219, 12)" />
                    <Text style={styles.text}>
                        Cash on Delivery
                    </Text>
                </View>
                <RadioButton value="cod" status={checked == 'cod' ? 'checked' : "unchecked"} onPress={dual_cash} uncheckedColor="rgb(64,123,255)" color="rgb(64,123,255)"></RadioButton>
            </TouchableOpacity>

            {/* add user credit card number here by fetching from firestore */}
            <TouchableOpacity style={[styles.paymentSelection, { borderWidth: borderWidth_card }]} onPress={dual_card}>
                <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center", width: 180 }}>
                    <Icon2 name="cc-mastercard" size={27} color="rgb(75, 65, 53)" />
                    <Text style={[styles.text, { marginLeft: 15 }]}>
                        **** **** **** 1234
                    </Text>
                </View>
                <RadioButton value="card" status={checked == 'card' ? 'checked' : "unchecked"} onPress={dual_card} uncheckedColor="rgb(64,123,255)" color="rgb(64,123,255)"></RadioButton>
            </TouchableOpacity>

            <View style={[styles.button, { backgroundColor: "rgb(219, 226, 245)" }]}>
                <TouchableOpacity style={{ height: 60, width: 299, borderRadius: 10, justifyContent: "center", alignItems: "center" }} onPress={() => navigation.navigate("NewCard")}>
                    <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center", width: 140 }} >
                        <Icon3 name="add-circle-outline" size={22} color="rgb(64,123,255)" />
                        <Text style={[styles.text, { color: "rgb(64,123,255)", fontSize: 15, fontWeight: "bold" }]}>
                            Add New Card
                        </Text>
                    </View>
                </TouchableOpacity>
            </View>

            <View style={[styles.button, { paddingTop: 180 }]}>
                <TouchableOpacity style={{ backgroundColor: "rgb(64,123,255)", height: 60, width: 299, borderRadius: 10, justifyContent: "center", alignItems: "center" }}
                    onPress={() => navigation.navigate("Cart", {
                        payMeth: checked,
                        postData:postData,
                        userInfo:userInfo
                    })}>
                    <Text style={[styles.text, { color: "rgba(255, 255, 255, 0.88)", fontSize: 16, fontWeight: "bold" }]}>
                        Continue
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
    paymentSelection: {
        flexDirection: "row",
        justifyContent: "space-around",
        alignItems: "center",
        margin: 30,
        marginBottom: 10,
        backgroundColor: "rgba(247, 247, 247, 0.72)",
        borderRadius: 10,
        borderColor: "rgb(64,123,255)",
        height: 70
    },
    button: {
        margin: 30,
        borderRadius: 10,
        height: 60
    },





})




