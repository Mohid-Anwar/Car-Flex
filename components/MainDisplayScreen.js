import React, {useState} from 'react';
import { useFocusEffect } from '@react-navigation/native';
import {
  View,
  TouchableOpacity,
  Text,
  StyleSheet,
  Image,
  ScrollView,
  TextInput,
  ImageBackground,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import firestore from '@react-native-firebase/firestore';
const MainDisplay = ({navigation}) => {
  const[users, setUsers] = useState([]);
  const [posts, setPosts] = useState([]);
  useFocusEffect(
    React.useCallback(() => {
      const fetchData = async () => {
        try {
          //Posts
          const postsCollection = firestore().collection('Posts');
          const postSnapshot = await postsCollection.get();
          const allPosts = postSnapshot.docs.map(doc => doc.data());
          if (allPosts && allPosts.length > 0) {
            setPosts(allPosts);
          } else {
            console.log('No posts found');
          }
          //Users
          const userCollection = firestore().collection('Users');
          const userSnapshot = await userCollection.get();
          const allUser = userSnapshot.docs.map(doc => doc.data());
          if (allUser && allUser.length > 0) {
            setUsers(allUser);
          } else {
            console.log('No users found');
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
      <View style={{backgroundColor: 'white', flexDirection: 'row'}}>
        <View style={styles.searchBarContainer}>
          <Icon name="search-outline" size={20} color="dimgray" />
          <TextInput
            placeholder="Start Searching Favorite Car"
            style={styles.passwordInput}
            placeholderTextColor="dimgray"
          />
        </View>
        <TouchableOpacity>
          <Icon name="options-outline" size={43} color="dimgray" />
        </TouchableOpacity>
      </View>

      <View style={{ backgroundColor: 'white' }}>
        <Text style={styles.favoriteCarTitle}>Favorite Cars</Text>
        <ScrollView horizontal style={styles.scrollView}>
          {posts.map((post, index) => (
          
          <TouchableOpacity
            style={styles.item}
            onPress={()=>{
              for (let index = 0; index < users.length; index++) {
                if (users[index].userId === post.userId) {
                  navigation.navigate('AddDetails', {
                    userInfo: users[index],
                    postData: post
                  })
                }
              }
            }}
            >
            <ImageBackground
              style={styles.image}
              source={{uri:post.imageUrl}}
              resizeMode="cover">
              <View style={styles.textContainer}>
                <Text style={styles.title}>{post.title}</Text>
              </View>
            </ImageBackground>
          </TouchableOpacity>
           ))} 
        </ScrollView>
      </View>

      <Text
        style={{
          backgroundColor: 'white',
          fontFamily: 'Urbanist-ExtraBold',
          color: 'black',
          fontSize: 18,
          paddingRight: 22,
          padding: 5,
          textAlign: 'right',
        }}>
        See All
      </Text>
      <ScrollView
        style={styles.container}
        contentContainerStyle={styles.scrollContainer}>
        { posts.map((post, index) => (
        <View style={styles.rowContainer}>
          <TouchableOpacity
            style={styles1.item}
            // onPress={sendData(post)}
            >
            <Image
              style={styles1.image}
                source={{ uri: post.imageUrl }}
              resizeMode="cover"
            />
              <View style={{ padding: 10 }} key={index}>
              <Text style={styles1.title} >{post.title}</Text>
              <Text style={styles1.date}>Upload on: {post.uploadedOn}</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles1.item}
            // onPress={sendData(post)}
            >
            <Image
              style={styles1.image}
              source={{uri:post.imageUrl}}
              resizeMode="cover"
            />
              <View style={{ padding: 10 }} key={index} >
              <Text style={styles1.title}>{post.title}</Text>
                <Text style={styles1.date}>Upload on: {post.uploadedOn}</Text>
            </View>
          </TouchableOpacity>
        </View>
        ))}
       
      </ScrollView>
    </>
  );
};

const styles1 = StyleSheet.create({
  item: {
    flexDirection: 'column',
    width: '50%',
    height: 170,
    borderRadius: 12,
    backgroundColor: 'white',
    marginHorizontal: 22,
    marginTop: 12,
    flex: 1,
    backgroundColor: 'rgba(247, 247, 247, 0.72)',
  },
  image: {
    width: '100%',
    height: '50%',
    borderRadius: 12,
  },
  title: {
    fontFamily: 'Urbanist-Regular',
    color: 'black',
    fontSize: 22,
    fontWeight: 'bold',
  },
  date: {
    fontFamily: 'Urbanist-Regular',
    color: 'dimgray',
    fontSize: 15,
  },
});

const styles = StyleSheet.create({
  rowContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  favoriteCarTitle: {
    fontFamily: 'Urbanist-ExtraBold',
    color: 'black',
    fontSize: 18,
    marginLeft: 22,
    marginTop: 20,
    backgroundColor: 'white',
  },
  scrollView: {
    flexDirection: 'row',
    padding: 16,
    backgroundColor: 'white',
  },
  searchBarContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#E6ECFB',
    borderRadius: 5,
    marginLeft: 25,
    paddingLeft: 20,
  },
  passwordInput: {
    color: '#212121',
    fontFamily: 'Urbanist-Regular',
    width: '80%',
  },
  container: {
    flex: 1,
    backgroundColor: 'white',
    paddingVertical: 25,
  },
  scrollContainer: {
    paddingBottom: 80, // Adjust the value as needed
  },
  item: {
    flexDirection: 'row',
    width: 250, // Adjust the width as needed
    flex: 1,
    borderRadius: 12,
    backgroundColor: '#E6ECFB',
    marginHorizontal: 10, // Adjust the margin as needed
    marginTop: 12,
  },

  // Adjust the height as needed
  image: {
    width: '100%',
    height: 120, // Adjust the height to fit within the screen
    borderRadius: 12,
    overflow: 'hidden',
  },
  textContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.2)', // Adjust the background color and opacity as needed
    padding: 10,
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
  },

  title: {
    fontFamily: 'Urbanist-ExtraBold',
    color: 'white', // Set the text color as needed
    fontSize: 22,
  },
});

export default MainDisplay;
