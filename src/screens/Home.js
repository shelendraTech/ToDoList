import { View, Text, TextInput, StyleSheet, Dimensions, TouchableOpacity, FlatList,Alert} from 'react-native'
import React, { useEffect, useState } from 'react'
import Icon from "react-native-vector-icons/FontAwesome5";
import ADICON from "react-native-vector-icons/AntDesign";
import EditIcon from "react-native-vector-icons/AntDesign";
import Timer from "react-native-vector-icons/Entypo";
import database from '@react-native-firebase/database';



const SCREEN_HEIGHT = Dimensions.get('screen').height;
const SCREEN_WIEDTH = Dimensions.get('screen').width;
export default function Home(props) {
  const [task, setTask] = useState()
  const [list, setList] = useState(null)
  const [isEditmode, setIsEditMode] = useState(false)
  const [selectedIndex, setSelectedIndex] = useState(null)


  //This is use state function when page is render this function fetch all the data
  useEffect(function () {
    getData()
  }, [])


  const getData = async () => {
    try {
      const data = await database().ref('mytask').on('value', (tempData) => {
        setList(tempData.val())
      })

    }
    catch (error) {
      console.log(error);
    }
  }

//Add task 
  const handleAddData = async () => {
    const index = list == null ? 0 : list.length
    console.log(index)

    try {
      const response = await database().ref(`mytask/${index}`).set({
        task: task
      })
      setTask('')
      console.log(response)
    }
    catch (error) {
    }
  }



  const handleEditBtnPress = (taskindex, value) => {
    setIsEditMode(true)
    setTask(value)
    setSelectedIndex(taskindex)
  }


  //Edit Task 
  const handleEditData = async () => {
    try {
      const response = await database().ref(`mytask/${selectedIndex}`).update({
        task: task
      })
      setTask('')
      setIsEditMode(false)
      alert("Task Edit Successfull")

    }
    catch (error) {
      console.log(error)
      alert("ni hua")
    }
  }


  //handle cancle button and go to add task
  const handlecancel = () => {
    setIsEditMode(false)
    setTask('')
  }

//Delete task on Longpress
  const handleLongPress =(taskindex,value)=>{
try {
  Alert.alert("Alert",`Are you want to Delete  ${value}`,[
    {
     text:'Cancel',
     onPress:()=>{
      console.log('Cancle is Press')
     }
    },
    {
      text:'Ok',
      onPress:async()=>{
        const response = await database().ref(`mytask/${taskindex}`).remove();
      }
    }
  ])
} catch (error) {
  
}
  }

const handleLongPressTimer=()=>{
  try {
    Alert.alert("Status","Is your work complete?",[{
      text:'Cancle'
    },
    {
      text:'Ok'
    }])
    
  } catch (error) {
    
  }
}

  return (
    <View style={styles.container}>
      <View style={{ backgroundColor: '#fff', padding: 20 }}>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>

          {isEditmode ?
            <Text style={{ color: '#000', fontSize: 18, marginLeft: 10 }}>
              Edit Your Task
            </Text>
            :
            <Text style={{ color: '#000', fontSize: 18, marginLeft: 10 }}>
              Add Your Task
            </Text>
          }
          {isEditmode ? <TouchableOpacity onPress={handlecancel}><Text style={{ color: 'red' }}>Cancel</Text></TouchableOpacity> : <></>}
        </View>
        <View style={styles.textinp}>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Icon name="tasks" style={styles.icon} />
            <TextInput
              placeholder="Enter Your Task"
              onChangeText={(e) => setTask(e)}
              value={task}
              style={{ color: '#130f40', width: SCREEN_WIEDTH * 0.6 }}
            />
          </View>
          {isEditmode ?
            <TouchableOpacity onPress={() => handleEditData()} style={{ height: 40, width: 40, borderRadius: 100, backgroundColor: '#130f40', justifyContent: 'center', alignItems: 'center' }}>
              <Icon name="edit" style={{ fontSize: 20, color: '#ffff' }} />
            </TouchableOpacity>
            :
            <TouchableOpacity onPress={handleAddData} style={{ height: 40, width: 40, borderRadius: 100, backgroundColor: '#130f40', justifyContent: 'center', alignItems: 'center' }}>
              <Icon name="plus-circle" style={{ fontSize: 25, color: '#ffff' }} />
            </TouchableOpacity>
          }
        </View>
      </View>

      <View style={{ alignItems: 'center', padding: 20 }}>

        <FlatList data={list} renderItem={item => {
          const taskindex = item.index
          if (item.item !== null) {
            return (
              < TouchableOpacity style={{
                width: SCREEN_WIEDTH * 0.9,
                backgroundColor: "#fff",
                height: SCREEN_WIEDTH * 0.15,
                borderRadius: 20,
                marginVertical: 10,
                paddingRight: 20,
                justifyContent: 'center',
                marginBottom: 10,
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: "center"
              }}
               onLongPress={()=>handleLongPress(taskindex,item.item.task)}
                
              >

                <Text style={{ marginHorizontal: 10, fontSize: 20, fontWeight: 'bold' }}>{item.item.task}</Text>
                <View style={{ flexDirection: 'row' }}>
                  <TouchableOpacity style={{ marginHorizontal: 20 }} >
                    <EditIcon name="edit" style={{ fontSize: 20 }}
                      onPress={() => handleEditBtnPress(taskindex, item.item.task)} />
                  </TouchableOpacity>

                  
                  <TouchableOpacity style={{ marginHorizontalt: 20 }} onLongPress={()=>handleLongPressTimer()} >
                    <Timer name="time-slot" style={{ fontSize: 20, }} />
                  </TouchableOpacity>
                </View >
              </TouchableOpacity >
            )
          }
        }}
        />

      </View>

    </View >
  )
}

const styles = StyleSheet.create({
  container: {
    // padding: 20,
  },
  textinp: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingRight: 7,
    borderRadius: 30,
    borderWidth: 2,
    color: '#130f40',
    marginTop: 10,
    justifyContent: 'space-between'
  },
  icon: {
    fontSize: 25,
    marginHorizontal: 10
  },
})