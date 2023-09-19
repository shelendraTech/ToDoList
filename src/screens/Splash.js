// SplashScreen.js

import React, { useEffect } from 'react';
import { View, Image, StyleSheet,Text } from 'react-native';
import { useNavigation } from '@react-navigation/native';


export default function Splash() {

    var navigation = useNavigation()
    // Use useEffect to add a delay and then navigate to the main screen
    useEffect(() => {
        const splashTimeout = setTimeout(() => {
            navigation.navigate('Landing'); // Replace 'MainScreen' with the name of your main screen
        }, 2000); // Adjust the duration (in milliseconds) as needed

        return () => clearTimeout(splashTimeout);
    }, [navigation]);

    return (
        <View style={styles.container}>
            <Image source={require('../assets/images/logo.png')} style={styles.splashImage} />
            <Text style={styles.todotext}>To Do List</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'white',
    },
    splashImage: {
        width: 200,
        height: 200,
    },
    todotext:{
        fontSize:30,
        fontWeight:'bold',

    }
});


