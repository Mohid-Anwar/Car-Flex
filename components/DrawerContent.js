import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  TouchableHighlight,
  StyleSheet,
  Image,
} from 'react-native';
import { DrawerContentScrollView, DrawerItem } from '@react-navigation/drawer';
import Icon from 'react-native-vector-icons/FontAwesome5';
import Auth from '@react-native-firebase/auth'
import { StackActions } from '@react-navigation/native';
import { useFocusEffect } from '@react-navigation/native';
import firestore from '@react-native-firebase/firestore';

const CustomDrawerItem = ({ icon, label, onPress, onLongPress }) => {
  const [isPressed, setIsPressed] = useState(false);

  return (
    <TouchableHighlight
      style={[
        styles.drawerItemTouchable,
        isPressed && { backgroundColor: 'black' },
      ]}
      onPress={onPress}
      onLongPress={() => {
        onLongPress && onLongPress();
        setIsPressed(true);
      }}
      onPressOut={() => setIsPressed(false)}
      underlayColor="aliceblue">
      <View style={styles.drawerItemInner}>
        <Icon name={icon} size={20} color="#000" />
        <Text style={styles.drawerItemText}>{label}</Text>
      </View>
    </TouchableHighlight>
  );
};

const DrawerContent = ({ navigation }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [image, setImage] = useState('');
  const [isPressed, setIsPressed] = useState(false);
  useFocusEffect(
    React.useCallback(() => {
      const fetchData = async () => {
        try {
          const userDocument = firestore().collection('Users').doc(Auth().currentUser.uid);
          const userData = await userDocument.get();

          if (userData.exists) {
            const data = userData.data();
            const name = data.name;
            const imageUrl = data.imageUrl;
            const email = data.email;
            setName(name);
            setEmail(email)
            setImage(imageUrl);
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
    <View style={styles.outerContainer}>
      <View style={styles.container}>
        <DrawerContentScrollView>
          {/* Header */}
          <View style={styles.header}>
            <Text style={styles.carFlexText}>
              Car<Text style={styles.redText}>F</Text>lex
            </Text>
          </View>
          {/* Circle Touchable Item */}
          <TouchableHighlight
            style={[
              styles.circleTouchable,
              isPressed && { backgroundColor: 'black' },
            ]}
            onPress={() => {
              navigation.navigate('ViewProfile');
            }}
            onLongPress={() => {
              setIsPressed(true);
            }}
            onPressOut={() => setIsPressed(false)}
            underlayColor="aliceblue">
            <View style={styles.circleTouchableInner}>
              <Image source={{ uri: image }} style={styles.avatar} />
              <View style={styles.textContainer}>
                <Text style={styles.name}>{name}</Text>
                <Text style={styles.email}>{email}</Text>
              </View>
            </View>
          </TouchableHighlight>
          {/* Drawer items */}
          <CustomDrawerItem
            icon="home"
            label="Home"
            onPress={() => {
              navigation.navigate('Home');
            }}
          />
          <CustomDrawerItem
            icon="heart"
            label="Favourites"
            onPress={() => {
              navigation.navigate('FavoriteAdds');
            }}
          />
          <CustomDrawerItem
            icon="car"
            label="My Ads"
            onPress={() => {
              navigation.navigate('MyAdds');
            }}
          />
          <CustomDrawerItem
            icon="credit-card"
            label="New Card"
            onPress={() => {
              navigation.navigate('NewCard');
            }}
          />
          <CustomDrawerItem
            icon="bullhorn"
            label="Post An Ad"
            onPress={() => {
              navigation.navigate('PostAnAdd');
            }}
          />
          <CustomDrawerItem
            icon="youtube"
            label="Browse CarFlex Videos"
            onPress={() => {
              navigation.navigate('Videos');
            }}
          />
          {/* <CustomDrawerItem
            icon="youtube"
            label="Browse CarFlex Videos"
            onPress={() => {
              navigation.navigate('MainDisplayScreen');
            }}
          /> */}
          {/* Add other drawer items as needed */}
        </DrawerContentScrollView>
        {/* Logout button */}
        <TouchableOpacity
          style={styles.logoutButton}
          onPress={async () => {
            try {
              await Auth().signOut(); // Sign out the user using your authentication library
              navigation.dispatch(StackActions.popToTop()); // Navigate to the top of the stack
            } catch (error) {
              console.error('Sign out error:', error);
            }
          }}>
          <Icon name="sign-out-alt" size={20} color="#407BFF" />
          <Text style={styles.logoutText}>Logout</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  outerContainer: {
    flex: 1,
  },
  container: {
    flex: 1,
    backgroundColor: '#E6ECFf',
  },
  header: {
    paddingVertical: 20,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  carFlexText: {
    fontSize: 32,
    color: '#1E232C',
    fontFamily: 'BrunoAce-Regular',
    flexDirection: 'row',
    display: 'flex',
    marginBottom: 6,
  },
  redText: {
    fontSize: 40,
    color: '#FF0000',
    fontFamily: 'BrunoAce-Regular',
    flexDirection: 'row',
    display: 'flex',
    marginBottom: 91,
    textAlign: 'center',
  },
  circleTouchable: {
    borderRadius: 100,
    overflow: 'hidden',
  },
  circleTouchableInner: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  avatar: {
    width: 55,
    height: 55,
    borderRadius: 40,
    marginRight: 16,
    borderWidth: 1,
    borderColor: 'black',
  },
  textContainer: {
    flexDirection: 'column',
  },
  name: {
    fontSize: 18,
    color: 'black',
    marginBottom: 4,
    fontFamily: 'Urbanist-Bold',
  },
  email: {
    fontSize: 14,
    color: '#777',
    fontFamily: 'Urbanist-Medium',
  },
  drawerItemTouchable: {
    padding: 16,
    borderTopRightRadius: 40,
    borderBottomRightRadius: 40,
    marginRight: 6,
    marginLeft: 6,
  },
  drawerItemInner: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  drawerItemText: {
    marginLeft: 16,
    fontSize: 16,
    color: '#000',
  },
  logoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
    marginBottom: 50,
    marginLeft: 14,
    marginRight: 14,
    backgroundColor: '#282931',
    borderRadius: 30,
    borderWidth: 1,
  },
  logoutText: {
    marginLeft: 6,
    fontSize: 18,
    color: '#FF0000',
    fontFamily: 'Urbanist-Medium',
  },
});

export default DrawerContent;

