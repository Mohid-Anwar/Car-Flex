// LandingPage.js
import React from 'react';
import {
  View,
  Text,
  ScrollView,
  Image,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';

import LinearGradient from 'react-native-linear-gradient';
import Auth from "@react-native-firebase/auth";
import { StackActions } from '@react-navigation/native';
const LandingPage = ({ navigation }) => {

  const handleAction = () => {
    Auth().onAuthStateChanged(user => {
      const routeName = user !== null ? 'HomeScreen' : 'Login';
      navigation.navigate(routeName)
      // navigation.dispatch(StackActions.replace(routeName));

    })
  }
  return (
    <View style={styles.container}>
      <LinearGradient
        colors={['#08032C', '#3921F5']}
        style={styles.LinearGradient}>
        <ScrollView style={styles.scrollView}>
          <View style={styles.contentContainer}>
            <Text style={styles.title}>
              Car<Text style={{ color: 'red' }}>F</Text>lex
            </Text>
            <Image
              source={require('../images/Fortuner.png')}
              style={styles.image}
            />
            <Text style={styles.subtitle}>
              Delve into the world of the Auto-Mobile Industry
            </Text>
          </View>
          <View style={styles.btnContainer}>
            <TouchableOpacity
              style={styles.btn}
              onPress={handleAction}>
              <Text style={styles.btnText}>Let's Go</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </LinearGradient>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  LinearGradient: {
    width: '100%',
    height: '100%',
  },
  scrollView: {
    flex: 1,
    width: '100%',
  },
  contentContainer: {
    alignItems: 'center',
  },
  title: {
    fontSize: 64,
    marginTop: 60,
    fontFamily: 'BrunoAce-Regular',
  },
  image: {
    height: 450,
    width: '90%',
    resizeMode: 'contain',
    marginTop: 21,
  },
  subtitle: {
    fontSize: 24,
    marginTop: 20,
    marginBottom: 15,
    textAlign: 'center',
    fontFamily: 'Barlow-Bold',
  },
  btnContainer: {
    alignItems: 'center',
    marginTop: 20,
  },
  btn: {
    width: '80%',
    backgroundColor: 'white',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 40,
    marginBottom: 20,
  },
  btnText: {
    color: '#2C2B34',
    fontSize: 18,
    fontFamily: 'Barlow-Bold',
    textAlign: 'center',
  },
});

export default LandingPage;