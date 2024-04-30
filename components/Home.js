import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import Icon from 'react-native-vector-icons/Ionicons';
import UserIcon from 'react-native-vector-icons/AntDesign';
import SettingIcon from 'react-native-vector-icons/Entypo';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Text, View } from "react-native";
import DrawerContent from './DrawerContent'; // Import your screen components
import PostAnAdd from './PostAnAdd';
import MyAdds from './MyAdds';
import Profile from './Profile';
import AddDetails from './AddDetails';
import FavoriteAdds from './Favorite';
import { TouchableOpacity } from 'react-native'
import ViewProfile from './ViewProfile';
import newCard from './newCard';
import PaymentMethod from './PaymentMethod'
import Cart from './Cart'
import MainDisplay from './MainDisplayScreen';
import Home from './HomeScreen';
import Videos from './Videos';
const Drawer = createDrawerNavigator();
const Tab = createBottomTabNavigator();

function TabNavigator({ navigation }) {
    return (
        <Tab.Navigator
            screenOptions={{ headerShown: false }}
        >
            <Tab.Screen name="HomeScreen" component={Home}
                options={{
                    tabBarLabel: 'Home',
                    tabBarIcon: ({ color, size }) => (
                        <Icon name="home-outline" size={size} color={color} />
                    ),
                }} />

            <Tab.Screen name="My Ads" component={MyAdds}
                options={{
                    tabBarIcon: ({ color, size }) => (
                        <SettingIcon name="sound" size={size} color={color} />
                    ),
                    headerShown: false
                }} />
            <Tab.Screen name="ViewProfile" component={ViewProfile}
                options={{
                    tabBarIcon: ({ color, size }) => (
                        <UserIcon name="user" size={size} color={color} />
                    ),
                }} />
            <Tab.Screen
                name="Settings"
                component={DrawerContent}
                options={{
                    tabBarIcon: ({ color, size }) => (
                        <SettingIcon name="dots-three-vertical" size={size} color={color} />
                    ),
                    tabBarLabel: 'Settings',
                    tabBarButton: (props) => (
                        <TouchableOpacity
                            {...props}
                            onPress={() => navigation.openDrawer()}
                        />
                    ),
                }}
            />
        </Tab.Navigator>
    );
}

function CombinedNavigator() {
    return (
        <Drawer.Navigator drawerContent={props => <DrawerContent {...props} />}>
            <Drawer.Screen name="Home" component={TabNavigator}
                options={{
                    headerTitle: 'CarFlex', // Set the header title for this screen
                    headerTitleAlign: 'center', // Align the title to the center
                    headerShown: true, // Show the header for this screen
                }} />
            <Drawer.Screen name='PostAnAdd' component={PostAnAdd}
                options={{
                    headerTitle: 'Car Details', // Set the header title for this screen
                    headerTitleAlign: 'left', // Align the title to the center
                    headerShown: true, // Show the header for this screen
                }} />
            <Drawer.Screen name='MyAdds' component={MyAdds}
                options={{
                    headerTitle: 'My Adds', // Set the header title for this screen
                    headerTitleAlign: 'left', // Align the title to the center
                    headerShown: true, // Show the header for this screen
                }} />
            <Drawer.Screen name='AddDetails' component={AddDetails}
                options={{
                    headerShown: false, // Show the header for this screen
                }} />
            <Drawer.Screen name='FavoriteAdds' component={FavoriteAdds}
                options={{
                    headerTitle: 'Favorites', // Set the header title for this screen
                    headerTitleAlign: 'left', // Align the title to the center
                    headerShown: true,
                }} />
            <Drawer.Screen name='NewCard' component={newCard}
                options={{
                    headerTitle: 'Favorites', // Set the header title for this screen
                    headerTitleAlign: 'left', // Align the title to the center
                    headerShown: true,
                }} />
            <Drawer.Screen name='PaymentMethod' component={PaymentMethod}
                options={{
                    headerTitle: 'Payment Methods', // Set the header title for this screen
                    headerTitleAlign: 'left', // Align the title to the center
                    headerShown: true,
                }} />
            <Drawer.Screen name='Cart' component={Cart}
                options={{
                    headerTitle: 'Cart', // Set the header title for this screen
                    headerTitleAlign: 'left', // Align the title to the center
                    headerShown: true,
                }} />
            <Drawer.Screen name='MainDisplayScreen' component={MainDisplay}
                options={{
                    headerTitle: 'Cart', // Set the header title for this screen
                    headerTitleAlign: 'left', // Align the title to the center
                    headerShown: true,
                }} />
            <Drawer.Screen name='ViewProfile' component={ViewProfile}
                options={{
                    headerTitle: 'Cart', // Set the header title for this screen
                    headerTitleAlign: 'left', // Align the title to the center
                    headerShown: true,
                }} />
            <Drawer.Screen name='Videos' component={Videos}
                options={{
                    headerTitle: (prop) => (
                        <View style={{ flexDirection: "row" }}>
                            <Text style={{ fontSize: 25, color: 'black', fontFamily: "BrunoAce-Regular" }}>Car</Text>
                            <Text style={{ fontSize: 25, color: 'red', fontFamily: "BrunoAce-Regular" }}>F</Text>
                            <Text style={{ fontSize: 25, color: 'black', fontFamily: "BrunoAce-Regular" }}>lex</Text>
                            <Text style={{ fontSize: 25, color: 'black' }}> Videos</Text>
                        </View>
                    ), // Set the header title for this screen
                    headerTitleAlign: 'left', // Align the title to the center
                    headerShown: true, // Show the header for this screen
                }} />
        </Drawer.Navigator>
    );
}

export default CombinedNavigator;
