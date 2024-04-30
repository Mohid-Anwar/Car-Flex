import React, {useState, useEffect} from 'react';
import {
  View,
  TextInput,
  TouchableOpacity,
  Text,
  StyleSheet,
  Image,
} from 'react-native';
import {Picker} from '@react-native-picker/picker';
import Icon from 'react-native-vector-icons/Ionicons';
import {DatePickerModal} from 'react-native-paper-dates';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import { launchImageLibrary } from 'react-native-image-picker';
import storage from '@react-native-firebase/storage';
import Auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';

const Profile = ({navigation}) => {
  const [profileImage, setProfileImage] = useState("");
  const [name, setName] = useState('');
  const [date, setDate] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [gender, setGender] = useState('');
  const [open, setOpen] = useState(false);
  const [isEmailFocused, setIsEmailFocused] = useState(false);
  const[image, setImage] = useState('');
  
  useEffect(() => {
    const uploadImageToFirebase = async () => {
      if (profileImage) {
        try {
          const response = await fetch(profileImage);
          const blob = await response.blob();
          const reference = storage().ref(`Profile_Images/${Auth().currentUser.uid}`);
          await reference.put(blob);
          console.log('Image Uploaded to Firebase Storage');
          const url = await storage().ref(`Profile_Images/${Auth().currentUser.uid}`).getDownloadURL();
          console.log(url);
          setImage(url)
        } catch (error) {
          console.error('Error uploading image:', error);
        }
      }
    };

    uploadImageToFirebase();
  }, [profileImage]);
  const openImagePicker = () => {
    const options = {
      mediaType: 'photo',
      includeBase64: false,
      maxHeight: 2000,
      maxWidth: 2000,
    };

    launchImageLibrary(options)
      .then(async (response) => {
        if (response.didCancel) {
          console.log('User cancelled image picker');
        } else if (response.error) {
          console.log('Image picker error: ', response.error);
        } else {
          const imageUri = await response.uri || (response.assets?.length > 0 && response.assets[0].uri);
          if (imageUri) {
            const imageUriString = String(imageUri); // Convert imageUri to string
            setProfileImage(imageUriString);
            console.log("Uri", imageUri);
          } else {
            console.log('Image URI not found');
          }
        }
      })
      .catch((error) => {
        console.log('Image picker error: ', error);
      });
  };

  const onDismiss = () => {
    setOpen(false);
  };

  const onConfirm = params => {
    setOpen(false);
    setDate(params.date);
  };

  const handleSubmit = async () => {
    const phoneRegex = /^\d{10}$/;
    if (!name  || !date || !gender) {
      alert('Please fill in all fields');
      return;
    }
    const userId = Auth().currentUser.uid
    const store = await firestore()
      .collection('Users') // Use 'users' instead of 'User'
      .doc(userId)
      .set({
        userId:userId,
        name: name,
        email:email,
        date: date,
        phoneNumber: phone,
        gender: gender,
        imageUrl:image,
        posts: [],
      });
    navigation.goBack();
  };

  const handleCancel = () => {
    navigation.goBack();
  };

  return (
    <SafeAreaProvider>
      <View style={styles.container}>
        {/* Profile Image Upload */}
        <View style={styles.imageContainer}>
          <TouchableOpacity style={ styles.imageContainer } onPress={openImagePicker}>
              <Image
                source={image} 
                style={styles.profileImage}
              />          
          </TouchableOpacity>
        </View>

        {/* Name */}
        <TextInput
          placeholder="Name"
          value={name}
          onChangeText={text => setName(text)}
          style={styles.input}
          placeholderTextColor="dimgray"
        />

        {/* Date (Calendar Select) */}
        <View>
          <TouchableOpacity
            style={styles.dateContainer}
            onPress={() => setOpen(true)}>
            <TextInput
              placeholder="Date"
              value={date ? date.toDateString() : ''}
              style={styles.dateInput}
              editable={false}
              placeholderTextColor="dimgray"
            />
            <DatePickerModal
              locale="abc"
              mode="single"
              visible={open}
              onDismiss={onDismiss}
              date={date}
              onConfirm={onConfirm}
            />
            <Icon name="calendar" size={20} color="#212121" />
          </TouchableOpacity>
        </View>

        {/* Email */}
        <TouchableOpacity
          style={styles.dateContainer}
          onPress={() => setOpen(true)}>
          <TextInput
            placeholderTextColor="dimgray"
            placeholder="Enter email"
            value={email}
            onChangeText = {setEmail}
            style={[
              styles.dateInput,
              {color: isEmailFocused ? 'black' : '#212121'},
            ]}
            onFocus={() => setIsEmailFocused(true)}
            onBlur={() => setIsEmailFocused(false)}
          />
          {isEmailFocused ? (
            <Icon name="mail-open" size={20} color="#212121" />
          ) : (
            <Icon name="mail" size={20} color="#212121" />
          )}
        </TouchableOpacity>

        {/* Phone Number */}
        <TextInput
          placeholder="Phone Number"
          value={phone}
          onChangeText={text => setPhone(text)}
          keyboardType="numeric"
          style={styles.input}
          placeholderTextColor="dimgray"
        />

        {/* Gender */}
        <Picker
          selectedValue={gender}
          onValueChange={value => setGender(value)}
          style={styles.input}>
          <Picker.Item label="Select Gender" value="" />
          <Picker.Item label="Male" value="male" />
          <Picker.Item label="Female" value="female" />
        </Picker>

        {/* Submit and Cancel buttons */}
        <TouchableOpacity onPress={handleSubmit} style={styles.submitButton}>
          <Text style={styles.buttonText}>Submit Details</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={handleCancel} style={styles.cancelButton}>
          <Text style={styles.buttonText}>Cancel</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaProvider>
  );
};

const styles = StyleSheet.create({
  imageContainer: {
    backgroundColor: '#E6ECFB',
    marginBottom: 10,
    padding: 10,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 100,
    height: 120,
    width: 120,
    alignSelf: 'center',
  },
  profileImage: {
    height: '100%',
    width: '100%',
    borderRadius: 100,
  },
  container: {
    padding: 20,
    backgroundColor: 'white',
    flex: 1,
    fontFamily: 'Urbanist-Regular',
  },
  input: {
    backgroundColor: '#E6ECFB',
    color: '#212121',
    marginBottom: 10,
    padding: 10,
    borderRadius: 5,
    fontFamily: 'Urbanist-Regular',
  },
  passwordContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#E6ECFB',
    marginBottom: 10,
    padding: 10,
    borderRadius: 5,
  },
  passwordInput: {
    flex: 1,
    color: '#212121',
    fontFamily: 'Urbanist-Regular',
  },
  eyeIconContainer: {
    marginLeft: 10,
  },
  dateContainer: {
    backgroundColor: '#E6ECFB',
    marginBottom: 10,
    padding: 10,
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 5,
    fontFamily: 'Urbanist-Regular',
  },
  dateInput: {
    flex: 1,
    color: '#212121',
    fontFamily: 'Urbanist-Regular',
  },
  submitButton: {
    backgroundColor: '#A7FF7D',
    padding: 15,
    borderRadius: 5,
    marginBottom: 10,
  },
  cancelButton: {
    backgroundColor: '#FF9466',
    padding: 15,
    borderRadius: 5,
    marginBottom: 10,
  },
  buttonText: {
    color: '#000000',
    textAlign: 'center',
    fontFamily: 'Urbanist-Regular',
  },
});

export default Profile;
