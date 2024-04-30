import React, { useState } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import {
    View,
    TouchableOpacity,
    Text,
    StyleSheet,
    Image,
    ScrollView,
    Pressable,
} from 'react-native';
import Auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
const MyAdds = ({navigation}) => {
    const[user, setUser] = useState({});
    const [posts, setPosts] = useState([]);
    useFocusEffect(
        React.useCallback(() => {
            const fetchData = async () => {
                try {
                    const userDocument = firestore().collection('Users').doc(Auth().currentUser.uid);
                    const userData = await userDocument.get();
                    if (userData.exists) {
                        const data = userData.data();
                        const postArray = data.posts || [];
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
        <ScrollView style={styles.container}>
            {posts.map((post, index) => (
                <Pressable
                    key={index} // Add a unique key for each rendered item
                    style={styles.item}
                    // onPress={() => {
                    //     navigation.navigate('AddDetails', { postData: post, 
                    //     userInfo:user });
                    // }}
                    >
                    <Image
                        style={styles.image}
                        source={{ uri: post.imageUrl }}
                        resizeMode="cover"
                    />
                    <View style={{ padding: 10, width:180 }}>
                        <Text style={styles.title} >{post.title}</Text>
                        <Text style={styles.date} >Upload on: {post.uploadedOn}</Text>
                    </View>
                </Pressable>
            ))}
        </ScrollView>
    );

};



const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor:"white",
        paddingVertical:25
    },
    item: {
        flexDirection:"row",
        width:"90%",
        height:120,
        borderRadius:12,
        backgroundColor: '#E6ECFB',
        marginHorizontal:22,
        marginTop:12
    },
    image:{
        width:150,
        height:120,
        borderRadius:12
    },
    title:{
        fontFamily: 'Urbanist-Regular',
        color:"black",
        fontSize:22,
        fontWeight:"bold",
    },
    date:{
        fontFamily: 'Urbanist-Regular',
        color:"dimgray",
        fontSize:15,
    },
})
export default MyAdds;
