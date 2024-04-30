import React from 'react';
import {
  ScrollView,
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';

const WelcomeScreen = ({navigation}) => {
  return (
    <View style={styles.container}>
      <ScrollView
        contentContainerStyle={styles.scrollView}
        showsVerticalScrollIndicator={false}>
        <View style={styles.welcomeContainer}>
          <Text style={styles.welcomeText}>Welcome</Text>
          {/* Facebook Button */}
          <View style={styles.buttonContainer}>
            <TouchableOpacity style={styles.facebookButton}>
              <Icon
                name="facebook"
                size={28}
                color="#4267B2"
                style={styles.icon}
              />
              <Text style={styles.continueWithText}>
                Continue with Facebook
              </Text>
            </TouchableOpacity>
          </View>
          {/* Google Button */}
          <View style={styles.buttonContainer}>
            <TouchableOpacity style={styles.googleButton}>
              <Icon
                name="google"
                size={28}
                color="#DB4437"
                style={styles.icon}
              />
              <Text style={styles.continueWithText}>Continue with Google</Text>
            </TouchableOpacity>
          </View>
          {/* Or Separator */}
          <View style={styles.orContainer}>
            <View style={styles.line} />
            <Text style={styles.orText}>or</Text>
            <View style={styles.line} />
          </View>
          {/* Login with Credentials Button */}

          <TouchableOpacity
            style={styles.loginWithCredentialsButton}
            onPress={() => navigation.navigate('Login')}>
            <Text style={styles.loginWithCredentialsText}>
              Login with Credentials
            </Text>
          </TouchableOpacity>
          {/* Additional Text */}
          <View style={styles.lineSeparator} />
          <View style={styles.additionalTextContainer}>
            <Text style={styles.dontHaveAnAccountText}>
              Don't have an account?
            </Text>
            <TouchableOpacity
              onPress={() => {
                navigation.navigate('TestingSignUp');
              }}>
              <Text style={styles.signUpTodayText}>Sign up today</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  scrollView: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  welcomeContainer: {
    alignItems: 'center',
    marginHorizontal: 24,
    marginTop: 99,
  },
  welcomeText: {
    fontSize: 48,
    marginBottom: 99,
    textAlign: 'center',
    color: '#212121',
    fontFamily: 'Urbanist-Light',
  },
  buttonContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 16,
  },
  facebookButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 18,
    paddingHorizontal: 16,
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    elevation: 2,
    width: 300, // Adjust the width as needed
    borderWidth: 1, // Add this line to set the border width
    borderColor: '#EEEEEE', // Set the border color
  },

  googleButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 18,
    paddingHorizontal: 16,
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    elevation: 2,
    width: 300,
    borderWidth: 1, // Add this line to set the border width
    borderColor: '#EEEEEE', // Set the border color
  },

  icon: {
    marginRight: 6,
  },
  continueWithText: {
    fontFamily: 'Urbanist-Bold',
    fontSize: 16,
    letterSpacing: 0.01,
    color: '#212121',
    textAlign: 'center',
    marginLeft: 30,
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
  loginWithCredentialsButton: {
    backgroundColor: '#407BFF',
    paddingVertical: 18,
    paddingHorizontal: 50,
    borderRadius: 20,
    elevation: 2,
    marginBottom: 49,
  },
  loginWithCredentialsText: {
    fontSize: 16,
    letterSpacing: 0.01,
    fontFamily: 'Urbanist-ExtraBold',
    color: 'white',
  },
  lineSeparator: {
    height: 1,
    backgroundColor: 'lightgray',
    width: 368,
    marginBottom: 60,
  },
  additionalTextContainer: {
    flexDirection: 'row',
    marginBottom: 145,
  },
  dontHaveAnAccountText: {
    fontFamily: 'Urbanist-Light',
    fontSize: 14,
    letterSpacing: 0.01,
    color: '#9E9E9E',
  },
  signUpTodayText: {
    fontFamily: 'Urbanist-Light',
    fontSize: 14,
    letterSpacing: 0.01,
    marginLeft: 8,
    color: '#407BFF',
  },
});

export default WelcomeScreen;
