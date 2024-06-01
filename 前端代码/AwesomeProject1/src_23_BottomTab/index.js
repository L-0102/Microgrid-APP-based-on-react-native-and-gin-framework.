import React, { Component } from 'react'
import { Text, StyleSheet, View ,Button} from 'react-native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import Ionicons from 'react-native-vector-icons/Ionicons'

const Tab=createBottomTabNavigator()

function HomeScreen(prop){
    return(
        <View style={[styles.Container]}>
            <Text style={[styles.text]}>Home Screen</Text>
         </View>   
    )
}

function NewsScreen(prop){
    return(
        <View style={[styles.Container]}>
            <Text style={[styles.text]}>News Screen</Text>
         </View>   
    )
}


export default class index extends Component {
  render() {
    return (
     <Tab.Navigator
     screenOptions={({route})=>({
         tabBarIcon:({focused,color,size})=>{
             let iconName

             if (route.name ==='Home'){
                 iconName = focused ? 'add-circle' :'add-circle-outline'
             }else if (route.name ==='News'){
                 iconName = focused ? 'person' :'person-outline'
             }
            return<Ionicons name={iconName} size={size} color={color} />
         }
     })}
     tabBarOptions={{
         activeTinColor:'tomato',
         inactiveTintcolor:'gray'
     }}      //存在问题
     >
         <Tab.Screen name="Home"  component={HomeScreen} />
         <Tab.Screen name="News"  component={NewsScreen} />
     </Tab.Navigator>
    )
  }
}

const styles = StyleSheet.create({
    container:{
        flex:1,
        justifyContent:'center',
        alignItems:'center'
    },
    text:{
        fontSize:40
    }
})

