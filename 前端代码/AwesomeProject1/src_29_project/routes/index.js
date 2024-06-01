import React, { Component } from 'react'
import { Text, StyleSheet, View } from 'react-native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import Ionicons from 'react-native-vector-icons/Ionicons'
import HomeScreen from './HomeStack'
import NewsScreen from './NewsStack'
import UserScreen from './UserStack'

const Tab=createBottomTabNavigator()


export default class Index extends Component {
  render() {
    return (
        <Tab.Navigator 
        //screenOptions={{ headerShown: false }}
        screenOptions={({route})=>({
            tabBarIcon:({focused,color,size})=>{
                let iconName
   
                if (route.name ==='首页'){
                    iconName = focused ? 'bookmarks' :'bookmarks-outline'
                }else if (route.name ==='告警'){
                    iconName = focused ? 'megaphone' :'megaphone-outline'
                }else if(route.name === '我的'){
                    iconName = focused ? 'person' :'person-outline'
                }
               return<Ionicons name={iconName} size={size} color={color} />
            }
        })}
        /*tabBarOptions={{
            activeTinColor:'tomato',
            inactiveTintcolor:'gray'
        }}      //存在问题*/
        >
            <Tab.Screen name="首页"  component={HomeScreen} options={{ headerShown: false}}/>
            <Tab.Screen name="告警"  component={NewsScreen} options={{ headerShown: false}}/>
            <Tab.Screen name="我的"  component={UserScreen} options={{ headerShown: false}}/>
        </Tab.Navigator>
    )
  }
}

const styles = StyleSheet.create({
    navigationOptions:{
        header:null,
    }
})
