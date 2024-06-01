import React, { Component } from 'react'
import { Text, StyleSheet, View ,Button,TouchableOpacity, Touchable, Alert} from 'react-native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import HomeScreen from '../screens/Home'
import eleUseScreen from '../screens/Home/EleUse'
import storageScreen from '../screens/Home/StorageManage'
import loadScreen from '../screens/Home/LoadManage'
import dispatchScreen from '../screens/Home/Dispatch'
import greenuseScreen from '../screens/Home/GreenUse'
import mainScreen from '../screens/Home/MainHome'

const Stack =createNativeStackNavigator()

export default class HomeStack extends Component {
  render() {
    return (
        <Stack.Navigator 
        initialRouteName="Home" 
        //headerMode={'none'}
        >
        <Stack.Screen  name="Home" 
        component={HomeScreen} 
        options={{
            title:"首页",
            headerStyle:{
                backgroundColor:'#1e90ff',
                elevation: 10,
                //header:null,
            },
            //headerTintColor:'#fff',
         /* headerRight:() =>(
                <TouchableOpacity onPress={()=> this.props.navigation.navigate('登录')}
               // onPress={()=>alert('Hello')}
            >
                  <Text style={{fontSize: 18, color:'#fff', marginRight:10}}>登录</Text>
           </TouchableOpacity>
            )*/
        }}
      />
      <Stack.Screen name="EleUse" component={eleUseScreen} 
        options={{
            title:"微电源管理",
            headerStyle:{
                backgroundColor:'#1e90ff'
            }
        }}
      />
      <Stack.Screen name="StorageManage" component={storageScreen} 
        options={{
            title:"储能系统管理",
            headerStyle:{
                backgroundColor:'#1e90ff'
            }
        }}
      />
      <Stack.Screen name="LoadManage" component={loadScreen} 
        options={{
            title:"负荷管理",
            headerStyle:{
                backgroundColor:'#1e90ff'
            }
        }}
      />
      <Stack.Screen name="Dispatch" component={dispatchScreen} 
        options={{
            title:"智能调度与分析",
            headerStyle:{
                backgroundColor:'#1e90ff'
            }
        }}
      />
      <Stack.Screen name="GreenUse" component={greenuseScreen} 
        options={{
            title:"绿色用电",
            headerStyle:{
                backgroundColor:'#1e90ff'
            }
        }}
      />
      <Stack.Screen name="MainHome" component={mainScreen} 
        options={{
            title:"主页面",
            headerStyle:{
                backgroundColor:'#1e90ff'
            }
        }}
      />
  </Stack.Navigator>
    )
  }
}

const styles = StyleSheet.create({})
