import React, { Component } from 'react'
import { Text, StyleSheet, View ,ImageBackground, ImageBase, Platform,ScrollView, TextInput,TouchableOpacity,Alert} from 'react-native'
import *as Animatable from 'react-native-animatable'
import Ionicons from 'react-native-vector-icons/Ionicons'

import LinearGradient from 'react-native-linear-gradient'
import { connect } from 'react-redux'
import { loginSuccess } from '../../redux/actions/User'
//import { connect } from 'react-redux'
//import { gettoken } from '../../redux/actions/Token' 
//import {storeData,getData} from '../../get'
import {storage} from '../../storage'
const mapStateToProps=state=>{
    return{
        isLogin:state.User.isLogin,
       // token:state.Token.Token
    }
}

//export default 
class Login extends Component {
    constructor(){
        super()

        this.state={
            username:"",
            passward:"",
            code:0,
            token:'',
            validateUsername:false,
            isValidUser:true,
         // validatePassword:false,
            secureTextEntry:true,
            isValidPassword:true,
            token0:''
        }
    }
    validateUsername=(val)=>{
        if(val.trim().length>=4){
            this.setState({
                username:val,
                validateUsername:true,
                isValidUser:true
            })
        }else {
            this.setState({
                username:val,
                validateUsername:false,
                isValidUser:false
            })
        }
    }
    handleValidUser=(val)=>{
        if(val.trim().length>=4){
            this.setState({
                isValidUser:true
            })
        }else {
            this.setState({
                isValidUser:false
            })
        }
    }
    validatePassword=(val)=>{
        if(val.trim().length>=8){
            this.setState({
                passward:val,
              //  validatePassword:true,
                isValidPassword:true
            })
        }else {
            this.setState({
                passward:val,
               // validatePassword:false,
                isValidPassword:false
            })
        }
    }
    updateSecureTextEntry=()=>{
        this.setState({
            secureTextEntry:!this.state.secureTextEntry
        })
    }
    handleLogin=()=>{
        //先判断表单信息
        if(this.state.username.length == 0 || this.state.passward.length == 0){
            Alert.alert('输入错误','用户名和密码不能为空')
            return;
        }
        if(this.state.username.length <4){
            Alert.alert('用户名太短','用户名最短为4位')
            return;
        }
        if(this.state.passward.length <8){
            Alert.alert('密码太短','密码最短为8位')
            return;
        }

        let userInfo={
            username:this.state.username,
            passward:this.state.passward
        }
        
      /* let formData = new FormData();
        formData.append("username", String (this.state.username));
        formData.append("password", String (this.state.passward));
      //  formData.append("type", this.state.buttonType ? 1 : 2);*/
        let url = "http://192.168.0.7:3002/login";
        let opts = {
            method: "POST",   //请求方法
            body:JSON.stringify({
                "username":String (this.state.username),
                "password":String (this.state.passward)
              })   //请求体
            }
        fetch(url, opts //请求体
            ).then(res=>res.json())
           .then((res)=>{
            //console.log(res)
            this.setState({
                code:res.code,
                 
              })
              this.setState({
                token:res.data.token
              })
            //  console.log(this.state.authorization)
              if(this.state.code ==  422){
                Alert.alert('登录失败','用户不存在或密码错误')
                return;
            }
            else{
                //登录成功，存储Token值
                //  console.log(this.state.token)
                //  storeData(this.state.token)
                storage.save({
                    key: 'logintoken', // Note: Do not use underscore("_") in key!
                    data: {
                      token:this.state.token
                    },
                  
                    // if expires not specified, the defaultExpires will be applied instead.
                    // if set to null, then it will never expire.
                    expires: 1000 * 3600
                  });
               
                this.props.loginSuccess(userInfo)
                //调用接口，执行登录
                   Alert.alert('成功','登录成功')
            }
        }).catch(error => {
          console.error('POST请求错误:', error);
        })

      //  console.log(this.state.code)
       
        
            /*fetch(url,{
                method:'GET'
              }).then((res)=>{
                console.log(res)
              )
              }).catch((err)=>{
                Alert.alert('报错',JSON.stringify(err))
              })
            }*/
           /* if(this.state.code ==  422){
                Alert.alert('登录失败','用户不存在或密码错误')
                return;
            }
            else{
                this.props.loginSuccess(userInfo)
                //调用接口，执行登录
                   Alert.alert('成功','登录成功')
            }*/
       // this.props.loginSuccess(userInfo)
    
        
    }
  render() {
    return (
      <View style={[styles.container]}>
        <ImageBackground source={require('../../images/Log.jpg')} style={[styles.bgImage]}>
           <View style={[styles.header]}>
               <Text style={[styles.headerText]}>
                   Welcome!
               </Text>
           </View>
           <Animatable.View
               animation="fadeInUpBig"
               style={[styles.footer]}
               >
                   <ScrollView>
                       <View style={[styles.action]}>
                           <Ionicons name={'person-outline'} size={20} />
                           <TextInput
                           style={[styles.input]}
                           placeholder="用户名"
                           value={this.state.username}
                           onChangeText={(val)=> this.validateUsername(val)}
                           onEndEditing={(e)=> this.handleValidUser(e.nativeEvent.text)}
                            />
                            {
                                this.state.validateUsername ?        //如果用户名大于4位，显示对钩，否则什么也不显示
                                <Animatable.View animation='bounceIn'>
                                    <Ionicons name={'checkmark-circle-outline'} size={20} />
                                </Animatable.View>
                                :
                                null
                            }
                       </View>
                       {
                           this.state.isValidUser
                           ?
                           null
                           :
                           <Animatable.View animation='fadeInLeft' duration={500}>
                                <Text style={[styles.errorMsg]}>用户名最短是4位</Text>
                            </Animatable.View>
                       }

                        <View style={[styles.action]}>
                           <Ionicons name={'lock-closed-outline'} size={20} />
                           <TextInput
                           style={[styles.input]}
                           placeholder="密码"
                           secureTextEntry={this.state.secureTextEntry ? true : false}
                           onChangeText={(val)=> this.validatePassword(val)}
                            />
                            <TouchableOpacity onPress={this.updateSecureTextEntry}>
                            {
                                this.state.secureTextEntry
                                 ?       
                                <Ionicons name={'eye-off-outline'} size={20} />
                                :
                                <Ionicons name={'eye-outline'} size={20} />
                            }
                            </TouchableOpacity>
                       </View>
                       {
                           this.state.isValidPassword
                           ?
                           null
                           :
                           <Animatable.View animation='fadeInLeft' duration={500}>
                                <Text style={[styles.errorMsg]}>密码最短为8位</Text>
                            </Animatable.View>
                       }

                       {/*按钮*/ }
                       <View style={styles.button}>
                           <TouchableOpacity
                             style={styles.signIn}
                             onPress={()=>{this.handleLogin()}}
                           >
                               <LinearGradient
                               colors={['#08d4c4','#01ab9d']}
                               style={styles.signIn}
                               >
                                   <Text style={[styles.textSign,{color:'#eee'},{textAlign:'center'}]}>登录</Text>
                               </LinearGradient>
                           </TouchableOpacity>
                           <TouchableOpacity
                           onPress={()=>this.props.navigation.navigate('注册')}
                           style={[
                               styles.signIn,{
                                   borderColor:'#009387',
                                   borderWidth:0.5,
                                   marginTop:15
                               }
                           ]}
                           >
                               <Text style={[styles.textSign,{color:'#009387'},{textAlign:'center'}]}>注册</Text>

                           </TouchableOpacity>
                       </View>
                   </ScrollView>
           </Animatable.View>
        </ImageBackground>
      </View>
    )
  }
}

