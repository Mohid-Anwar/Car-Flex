import React, { useState, useEffect } from 'react';
import {
    View,
    TextInput,
    TouchableOpacity,
    Text,
    StyleSheet,
    Image,
    ScrollView,
} from 'react-native';
import { RadioButton } from 'react-native-paper';
import DropDownPicker from 'react-native-dropdown-picker';
import Icon1 from 'react-native-vector-icons/MaterialIcons';
import Icon from 'react-native-vector-icons/FontAwesome';
import { launchImageLibrary } from 'react-native-image-picker';
import storage from '@react-native-firebase/storage';
import Auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';

// import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
const PostAnAdd = () => {
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

    const postId = generateRandomId();
    const [title, setTitle] = useState('');
    const [condition, setCondition] = useState('new');
    const [year, setYear] = useState('')
    const [openBrand, setOpenBrand] = useState(false);
    const [openModel, setOpenModel] = useState(false);
    const [openLocation, setOpenLocation] = useState(false);
    const [brandValue, setBrandValue] = useState(null);
    const [modelValue, setModelValue] = useState(null);
    const [locationValue, setLocationValue] = useState(null);
    const [sunRoof, setSunRoof] = useState(false);
    const [cruise, setCruise] = useState(false);
    const [airBags, setAirBags] = useState(false);
    const [keyless, setKeyless] = useState(false);
    const [brands, setBrands] = useState([
        { label: 'Toyota', value: 'Toyota' },
        { label: 'Suzuki', value: 'Suzuki' },
        { label: 'Honda', value: 'Honda' },
    ]);
    const [model, setModel] = useState([
        { label: '2018', value: '2018' },
        { label: '2019', value: '2019' },
        { label: '2020', value: '2020' },
    ]);
    const [location, setLocation] = useState([
        { label: 'Islamabad', value: 'Islamabad' },
        { label: 'Karachi', value: 'Karachi' },
        { label: 'Lahore', value: 'Lahore' },
    ]);
    const [checkboxes, setCheckboxes] = useState([false, false, false, false]);
    const [price, setPrice] = useState('')
    const [description, setDescription] = useState('')
    const handleCheckboxToggle = index => {
        const updatedCheckboxes = [...checkboxes];
        updatedCheckboxes[index] = !updatedCheckboxes[index];
        setCheckboxes(updatedCheckboxes);
    };
    const [carImage, setCarImage] = useState("");
    const [image, setImage] = useState('');

    useEffect(() => {
        const uploadImageToFirebase = async () => {
            if (carImage) {
                try {
                    const response = await fetch(carImage);
                    const blob = await response.blob();
                    const reference = storage().ref(`Post_Images/${postId}`);
                    await reference.put(blob);
                    const url = await storage().ref(`Post_Images/${postId}`).getDownloadURL();
                    setImage(url)
                    console.log('Image Uploaded to Firebase Storage and url is', url);
                } catch (error) {
                    console.error('Error uploading image:', error);
                }
            }
        };

        uploadImageToFirebase();
    }, [carImage]);
    const openImagePicker = () => {
        const options = {
            mediaType: 'photo',
            includeBase64: false,
            maxHeight: 2000,
            maxWidth: 2000,
        };

        launchImageLibrary(options)
            .then(async (response) => {
                if (response.didCancel) {
                    console.log('User cancelled image picker');
                } else if (response.error) {
                    console.log('Image picker error: ', response.error);
                } else {
                    const imageUri = await response.uri || (response.assets?.length > 0 && response.assets[0].uri);
                    if (imageUri) {
                        const imageUriString = String(imageUri); // Convert imageUri to string
                        setCarImage(imageUriString);
                    } else {
                        console.log('Image URI not found');
                    }
                }
            })
            .catch((error) => {
                console.log('Image picker error: ', error);
            });
    };



    const handleSellBtn = async () => {

        const userId = Auth().currentUser.uid
        const userDocRef = firestore().collection('Users').doc(userId);
        const currentDate = new Date().toDateString();
        const store = await firestore()
            .collection('Posts') // Use 'users' instead of 'User'
            .doc(postId)
            .set({
                postId: postId,
                userId: userId,
                title: title,
                condition: condition,
                regDate: year,
                brand: brandValue,
                model: modelValue,
                features: [sunRoof, cruise, airBags, keyless],
                location: locationValue,
                price: price,
                description: description,
                imageUrl: image,
                uploadedOn: currentDate,
            });
        await userDocRef.update({
            posts: firestore.FieldValue.arrayUnion(postId),
        })
        setCheckboxes([false, false, false, false]);
        setTitle("");
        setCondition("new");
        setYear("");
        setPrice("");
        setDescription("");
        setLocationValue("");
        setBrandValue("");
        setModelValue("");
        setSunRoof(false);
        setAirBags(false);
        setCruise(false);
        setKeyless(false);
    }
    return (
        <View style={{ flex: 1, backgroundColor: "white" }}>
            <ScrollView>
                <View style={styles.titleView}>
                    <Text style={styles.title}>Title</Text>
                    <TextInput
                        placeholder="Enter title"
                        style={styles.input}
                        placeholderTextColor="dimgray"
                        value={title}
                        onChangeText={setTitle}
                    />
                </View>

                <View style={{ flexDirection: "row" }}>
                    <View style={styles.conditionView}>
                        <Text style={styles.condition}>Condition</Text>
                        <RadioButton.Group onValueChange={newValue => setCondition(newValue)} value={condition}>
                            <View style={styles.radioGroup}>
                                <RadioButton.Item label="New" value="new" color="blue" />
                                <RadioButton.Item label="Old" value="old" color="blue" />
                            </View>
                        </RadioButton.Group>
                    </View>
                    <View style={styles.yearView}>
                        <Text style={styles.year}>Reg. Year</Text>
                        <TextInput
                            placeholder="Enter year"
                            style={styles.inputYear}
                            placeholderTextColor="dimgray"
                            value={year}
                            onChangeText={setYear}
                        />
                    </View>
                </View>

                <View style={{ flexDirection: "row", justifyContent: "space-around" }}>
                    <View style={styles.brandView}>
                        <Text style={styles.brand}>Brand</Text>
                        <DropDownPicker style={{ backgroundColor: '#E6ECFB', borderWidth: 0 }}
                            open={openBrand}
                            value={brandValue}
                            items={brands}
                            setOpen={setOpenBrand}
                            setValue={setBrandValue}
                            setItems={setBrands}
                            placeholder={'Select Brand'}
                            textStyle={{
                                fontSize: 15, color: "dimgray", backgroundColor: '#E6ECFB'
                            }}
                            dropDownContainerStyle={{ backgroundColor: '#E6ECFB', borderWidth: 0 }}
                        />
                    </View>
                    <View style={styles.modelView}>
                        <Text style={styles.model}>Model</Text>
                        <DropDownPicker style={{ backgroundColor: '#E6ECFB', borderWidth: 0 }}
                            open={openModel}
                            value={modelValue}
                            items={model}
                            setOpen={setOpenModel}
                            setValue={setModelValue}
                            setItems={setModel}
                            placeholder={'Select Model'}
                            textStyle={{
                                fontSize: 15, color: "dimgray", backgroundColor: '#E6ECFB'
                            }}
                            dropDownContainerStyle={{ backgroundColor: '#E6ECFB', borderWidth: 0 }}
                        />
                    </View>
                </View>

                <View style={styles.checkboxContainer}>
                    <Text style={{
                        marginHorizontal: 22, fontSize: 15,
                        fontWeight: "bold",
                        color: "black",
                        fontFamily: 'Urbanist-Regular', marginBottom: 5
                    }}>Features</Text>
                    <View style={styles.checkboxRow}>
                        <View style={{ flexDirection: "row" }}>
                            <TouchableOpacity
                                style={[styles.checkbox, checkboxes[0] && styles.checked]}
                                onPress={() => {
                                    setSunRoof(true);
                                    handleCheckboxToggle(0)
                                }}
                            >
                                {checkboxes[0] ? (
                                    <Icon name="check" size={30} color="green" /> // Tick icon if checked
                                ) : (
                                    <Icon name="square-o" size={30} color="black" /> // Square icon if unchecked
                                )}
                            </TouchableOpacity>
                            <Text style={{
                                marginLeft: '2%', alignSelf: 'center', color: "black", fontSize: 18, fontFamily: 'Urbanist-Regular', marginLeft: 10
                            }}>Sun Roof</Text>
                        </View>
                        <View style={{ flexDirection: "row" }}>
                            <TouchableOpacity
                                style={[styles.checkbox, checkboxes[1] && styles.checked]}
                                onPress={() => {
                                    setCruise(true);
                                    handleCheckboxToggle(1)
                                }}
                            >
                                {checkboxes[1] ? (
                                    <Icon name="check" size={30} color="green" /> // Tick icon if checked
                                ) : (
                                    <Icon name="square-o" size={30} color="black" /> // Square icon if unchecked
                                )}
                            </TouchableOpacity>
                            <Text style={{
                                marginLeft: '2%', alignSelf: 'center', color: "black", fontSize: 14, fontFamily: 'Urbanist-Regular', marginLeft: 10
                            }}>Cruise Control</Text>
                        </View>
                    </View>
                    <View style={styles.checkboxRow}>
                        <View style={{ flexDirection: "row" }}>
                            <TouchableOpacity
                                style={[styles.checkbox, checkboxes[2] && styles.checked]}
                                onPress={() => {
                                    setAirBags(true);
                                    handleCheckboxToggle(2)
                                }}
                            >
                                {checkboxes[2] ? (
                                    <Icon name="check" size={30} color="green" /> // Tick icon if checked
                                ) : (
                                    <Icon name="square-o" size={30} color="black" /> // Square icon if unchecked
                                )}
                            </TouchableOpacity>
                            <Text style={{
                                marginLeft: '2%', alignSelf: 'center', color: "black", fontSize: 18, fontFamily: 'Urbanist-Regular', marginLeft: 10
                            }}>Air Bags </Text>
                        </View>
                        <View style={{ flexDirection: "row" }}>


                            <TouchableOpacity
                                style={[styles.checkbox, checkboxes[3] && styles.checked]}
                                onPress={() => {
                                    setKeyless(true)
                                    handleCheckboxToggle(3)
                                }}
                            >
                                {checkboxes[3] ? (
                                    <Icon name="check" size={30} color="green" /> // Tick icon if checked
                                ) : (
                                    <Icon name="square-o" size={30} color="black" /> // Square icon if unchecked
                                )}
                            </TouchableOpacity>
                            <Text style={{
                                marginLeft: '2%', alignSelf: 'center', color: "black", fontSize: 14, fontFamily: 'Urbanist-Regular', marginLeft: 10
                            }}> Keyless Entry</Text>
                        </View>
                    </View>
                </View>

                <View style={styles.locationView}>
                    <Text style={styles.location}>Location</Text>
                    <DropDownPicker style={{ backgroundColor: '#E6ECFB', borderWidth: 0 }}
                        open={openLocation}
                        value={locationValue}
                        items={location}
                        setOpen={setOpenLocation}
                        setValue={setLocationValue}
                        setItems={setLocation}
                        placeholder={'Select Location'}
                        textStyle={{
                            fontSize: 15, color: "dimgray", backgroundColor: '#E6ECFB'
                        }}
                        dropDownContainerStyle={{ backgroundColor: '#E6ECFB', borderWidth: 0 }}
                    />
                </View>

                <View style={styles.titleView}>
                    <Text style={styles.title}>Price</Text>
                    <TextInput
                        placeholder="Enter Price"
                        style={styles.input}
                        placeholderTextColor="dimgray"
                        value={price}
                        onChangeText={setPrice}
                    />
                </View>

                <View style={styles.descriptionView}>
                    <Text style={styles.description}>Description</Text>
                    <TextInput
                        placeholder="Write description about your car"
                        style={styles.descriptionInput}
                        placeholderTextColor="dimgray"
                        multiline={true}
                        textAlignVertical="top"
                        value={description}
                        onChangeText={setDescription}
                    />
                </View>

                <View style={styles.imageContainer}>
                    <TouchableOpacity style={{ flexDirection: "row", justifyContent: "center", alignItems: "center", marginVertical: 10 }} onPress={openImagePicker}>
                        <Icon1 name="add-a-photo" size={30} color="#212121" />
                        <Text style={{ marginLeft: 5, color: "black" }}>Upload image</Text>

                    </TouchableOpacity>
                    <TouchableOpacity style={styles.sellBtn} onPress={handleSellBtn}>
                        <Text style={{ color: "white", fontFamily: 'Urbanist-Regular', fontSize: 15 }}>
                            Sell Your Car
                        </Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        </View>
    )
};



