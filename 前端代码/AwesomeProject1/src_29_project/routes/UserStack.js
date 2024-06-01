import React, { Component } from 'react'
import { Text, StyleSheet, View ,Button,TouchableOpacity, Touchable, Alert} from 'react-native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import UserScreen from '../screens/User'
import AboutScreen from '../screens/User/About'
import SetScreen from '../screens/User/Set'
import LoginScreen from '../screens/NoAuth/Login'
import RegisterScreen from '../screens/NoAuth/Register' 
import CounterScreen from '../screens/User/Counter'

const Stack =createNativeStackNavigator()

export default class UserStack extends Component {
  render() {
    return (
        <Stack.Navigator>
        <Stack.Screen name="User" component={UserScreen} 
        options={{
            title:"用户",
            headerStyle:{
                backgroundColor:'#1e90ff'
            }
        }}

      />
      <Stack.Screen name="About" component={AboutScreen} 
        options={{
            title:"关于",
            headerStyle:{
                backgroundColor:'#fff'
            }
        }}

      />
       <Stack.Screen name="Set" component={SetScreen} 
        options={{
            title:"账户",
            headerStyle:{
                backgroundColor:'#fff'
            }
        }}

      />
       
       <Stack.Screen name="登录" component={LoginScreen} />
       <Stack.Screen name="注册" component={RegisterScreen} />
       <Stack.Screen name="计数器" component={CounterScreen} />
  </Stack.Navigator>
    )
  }
}

const styles = StyleSheet.create({})
