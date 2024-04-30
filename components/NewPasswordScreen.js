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

import Icon from 'react-native-vector-icons/FontAwesome5';
import Icon1 from 'react-native-vector-icons/AntDesign';
const NewPassword = ({navigation}) => {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [isConfirmPasswordVisible, setIsConfirmPasswordVisible] =
    useState(false);

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
    // Password regex pattern
    const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/;

    if (!passwordRegex.test(password)) {
      // Invalid password, show error toast
      showToast(
        'Password must contain at least 8 characters, including one uppercase letter, one lowercase letter, and one digit.',
      );
    } else if (password !== confirmPassword) {
      // Passwords don't match, show error toast
      showToast('Passwords do not match.');
    } else {
      // Valid password and matching confirmation, navigate to login
      navigation.navigate('Login');
    }
  };

  const togglePasswordVisibility = () => {
    setIsPasswordVisible(!isPasswordVisible);
  };

  const toggleConfirmPasswordVisibility = () => {
    setIsConfirmPasswordVisible(!isConfirmPasswordVisible);
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}>
      <ScrollView>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.backButton}>
          <Icon1
            name="arrowleft"
            size={30}
            color="#1E232C"
            style={{marginTop: 3}}
          />
        </TouchableOpacity>

        <View style={styles.titleContainer}>
          <Text style={styles.title}>Create New Password</Text>
          <Text style={styles.subTitle}>Please Enter New Password</Text>
        </View>

        <View style={styles.inputContainer}>
          <Icon
            name={password ? 'unlock' : 'lock'}
            size={24}
            color="#BDBDBD"
            style={styles.emailIcon}
          />

          <TextInput
            style={styles.input}
            placeholder="Enter your new password"
            placeholderTextColor="#BDBDBD"
            secureTextEntry={!isPasswordVisible}
            onChangeText={text => setPassword(text)}
          />
          <TouchableOpacity
            style={styles.visibilityIcon}
            onPress={togglePasswordVisibility}>
            <Icon
              name={isPasswordVisible ? 'eye' : 'eye-slash'}
              size={20}
              color="#BDBDBD"
            />
          </TouchableOpacity>
        </View>

        <View style={styles.inputContainer}>
          <Icon
            name={confirmPassword ? 'unlock' : 'lock'}
            size={24}
            color="#BDBDBD"
            style={styles.emailIcon}
          />
          <TextInput
            style={styles.input}
            placeholder="Confirm your new password"
            placeholderTextColor="#BDBDBD"
            secureTextEntry={!isConfirmPasswordVisible}
            onChangeText={text => setConfirmPassword(text)}
          />
          <TouchableOpacity
            style={styles.visibilityIcon}
            onPress={toggleConfirmPasswordVisibility}>
            <Icon
              name={isConfirmPasswordVisible ? 'eye' : 'eye-slash'}
              size={20}
              color="#BDBDBD"
            />
          </TouchableOpacity>
        </View>

        <TouchableOpacity style={styles.button} onPress={handleContinue}>
          <Text style={styles.buttonText}>Reset Password</Text>
        </TouchableOpacity>
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
  visibilityIcon: {
    position: 'absolute',
    right: 10,
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

export default NewPassword;