const styles = StyleSheet.create({
    titleView: {
        marginHorizontal: 22,
        marginTop: 5,
    },
    title: {
        fontSize: 15,
        color: "black",
        fontFamily: 'Urbanist-Bold'
    },
    input: {
        backgroundColor: '#E6ECFB',
        color: '#212121',
        marginBottom: 10,
        padding: 5,
        borderRadius: 5,
        fontFamily: 'Urbanist-Regular',
    },
    conditionView: {
        marginLeft: 22,
        marginTop: 5,
    },
    condition: {
        fontSize: 15,

        color: "black",
        fontFamily: 'Urbanist-Bold'
    },
    radioGroup: {
        flexDirection: 'row',
        fontFamily: 'Urbanist-Regular'
    },
    yearView: {
        marginTop: 5,
        width: 135,
        marginRight: 22,
    },
    year: {
        fontSize: 15,

        color: "black",
        fontFamily: 'Urbanist-Bold'
    },
    inputYear: {
        backgroundColor: '#E6ECFB',
        color: '#212121',
        marginTop: 5,
        padding: 5,
        borderRadius: 5,
        fontFamily: 'Urbanist-Regular',
        marginRight: 12,
    },
    brandView: {
        marginTop: 5,
        width: 145
    },
    brand: {
        fontSize: 15,

        color: "black",
        fontFamily: 'Urbanist-Bold'
    },
    modelView: {
        marginTop: 5,
        width: 145
    },
    model: {
        fontSize: 15,
        color: "black",
        fontFamily: 'Urbanist-Bold'
    },
    checkboxContainer: {
        marginTop: 5,
    },
    checkboxRow: {
        flexDirection: 'row',
        marginBottom: 10,
        justifyContent: "space-evenly"
    },
    checkbox: {
        flexDirection: 'row',
        borderWidth: 0,
        borderRadius: 5,
    },
    checked: {
        backgroundColor: 'lightblue',
    },
    locationView: {
        marginHorizontal: 22,
        marginTop: 5
    },
    location: {
        fontSize: 15,
        color: "black",
        fontFamily: 'Urbanist-Bold'
    },
    descriptionView: {
        marginHorizontal: 22,
        marginTop: 5,
    },
    description: {
        fontSize: 15,
        color: "black",
        fontFamily: 'Urbanist-Bold'
    }, descriptionInput: {
        backgroundColor: '#E6ECFB',
        color: '#212121',
        marginBottom: 10,
        padding: 10,
        borderRadius: 5,
        fontFamily: 'Urbanist-Regular',
        height: 80
    },
    imageContainer: {
        justifyContent: "center",

    },
    sellBtn: { justifyContent: "center", alignItems: "center", alignSelf: "center", backgroundColor: "#5c5ef7", width: 320, height: 40, borderRadius: 5, marginTop: 15, marginHorizontal: 22 },
})
export default PostAnAdd;
