import { View, Text } from 'react-native'
import React from 'react'
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Splash from '../screens/Splash';
import Landing from '../screens/Landing';
import Signin from '../screens/Signin';
import Register from '../screens/Register';
import OtpVerification from '../screens/OtpVerification';
import Home from '../screens/Home';
import CustomHeader from '../screens/CustomHeader';

export default function Navigator() {


    //All compenent call here...
    const Stack = createNativeStackNavigator();
    return (
        
        <NavigationContainer>
            <Stack.Navigator initialRouteName='Splash'>
                <Stack.Screen name="Splash" component={Splash} options={{ headerShown: false }} />
                <Stack.Screen name="Landing" component={Landing} options={{ headerShown: false }} />
                <Stack.Screen name="Signin" component={Signin} options={{ headerShown: false }} />
                <Stack.Screen name="Register" component={Register} options={{ headerShown: false }} />
                <Stack.Screen name="OtpVerification" component={OtpVerification} options={{ headerShown: false }} />
                <Stack.Screen name="Home" component={Home} options={{header:CustomHeader}}/>
            </Stack.Navigator>
        </NavigationContainer>
    )
}