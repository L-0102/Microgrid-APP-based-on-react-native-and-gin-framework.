import React, { Component } from 'react'
import { Text, StyleSheet, View } from 'react-native'
import MainTab from "./routes/index";
import { connect } from 'react-redux';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from './screens/NoAuth/Login'
import RegisterScreen from './screens/NoAuth/Register'

console.ignoredYellowBox = ['Warning: BackAndroid is deprecated. Please use BackHandler instead.','source.uri should not be an empty string','Invalid props.style key'];
console.disableYellowBox = true // 关闭全部黄色警告

const mapStateToProps=state=>{
  return{
    isLogin:state.User.isLogin
  }
}
/*const mapStateToProps=state=>{
  return{
      isLogin:state.userInfo.isLogin
  }
}*/
const Stack=createNativeStackNavigator();

//export default 
class Index extends Component {
  render() {
    return (
     // <MainTab />
      <>
      {
        this.props.isLogin
        ?
        (<MainTab />)
        :
        (
           <Stack.Navigator
           headerMode="none"
           initialRouteName={'登录'}
           >
               <Stack.Screen name="登录" component={LoginScreen}/>
               <Stack.Screen name="注册" component={RegisterScreen}/>
            
           </Stack.Navigator>
        )
        
      }
      </>
   
    )
  }
}
export default connect(mapStateToProps)(Index)

const styles = StyleSheet.create({})
