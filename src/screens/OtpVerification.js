import { View, Text, Dimensions, StyleSheet, TouchableOpacity, ScrollView, Alert } from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
import { useNavigation } from '@react-navigation/native';
import OTPTimer from './OTPTimer';
import OTPTextInput from 'react-native-otp-textinput';
import database from '@react-native-firebase/database';

const SCREEN_HEIGHT = Dimensions.get('screen').height
const SCREEN_WIDTH = Dimensions.get('screen').width

const OTPVerification = ({ route, navigation }) => {


    const generatedotp= route.params.otp
    const userName = route.params.name
    const email = route.params.email
    const password = route.params.password

    
    useEffect(function () {
        alert(generatedotp)
    }, [])

    const [otp, setOTP] = useState()

    const [timerExpired, setTimerExpired] = useState(false);

    const handleTimeout = () => {
        setTimerExpired(true);
        // Implement what happens when the timer expires (e.g., request a new OTP)
    };
    let otpInput = useRef(null);

    const handleResend = () => {
        setTimerExpired(false)
    }


    const handleSubmitData = async () => {

        try {

            const response = await database().ref('users').push({
                usename: userName,
                email: email,
                password: password
            })
            
            console.log(response)
        } catch (error) {
            console.log(error)
        }
    }


    const handleverify = () => {
        if (generatedotp == otp) {
            handleSubmitData()
            navigation.navigate('Signin')
        }
        else {
            alert("Please Enter a Valid OTP")
        }
    }
    return (
        <ScrollView style={{ flex: 1 }}>
            <View style={styles.container}>

                <View style={styles.contentbox}>

                    <Text style={styles.verify}>
                        Verify your Email
                    </Text>
                    <Text style={styles.enter}>
                        Enter OTP sent to your email id.</Text>
                    <OTPTextInput
                        inputCount={4}
                        ref={otpInput}
                        handleTextChange={e => setOTP(e)}
                        tintColor={'#130f40'}
                        textInputStyle={{ color: '#130f40' }}
                        containerStyle={{ width: SCREEN_WIDTH * 0.75, }}
                    />
                    <Text style={styles.notget}>
                        Didn't get a code?
                    </Text>
                    {timerExpired == false ? <OTPTimer expiryTimeInSeconds={30} onTimeout={handleTimeout} /> : <></>}
                    {timerExpired ?
                        <TouchableOpacity onPress={handleResend} >
                            <Text style={styles.resend}>Resend </Text>
                        </TouchableOpacity> : <></>}

                    <View>
                        <TouchableOpacity style={{ borderRadius: 30, borderWidth: 2, backgroundColor: '#130f40', height: 50, width: 300, justifyContent: 'center', alignItems: 'center', marginTop: 10 }} onPress={handleverify}>
                            <Text style={{ color: '#fff', fontSize: 22 }}>Verify</Text>
                        </TouchableOpacity>
                    </View>

                </View>



            </View >
        </ScrollView>

    )
}

export default OTPVerification

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        height: SCREEN_HEIGHT,
        padding: 20
    },
    contentbox: {
        height: '60%',
        alignItems: 'center',

    },
    verify: {
        fontSize: 25,
        color: '#130f40'
    },
    enter: {
        color: '#130f40'
    },
    notget: {
        marginBottom: 10,
        marginTop: 50,
        marginHorizontal: 20,
        textAlign: 'center',
        color: '#130f40'
    },
    resend: {
        color: '#130f40',

    },
    didntget: {
        marginTop: 100,
    },
    resendbtn: {
        marginLeft: 5,
        marginBottom: 30
    }
})
