// App.js

import React, { useState } from 'react';
import LandingPage from './components/LandingPage'; // Update with the correct file path
import Welcome from './components/Welcome';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {NavigationContainer} from '@react-navigation/native';
import LogIn from './components/LogIn';
import Signup from './components/Profile';
import {enGB, registerTranslation} from 'react-native-paper-dates';
import TestingSignUp from './components/TestingSignUp';
import HomeScreen from './components/Home';
import ForgotPassword from './components/ForgotPassword';
import NewPassword from './components/NewPasswordScreen';
import Otp from './components/Otp';
import Profile from './components/Profile';
import MainDisplay from './components/MainDisplayScreen';
import AdvancedSearch from './components/AdvancedSearch';
import AddDetails from './components/AddDetails';
registerTranslation('en-GB', enGB);

const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <NavigationContainer>

      <Stack.Navigator
        screenOptions={{
          title: '',
        }}>
        <Stack.Screen
          name="Landing"
          component={LandingPage}
          options={{headerShown: false}}
        />
        <Stack.Screen name="Welcome" component={Welcome} />
        <Stack.Screen name="Login" component={LogIn} options={{headerShown: false}} />
        <Stack.Screen name="TestingSignUp" component={TestingSignUp} options={{ headerShown: false }} />
        <Stack.Screen name="forgotPassword" component={ForgotPassword} options={{headerShown:false}} />
        <Stack.Screen
          name="Otp"
          component={Otp}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="NewPassword"
          component={NewPassword}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Signup"
          component={Signup}
          options={{title: 'Enter Your Details'}}
        />
        <Stack.Screen
          name="Profile"
          component={Profile}
          options={{ title: 'Enter Your Details' }}
        />
        <Stack.Screen name='HomeScreen' component={HomeScreen} options={{
          headerShown:false,
          headerLeft: null, // Remove the back button
        }} />
        <Stack.Screen
          name="AddDetails"
          component={AddDetails}
          options={{ title: 'Enter Your Details' }}
        />
        <Stack.Screen
          name="MainDisplayScreen"
          component={MainDisplay}
          options={{
            headerShown: false,
            headerLeft: null, // Remove the back button
          }}
        />
        <Stack.Screen
          name="AdvancedSearch"
          component={AdvancedSearch}
          options={({ navigation }) => ({
            headerShown: true,
            title: 'Advanced Search',
            headerRight: () => (
              <TouchableOpacity
                style={{ marginRight: 16 }}
                onPress={() => {
                  // Add your logic here when the tick button is pressed
                  // For example, you can navigate to another screen or perform an action
                }}>
                <Icon
                  name="checkmark-done-sharp"
                  size={27}
                  color="#000000"
                  style={{ marginRight: -8 }}
                />
              </TouchableOpacity>
            ),
          })}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
