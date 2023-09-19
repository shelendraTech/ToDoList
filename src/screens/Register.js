import { View, Text, Dimensions, StyleSheet, TextInput, Image, TouchableOpacity, ScrollView } from 'react-native'
import React, { useState, useEffect } from 'react';
import Icon from "react-native-vector-icons/Ionicons";
import { useNavigation } from '@react-navigation/native';


const SCREEN_HEIGHT = Dimensions.get('screen').height;
const SCREEN_WIEDTH = Dimensions.get('screen').width;


export default function Register({ navigation }) {

    const [otp, setOtp] = useState(null)
    const [userName, setUserName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [list, setList] = useState(null)


    const handlesignin = () => {
        navigation.navigate('Signin')
    }
    // console.log("name", userName, " email", email, 'password', password + 'confirmPassword', confirmPassword)



    const handlesignup = async() => {
        try{
        setOtp(optgenerator(4))
        }
        catch(err){
            console.log(err)
        }

        if (otp) {
            navigation.navigate('OtpVerification', { otp: otp,name:userName,email:email,password:password })
        }
    

    }


    const optgenerator = (length) => {
        const digits = '0123456789';
        let OTP = '';

        for (let i = 0; i < length; i++) {
            const randomIndex = Math.floor(Math.random() * digits.length);
            OTP += digits[randomIndex];
        }

        return OTP;

    }


    return (
        <ScrollView >
            <View style={styles.container}>
                <View style={{ alignItems: 'center' }}>
                    <Image source={require("../assets/images/login_image.png")} resizeMode='contain' style={styles.img} />
                    <Text style={styles.createtxt}>Craete Account</Text>
                </View>


                <View>
                    <View style={styles.texinp}>
                        <Icon name="person-outline" style={styles.icon} />
                        <TextInput
                            onChangeText={(e) => setUserName(e)}
                            placeholder="Enter Your Name"
                            value={userName}
                            style={{ width: SCREEN_WIEDTH * 0.7, color: '#130f40' }}
                        />
                    </View>

                    <View style={styles.texinp}>
                        <Icon name="mail-outline" style={styles.icon} />
                        <TextInput
                            placeholder="Enter Your Email Id"
                            onChangeText={(e) => setEmail(e)}
                            value={email}
                            style={{ width: SCREEN_WIEDTH * 0.7, color: '#130f40' }}
                        />
                    </View>

                    <View style={styles.texinp}>
                        <Icon name="lock-closed-outline" style={styles.icon} />
                        <TextInput
                            placeholder="Enter Your Password"
                            secureTextEntry={true}
                            value={password}
                            onChangeText={(e) => setPassword(e)}
                            style={{ width: SCREEN_WIEDTH * 0.7, color: '#130f40' }}
                        />
                    </View>

                    <View style={styles.texinp}>
                        <Icon name="lock-closed-outline" style={styles.icon} />
                        <TextInput
                            placeholder="Enter Your Confirm Password"
                            secureTextEntry={true}
                            value={confirmPassword}
                            onChangeText={(e) => setConfirmPassword(e)}
                            style={{ width: SCREEN_WIEDTH * 0.7, color: '#130f40' }}
                        />
                    </View>


                    <View style={{ flexDirection: 'row', marginTop: 10, flexWrap: 'wrap', justifyContent: 'center' }}>
                        <Text >I agree to the </Text>
                        <TouchableOpacity>
                            <Text style={styles.terms}>Terms and Conditions  </Text>
                        </TouchableOpacity>

                        <Text>and </Text>
                        <TouchableOpacity>
                            <Text style={styles.terms}>Privacy & Policy </Text>
                        </TouchableOpacity>
                    </View>
                </View>

                <View style={{ alignItems: 'center' }}>

                    <TouchableOpacity style={styles.signinbtn} onPress={handlesignup}>
                        <Text style={{ color: '#ffff', textTransform: 'uppercase', fontWeight: 'bold' }}>Sign Up</Text>
                    </TouchableOpacity>


                    <Text style={styles.dont}>Already you have account</Text>

                    <TouchableOpacity style={styles.signupbtn}>
                        <Text style={styles.signuptext} onPress={handlesignin}>Sign in here</Text>
                    </TouchableOpacity>

                </View>

            </View>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    container: {
        padding: 20,
        height: SCREEN_HEIGHT,
        backgroundColor: '#fff',
        justifyContent: "space-around"
    },
    createtxt: {
        color: '#130f40',
        fontSize: 30,
        fontWeight: 'bold',
        textAlign: 'center',
        marginTop: 10
    },
    texinp: {
        flexDirection: 'row',
        alignItems: 'center',
        borderRadius: 30,
        borderWidth: 2,
        color: '#130f40',
        marginTop: 10
    },
    icon: {
        fontSize: 25,
        marginHorizontal: 10
    },
    img: {
        height: 120,
        width: 120,

    },

    terms: {
        color: '#130f40',
        fontWeight: 'bold'
    }, signupbtn: {
        fontSize: 22,
        fontWeight: 'bold',
        textAlign: 'center'
    },
    signinbtn: {
        backgroundColor: '#130f40',
        borderRadius: 30,
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%'
    },
    signupbtn: {
        textAlign: 'center',
        width: '40%',
        marginTop: 5,

    },
    signuptext: {
        color: '#130f40',
        fontWeight: 'bold',
        textAlign: 'center',
        fontSize: 18

    }

})