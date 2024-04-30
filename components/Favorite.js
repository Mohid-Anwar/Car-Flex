import React, { useState } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import {
    View,
    TouchableOpacity,
    Text,
    StyleSheet,
    Image,
    ScrollView,
    TextInput,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import Auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
const FavoriteAdds = ({ navigation }) => {
    const [user, setUser] = useState({});
    const [posts, setPosts] = useState([]);
    useFocusEffect(
        React.useCallback(() => {
            const fetchData = async () => {
                try {
                    const userDocument = firestore().collection('Users').doc(Auth().currentUser.uid);
                    const userData = await userDocument.get();
                    if (userData.exists) {
                        const data = userData.data();
                        const postArray = data.favPost || [];
                        const promises = postArray.map(async (pid) => {
                            const postDocument = firestore().collection('Posts').doc(pid);
                            const postData = await postDocument.get();
                            if (postData.exists) {
                                return postData.data();
                            } else {
                                console.log(`Post with ID ${pid} does not exist`);
                                return null;
                            }
                        });

                        const resolvedPosts = await Promise.all(promises);
                        setPosts(resolvedPosts.filter(Boolean));
                        setUser(data);
                        // console.log(posts)
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
        <>
        <View style={{backgroundColor:"white", flexDirection:"row"}}>
            <View style={styles.searchBarContainer}>
                <Icon
                    name='search-outline'
                    size={20}
                    color="dimgray"
                />

                <TextInput
                    placeholder="Start Searching Favorite Car"
                    style={styles.passwordInput}
                    placeholderTextColor="dimgray"
                />
                
            </View>
            <TouchableOpacity>
                <Icon name='options-outline' size={43}
                    color="dimgray" />
                </TouchableOpacity>
        </View>
        <ScrollView style={styles.container}>
                {posts.map((post, index) => (
                    <TouchableOpacity
                        key={index} // Add a unique key for each rendered item
                        style={styles.item}
                        onPress={() => {
                            navigation.navigate('AddDetails', {
                                postData: post,
                                userInfo: user
                            });
                        }}>
                        <Image
                            style={styles.image}
                            source={{ uri: post.imageUrl }}
                            resizeMode="cover"
                        />
                        <View style={{ padding: 10, width: 180 }}>
                            <Text style={styles.title} >{post.title}</Text>
                            <Text style={styles.date} >Upload on: {post.uploadedOn}</Text>
                        </View>
                    </TouchableOpacity>
                ))}
        </ScrollView>
        </>
    )
};



const styles = StyleSheet.create({

    searchBarContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#E6ECFB',
        borderRadius: 5,
        marginLeft: 25,
        paddingLeft: 20
    },
    passwordInput: {
        color: '#212121',
        fontFamily: 'Urbanist-Regular',
        width:"80%"
    },
    container: {
        flex: 1,
        backgroundColor: "white",
        paddingVertical: 25
    },
    favoriteCarTitle:{
        fontFamily: 'Urbanist-Regular',
        color: "black",
        fontSize: 18,
        fontWeight: "bold",
        marginLeft:22
    },
    item: {
        flexDirection: "row",
        width: 320,
        height: 120,
        borderRadius: 12,
        backgroundColor: '#E6ECFB',
        marginHorizontal: 22,
        marginTop: 12
    },
    image: {
        width: 150,
        height: 120,
        borderRadius: 12
    },
    title: {
        fontFamily: 'Urbanist-Regular',
        color: "black",
        fontSize: 22,
        fontWeight: "bold",

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
export default FavoriteAdds;
