import { View, Text, StyleSheet, Dimensions, Image, TouchableOpacity } from 'react-native'
import React from 'react';
import { useNavigation } from '@react-navigation/native';

const SCREEN_HEIGHT = Dimensions.get('screen').height;
const SCREEN_WEIGHT = Dimensions.get('screen').width;

export default function Landing() {
  const navigation =useNavigation();

  //This is register function.This function forword to Register component
  const handleRegister=()=>{
    navigation.navigate('Register')
  }

  //This is signin  function.This function forword to signin component

  const handlesignin=()=>{
    navigation.navigate('Signin')
  }
  return (
    <View style={styles.container}>
      <View>
        <Text style={styles.welcome}>Welcome to</Text>
        <Text style={styles.appname}>To Do List</Text>
        <Text style={styles.tagline}>Manage your all daily task in just few click by your phone.</Text>
      </View>
      <View style={{ alignItems: 'center' }}>
        <Image source={require('../assets/images/login_image.png')} style={styles.pic} resizeMode='contain' />
      </View>

      <View style={{ alignItems: 'center',  marginBottom:50 }}>
        <TouchableOpacity style={styles.btn}  onPress={handleRegister}>
          <Text style={styles.btntext}>Sign Up</Text>
        </TouchableOpacity>

        <Text style={styles.already}>Already have an account?</Text>
        <TouchableOpacity style={styles.signinbtn} onPress={handlesignin}>
          <Text style={styles.signtext}>Sign In</Text>
        </TouchableOpacity>
      </View>

    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#130f40',
    height: SCREEN_HEIGHT,
    width: SCREEN_WEIGHT,
    justifyContent: 'space-around',
    padding: 20,

  },
  welcome: {
    color: '#ffff',
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  appname: {
    color: '#ffff',
    fontSize: 30,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  tagline: {
    color: '#ffff',
    fontSize: 16,
    textAlign: 'center',
  },
  pic: {
    height: 250,
    width: 250,

  },
  btn: {
    backgroundColor: '#ffff',
    borderRadius: 30,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%'
  },
  btntext: {
    color: '#130f40',
    textTransform: 'uppercase',


  },
  already: {
    color: '#535c68',
    fontSize: 16,
    textAlign: 'center',
    marginTop: 10,

  },
  signinbtn: {
    textAlign: 'center',
    width: '30%',
    marginTop: 5,

  },
  signtext: {
    color: '#ffff',
    fontWeight: 'bold',
    textAlign: 'center',
    fontSize: 18

  }
})