export default connect(mapStateToProps,{loginSuccess})(Login)

const styles = StyleSheet.create({
    container:{
        flex:1
    },
    bgImage:{
        flex:1,
        resizeMode:'cover',
        justifyContent:'center'
    },
    header:{
        flex:1,
        justifyContent:'flex-end',
        paddingHorizontal:20,
        paddingBottom:100
    },
    headerText:{
        color:'#fff',
        fontWeight:'bold',
        fontSize:30,
        textAlign:'center'
    },
    footer:{
        flex:3,
        backgroundColor:'#fff',
        borderTopLeftRadius:40,
        borderTopRightRadius:40,
        paddingHorizontal:20,
        paddingVertical:30
    },
    action:{
        flexDirection:'row',
        marginTop:5,
        borderBottomWidth:1,
        borderBottomColor:'#f2f2f2',
        paddingBottom:5
    },
    input:{
        flex:1,
        marginTop:Platform.OS=='ios' ? 0 :-12,
        paddingLeft:10,
        color:'#05375a'
    },
    errorMsg:{
        color:'red',
        fontSize:14
    },
    signIn:{
        marginTop:30,
       // borderBottomWidth:2,
        paddingBottom:10,
        //marginHorizontal:30
        paddingVertical:5
    },
    textSign:{
        fontSize:20
    },
    button:{
        marginHorizontal:60
    }
})
