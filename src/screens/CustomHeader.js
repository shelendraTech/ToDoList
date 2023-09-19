import { View, Text, Dimensions } from 'react-native'
import React from 'react';
import Icons from "react-native-vector-icons/AntDesign";
import Icon from "react-native-vector-icons/Entypo";

import { DrawerActions } from '@react-navigation/native';
import { useNavigation } from '@react-navigation/native';


const SCREEN_HEIGHT = Dimensions.get('screen').height;
const SCREEN_WEIGHT = Dimensions.get('screen').width;
export default function CustomHeader(props) {
    const navigation = useNavigation()
    return (
        <View style={{ backgroundColor: '#130f40', height: SCREEN_HEIGHT * 0.100,justifyContent:'center'}}>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>

                <View style={{ marginHorizontal: 10, flexDirection: 'row', alignItems: 'center' }}>
                    <Icon name="text-document-inverted" size={35} style={{ marginRight: 20, color: '#fff' }} />
                    <Text style={{ color: '#fff', fontSize: 20 }}>To Do List</Text>
                </View>

                <View style={{ flexDirection: 'row' }}>
                   
                    <Icons name="logout" size={25} style={{ color: '#fff', marginRight: 10 }} />

                </View>

            </View>
        </View>
    )
}