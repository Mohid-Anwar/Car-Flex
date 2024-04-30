import React, {useState, useRef} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  ToastAndroid,
} from 'react-native';

const Otp = ({navigation, route}) => {
  const {phoneNumber: email} = route.params;
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [verificationCode, setVerificationCode] = useState('');
  const inputRefs = useRef(otp.map(() => React.createRef()));

  const showToast = message => {
    ToastAndroid.showWithGravityAndOffset(
      message,
      ToastAndroid.LONG,
      ToastAndroid.BOTTOM,
      25,
      50,
    );
  };

  const handleInputChange = (index, value) => {
    // Check if the entered value is empty (backspace press)
    if (value === '') {
      // Clear all OTP digits
      const newOtp = Array(otp.length).fill('');
      setOtp(newOtp);

      // Move focus to the first input field
      const firstInputRef = inputRefs.current[0];
      if (
        firstInputRef &&
        firstInputRef.current &&
        firstInputRef.current.focus
      ) {
        firstInputRef.current.focus();
      }

      return;
    }

    // Check if the entered value is a number
    if (!/^\d+$/.test(value)) {
      return; // Ignore non-numeric values
    }

    // Update the OTP array with the new value at the specified index
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    // Concatenate the OTP values and update the verificationCode state
    const concatenatedCode = newOtp.join('');
    setVerificationCode(concatenatedCode);

    // Move focus to the next input field
    const nextIndex = index + 1;
    if (nextIndex < otp.length) {
      const nextInputRef = inputRefs.current[nextIndex];
      if (nextInputRef && nextInputRef.current && nextInputRef.current.focus) {
        nextInputRef.current.focus();
      }
    }
  };

  const handleVerify = () => {
    // Check if all OTP fields are filled
    if (otp.every(digit => digit.length > 0)) {
      // All OTP fields are filled, you can proceed with verification
      console.log('Verification Code:', verificationCode);
      navigation.navigate('NewPassword');
    } else {
      // Display an error message using Android Toast
      showToast('Please fill in all OTP fields');
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.subTitle}>Code has been sent to {email}</Text>

      <View style={styles.inputContainer}>
        {otp.map((digit, index) => (
          <TextInput
            key={index}
            style={styles.input}
            placeholder="0"
            placeholderTextColor="#BDBDBD"
            maxLength={1}
            keyboardType="numeric"
            value={digit}
            onChangeText={value => handleInputChange(index, value)}
            ref={inputRefs.current[index]}
            caretHidden={true} // Hide the cursor
            onKeyPress={({nativeEvent}) => {
              if (nativeEvent.key === 'Backspace') {
                // Handle backspace press
                handleInputChange(index, '');
              }
            }}
          />
        ))}
      </View>

      <TouchableOpacity style={styles.button} onPress={handleVerify}>
        <Text style={styles.buttonText}>Verify</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
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
    justifyContent: 'space-evenly',
    marginTop: 20,
    marginBottom: 20,
    width: '100%',
  },
  input: {
    width: 50,
    height: 50,
    borderWidth: 1,
    borderColor: '#E6ECFB',
    borderRadius: 5,
    margin: 5,
    textAlign: 'center',
    fontSize: 18,
    color: '#000000',
    backgroundColor: '#E6ECFB',
    fontFamily: 'Urbanist-Bold',
  },
  button: {
    backgroundColor: '#407BFF',
    elevation: 2,
    alignSelf: 'center',
    padding: 15,
    borderRadius: 5,
    marginTop: 20,
    marginBottom: 20,
    width: '80%',
  },
  buttonText: {
    fontSize: 14,
    letterSpacing: 0.01,
    color: '#FFFFFF',
    textAlign: 'center',
    fontFamily: 'Urbanist-Bold',
  },
});

export default Otp;
