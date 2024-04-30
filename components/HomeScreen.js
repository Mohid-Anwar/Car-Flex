import React, { useId } from 'react';
import MainDisplay from './MainDisplayScreen';
// HomeScreen component
const Home = ({ navigation }) => {
    return (
        <MainDisplay navigation={navigation} />
    );
};

export default Home;

