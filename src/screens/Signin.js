import { View, Text, StyleSheet, Dimensions, TouchableOpacity, TextInput, ScrollView, Image, Alert } from 'react-native'
import React, { useEffect, useState } from 'react'
import Icon from "react-native-vector-icons/Ionicons";
import { useNavigation } from '@react-navigation/native';
import database from '@react-native-firebase/database';
import { interpolate } from 'react-native-reanimated';



const SCREEN_HEIGHT = Dimensions.get('screen').height;
const SCREEN_WIEDTH = Dimensions.get('screen').width;

export default function Signin({ navigation }) {
    const [allUsers, setAllUsers] = useState()
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')



    useEffect(function () {
        fetchAllUsers()
    }, [])

    console.log("RealData", allUsers)

    const fetchAllUsers = async () => {
        try {
            const fetchdata = await database().ref('users').once('value')
            // console.log(fetchdata)
            const internalData = Object.values(fetchdata);

            // console.log("internalData", internalData)

            const values = Object.values(internalData[0].value)
            setAllUsers(values)

        } catch (error) {
            console.log(error);
        }
    }

    const handleSignin = () => {

        const filterdata = allUsers?.filter((item) => {
            if (item.email == email && item.password == password) {
                console.log(item.email)
                return true
            }
        })
        if (filterdata.length == 0) {
            alert("Please Input Corret Credentials")
        }
        else {
            navigation.navigate('Home')
        }
    }



    // const handleSignin = () => {
    //     const usersArray = Object?.values(allUsers);

    //     const userWithEmail = usersArray.find((item) => {
    //         console.log(item, "vvbjbjbjb");
    //         const emails = Object.values(item.value).map(user => user.email);

    //           console.log(emails,"Ritik");
    //         return emails === email;
    //     });
    // console.log(userWithEmail,"gfhfggd")
    //     if (userWithEmail) {
    //         navigation.navigate('Home');
    //     } else {
    //         alert('Please Enter Correct Details');
    //     }
    // };


    // const handleSignin = () => {
    //     // Ensure allUsers is an object
    //     if (typeof allUsers === 'object') {
    //       const usersArray = Object.values(allUsers);

    //       const userWithEmail = usersArray.find((item) => {
    //         const emails = Object.values(item.value).map(user => user.email);
    //         console.log(item, "vvbjbjbjb");
    //         console.log(emails,"Suraj")
    //         console.log(email,"Shalu")
    //         // return item.email === email;
    //         if(emails.){

    //         }

    //       });

    //       console.log(userWithEmail, "gfhfggd");


    //       if (userWithEmail) {
    //         navigation.navigate('Home');
    //       } 
    //       else {
    //        Alert.alert('Please Enter Correct Details');
    //       }
    //     } else {
    //       // Handle the case where allUsers is not an object (initial empty state)
    //       console.log('Fetching user data...');
    //     }
    //   };



    const handlesignup = () => {
        navigation.navigate('Register')
    }


    return (
        <ScrollView >
            <View style={styles.container}>
                <View style={{ alignItems: 'center' }}>
                    <Image source={require("../assets/images/login_image.png")} resizeMode='contain' style={styles.img} />
                </View>

                <View>
                    <Text style={styles.signinnow}>Sign In Now</Text>

                    <View style={{ flexDirection: 'row', alignItems: 'center', borderRadius: 30, borderWidth: 2, marginTop: 5, borderColor: '#130f40' }}>
                        <Icon name="person-outline" style={styles.icon} />
                        <TextInput
                            placeholder="Enter Your Email "
                            onChangeText={(e) => setEmail(e)}
                            value={email}
                            style={{ width: SCREEN_WIEDTH * 0.7, color: '#130f40' }}
                        />
                    </View>

                    <View style={{ flexDirection: 'row', alignItems: 'center', borderRadius: 30, borderWidth: 2, marginTop: 5, borderColor: '#130f40', marginTop: 10 }}>
                        <Icon name="lock-closed-outline" style={styles.icon} />
                        <TextInput
                            placeholder="Enter Your Password"
                            keyboardType="numeric"
                            onChangeText={(e) => setPassword(e)}
                            value={password}
                            secureTextEntry={true}
                            style={{ width: SCREEN_WIEDTH * 0.7, color: '#130f40' }}
                        />
                    </View>
                    <View>
                        <Text style={styles.remember}>Forgot Password?</Text>
                    </View>

                </View>

                <View style={{ alignItems: 'center' }}>
                    <TouchableOpacity style={styles.signinbtn} onPress={handleSignin}>
                        <Text style={{ color: '#ffff', textTransform: 'uppercase', fontWeight: 'bold' }} >Sign In</Text>
                    </TouchableOpacity>
                    <Text style={styles.dont}>Don't you have an account?</Text>

                    <TouchableOpacity style={styles.signupbtn} onPress={handlesignup}>
                        <Text style={styles.signuptext}>Sign Up</Text>
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
        justifyContent: 'space-around',
        backgroundColor: '#fff'
    },
    img: {
        height: 200,
        width: 200,

    },
    signinnow: {
        color: '#130f40',
        fontSize: 25,
        fontWeight: 'bold',
        textAlign: 'center',
        marginTop: 10

    },
    icon: {
        fontSize: 25,
        marginHorizontal: 10

    },
    remember: {
        marginTop: 5,
        marginLeft: 10,

    },
    signinbtn: {
        backgroundColor: '#130f40',
        borderRadius: 30,
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%'
    },
    dont: {
        fontSize: 20,
        marginTop: 10
    },
    signupbtn: {
        fontSize: 22,
        fontWeight: 'bold',
        textAlign: 'center'
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