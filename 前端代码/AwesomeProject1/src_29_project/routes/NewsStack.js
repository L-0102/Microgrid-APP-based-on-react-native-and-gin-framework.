import React, { Component } from 'react'
import { Text, StyleSheet, View ,Button,TouchableOpacity, Touchable, Alert} from 'react-native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import NewsScreen from '../screens/News';

const Stack =createNativeStackNavigator()

export default class NewsStack extends Component {
  render() {
    return (
        <Stack.Navigator>
        <Stack.Screen name="News" component={NewsScreen} 
        options={{
            title:"告警",
            headerStyle:{
                backgroundColor:'#1e90ff'
            }
            //headerTintColor:'#fff'

        }}
      />
  </Stack.Navigator>
    )
  }
}

const styles = StyleSheet.create({})
