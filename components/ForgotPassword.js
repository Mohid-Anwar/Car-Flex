import React, {useState} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  ToastAndroid,
} from 'react-native';

import Icon from 'react-native-vector-icons/AntDesign';
import Icon1 from 'react-native-vector-icons/FontAwesome5';

const ForgotPassword = ({navigation}) => {
  const [phoneNumber, setPhoneNumber] = useState('');

  const showToast = message => {
    ToastAndroid.showWithGravityAndOffset(
      message,
      ToastAndroid.LONG,
      ToastAndroid.BOTTOM,
      25,
      50,
    );
  };
  const handleContinue = () => {
    // Phone number regex pattern
    const phoneRegex = /^((\+92)?(0092)?(92)?(0)?)(3)([0-9]{9})$/gm;

    if (phoneRegex.test(phoneNumber)) {
      // Valid phone number, navigate to OTP screen
      navigation.navigate('Otp', {phoneNumber});
    } else {
      // Invalid phone number, show error toast
      showToast('Invalid Phone Number');
    }
  };
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}>
      <ScrollView>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.backButton}>
          <Icon
            name="arrowleft"
            size={30}
            color="#1E232C"
            style={{marginTop: 3}}
          />
        </TouchableOpacity>

        <View style={styles.titleContainer}>
          <Text style={styles.title}>Forgot Password</Text>
          <Text style={styles.subTitle}>
            Please enter your associated phone number
          </Text>
        </View>

        <View style={styles.inputContainer}>
          <Icon1
            name={phoneNumber ? 'phone' : 'phone-alt'}
            size={24}
            color="#BDBDBD"
            style={styles.emailIcon}
          />
          <TextInput
            style={styles.input}
            placeholder="Enter your phone number"
            placeholderTextColor="#BDBDBD"
            keyboardType="phone-pad"
            onChangeText={text => setPhoneNumber(text)}
          />
        </View>

        <TouchableOpacity style={styles.button} onPress={handleContinue}>
          <Text style={styles.buttonText}>Continue</Text>
        </TouchableOpacity>

        <View style={styles.rememberContainer}>
          <TouchableOpacity onPress={() => navigation.navigate('Login')}>
            <Text style={styles.rememberText}>
              {' '}
              Remember Password{'  '}
              <Text style={styles.loginLink}>Login</Text>
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  backButton: {
    flex: 0.3,
    top: 30,
    left: 30,
  },
  titleContainer: {
    marginTop: 60,
    alignItems: 'flex-start',
    margin: 20,
    marginBottom: 40,
  },
  title: {
    fontSize: 30,
    fontFamily: 'Urbanist-Bold',
    color: '#000000',
  },
  subTitle: {
    marginBottom: 30,
    fontSize: 16,
    color: '#000000',
    textAlign: 'center',
    fontFamily: 'Urbanist-Light',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    height: 60,
    borderColor: '#E6ECFB',
    borderWidth: 1,
    marginTop: 20,
    marginBottom: 20,
    borderRadius: 5,
    backgroundColor: '#E6ECFB',
    width: '90%',
    alignSelf: 'center',
  },
  emailIcon: {
    marginLeft: 10,
    marginRight: 10,
  },
  input: {
    flex: 1,
    color: '#000000',
    fontFamily: 'Urbanist',
  },
  button: {
    backgroundColor: '#407BFF',
    elevation: 2,
    alignSelf: 'center',
    padding: 15,
    borderRadius: 5,
    marginTop: 20,
    marginBottom: 50,
    width: '80%',
  },
  buttonText: {
    fontSize: 14,
    letterSpacing: 0.01,
    color: '#FFFFFF',
    textAlign: 'center',
    fontFamily: 'Urbanist-Bold',
  },
  rememberContainer: {
    marginTop: 20,
    alignItems: 'center',
  },
  rememberText: {
    color: '#000000',
    fontSize: 14,
    fontFamily: 'Urbanist-Bold',
  },
  loginLink: {
    color: '#007AFF',
    fontSize: 14,
    fontFamily: 'Urbanist-Bold',
  },
});

export default ForgotPassword;
