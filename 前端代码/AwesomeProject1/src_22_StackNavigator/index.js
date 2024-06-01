import React, { Component } from 'react'
import { Text, StyleSheet, View ,Button,TouchableOpacity, Touchable, Alert} from 'react-native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'

function HomeScreen(prop){
    return(
        <View style={[styles.Container]}>
            <Text style={[styles.text]}>Home Screen</Text>
            <Button title={"跳到新闻页面"} onPress={()=>prop.navigation.navigate('News')} />
         </View>   
    )
}

function NewsScreen(prop){
    return(
        <View style={[styles.Container]}>
            <Text style={[styles.text]}>News Screen</Text>
            <Button title={"跳到Home页面"} onPress={()=>prop.navigation.navigate('Home')} />
         </View>   
    )
}

const Stack =createNativeStackNavigator()

export default class index extends Component {
  render() {
    return (
      <Stack.Navigator 
      initialRouteName="News" 
      //headerMode={'none'}
      >
          <Stack.Screen name="Home" component={HomeScreen} 
            options={{
                title:"首页",
                headerStyle:{
                    backgroundColor:'tomato'
                },
                headerRight:() =>(
                    <TouchableOpacity onPress={()=>alert('Hello')}>
                      <Text>Hello</Text>
                    </TouchableOpacity>
                )
            }}
          />
          <Stack.Screen name="News" component={NewsScreen} />
      </Stack.Navigator>
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
