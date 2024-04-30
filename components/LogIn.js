import React, { useState } from 'react';
import {
  View,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ToastAndroid,
  Alert,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome'; // Import the FontAwesome icon
import auth from '@react-native-firebase/auth';
import { StackActions } from '@react-navigation/native';
const LogIn = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/;


  const handleEmailChange = text => {
    setEmail(text);
  };

  const handlePasswordChange = text => {
    setPassword(text);
  };

  const handleLoginPress = async () => {
    if (emailRegex.test(email) && passwordRegex.test(password)) {
      try {
        const isUserLogin = await auth().signInWithEmailAndPassword(email, password);
        if (isUserLogin) {
          ToastAndroid.show('User Signed in!', ToastAndroid.SHORT);
          // navigation.navigate("MyTabs", options = { headerShown: false });
        }
      } catch (error) {
        if (error.code === 'auth/email-already-in-use') {
          ToastAndroid.show('That email address is already in use!', ToastAndroid.SHORT);
        } else if (error.code === 'auth/invalid-email') {
          ToastAndroid.show('That email address or password is invalid!', ToastAndroid.LONG);
        } else {
          ToastAndroid.show(error.toString(), ToastAndroid.SHORT);
        }
      }
    } else {
      ToastAndroid.show('Please enter valid email and password!', ToastAndroid.LONG);
    }
  };

  return (
    <ScrollView
      style={{
        backgroundColor: '#FFFFFF',
        paddingHorizontal: 18,
        paddingTop: 40,
      }}>
      <Text style={styles.title}>Log Into Your </Text>
      <Text style={styles.carFlexText}>
        Car<Text style={styles.redText}>F</Text>lex Account
      </Text>

      <View style={styles.inputContainer}>
        <TouchableOpacity
          style={styles.iconContainer}
          onPress={() => console.log('Toggle Email Icon')}>
          <Icon
            name={email ? 'envelope-open' : 'envelope'}
            size={20}
            color="#9E9E9E"
          />
        </TouchableOpacity>
        <TextInput
          placeholder="Email"
          style={styles.input}
          value={email}
          onChangeText={handleEmailChange}
          placeholderTextColor="#737373"
        />
      </View>

      <View style={styles.inputContainer}>
        <Icon name="lock" size={20} color="#9E9E9E" style={styles.inputIcon} />
        <TextInput
          placeholder="Password"
          secureTextEntry={!showPassword}
          style={styles.input}
          value={password}
          onChangeText={handlePasswordChange}
          placeholderTextColor="#737373"
        />
        {/* Lock Icon */}
        <TouchableOpacity
          style={styles.iconContainer}
          onPress={() => setShowPassword(!showPassword)}>
          <Icon
            name={showPassword ? 'eye' : 'eye-slash'}
            size={20}
            color="#9E9E9E"
          />
        </TouchableOpacity>
      </View>
      <View style={{ flexDirection: "row", justifyContent: "space-between", marginBottom: 40, marginTop: 5 }}>
        <TouchableOpacity
          style={styles.forgotPassword}
          onPress={() => {
            navigation.navigate("forgotPassword")
          }}>
          <Text style={styles.forgotPasswordText}>Forgot your Password</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.newAccount}
          onPress={() => {
            navigation.navigate("TestingSignUp");
          }}>
          <Text style={styles.forgotPasswordText}>Create new Account</Text>
        </TouchableOpacity>
      </View>
      <TouchableOpacity style={styles.button} onPress={handleLoginPress}>
        <Text style={styles.buttonText}>Log In</Text>
      </TouchableOpacity>

      <View style={styles.orContainer}>
        <View style={styles.line} />
        <Text style={styles.orText}>or continue with</Text>
        <View style={styles.line} />
      </View>

      {/* Google icon */}
      <TouchableOpacity style={styles.googleButton}>
        <Icon name="google" size={35} color="red" />
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  title: {
    fontSize: 40,
    color: '#212121',
    fontFamily: 'Urbanist-Regular',
  },
  carFlexText: {
    fontSize: 40,
    color: '#407BFF',
    fontFamily: 'BrunoAce-Regular',
    flexDirection: 'row',
    display: 'flex',
    marginBottom: 91,
  },
  redText: {
    fontSize: 40,
    color: '#FF0000',
    fontFamily: 'BrunoAce-Regular',
    flexDirection: 'row',
    display: 'flex',
    marginBottom: 91,
    textAlign: 'center', // Center align the text
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 40,
    borderColor: '#E6ECFB',
    borderWidth: 1,
    marginBottom: 20,
    borderRadius: 5,
    paddingHorizontal: 13,
    backgroundColor: '#E6ECFB',
  },
  iconContainer: {
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    // Adjusted icon margin
  },
  inputIcon: {
    marginRight: 4,
  },
  input: {
    flex: 1,
    color: '#212121',
  },
  button: {
    marginTop: 36,
    marginBottom: 36,
    backgroundColor: '#407BFF',
    paddingVertical: 12,
    paddingHorizontal: 120,
    marginBottom: 36,
    borderRadius: 10,
    elevation: 2,
    alignSelf: 'center', // Center align the button
  },
  buttonText: {
    fontSize: 18,
    letterSpacing: 0.01,
    color: '#FFFFFF',
    textAlign: 'center', // Center align the text
  },
  forgotPassword: {
    marginBottom: 6,
    alignSelf: 'left', // Center align the forgot password link
  },
  newAccount: {
    marginBottom: 6,
    alignSelf: "flex-end", // Center align the forgot password link
  },
  forgotPasswordText: {
    color: '#007AFF',
    fontSize: 14,
    fontFamily: 'Urbanist-Bold',
  },
  googleButton: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FFFFFF',
    marginBottom: 20,
    borderRadius: 5,
    borderColor: '#BEBEBE',
    borderWidth: 1,
    height: 50,
    width: 50, // Set the width to make it a square
    alignSelf: 'center', // Center align the Google button
  },
  orContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 30,
  },
  line: {
    flex: 0.48,
    height: 1,
    backgroundColor: 'lightgray',
  },
  orText: {
    fontSize: 18,
    marginHorizontal: 16,
    color: '#212121',
    fontFamily: 'Urbanist-Medium',
  },
});

export default LogIn;
