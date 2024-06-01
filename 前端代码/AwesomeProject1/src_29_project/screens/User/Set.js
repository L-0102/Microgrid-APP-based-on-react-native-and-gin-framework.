import axios from 'axios' //axios网络请求
import CryptoJS from "react-native-crypto-js"; //crypto-js加解密库
import { getsecretdata } from '../../api';
import React, { Component } from 'react'
import {StyleSheet, View,Dimensions,Text ,SafeAreaView,ScrollView } from 'react-native'
import { aesDecrypt } from '../../aesDecrpt';
import {getData} from '../../get'
import {storage} from '../../storage'
import { Table, TableWrapper, Row, Rows, Col, Cols, Cell } from 'react-native-reanimated-table';
export default class Set extends Component {
  constructor(props) {
    super(props);
    this.state = {
     result:{},
      result_de:{},
      result_json:{},
      token :'',
      name:'',
      username:'',
      telephone:'',
      tableTitle: ['姓名','用户名','电话','部门','工号','职位','性别','年龄','邮箱'],
      tableData: [
        ['---'],['---'],['---'],['---'],['---'],['---'],['---'],['---'],['---']
      ],
    }
  }
  
  componentDidMount(){
    storage
    .load({
      key: 'logintoken',
      autoSync: true,
      syncInBackground: true,
      syncParams: {
        extraFetchOptions: {
          // blahblah
        },
        someFlag: true
      }
    })
    .then(ret => {
      // found data go to then()
     // console.log(ret.token);
      this.setState({
        token:ret.token
      })
      let url = "http://192.168.0.7:3002/info";
      let opts = {
            method: "get",   //请求方法
            headers: {
              'Authorization':  'Bearer ' + this.state.token
          }
            }
    fetch(url, opts //请求体
      ).then(res=>res.json())
     .then((res)=>{
      console.log(res)
      this.setState({
        name:res.data.user.Name,
        username:res.data.user.Username,
        telephone:res.data.user.Telephone,
        tableData: [
          [res.data.user.Name],[res.data.user.Username],[res.data.user.Telephone],[res.data.user.Department],[res.data.user.Wordid],
          [res.data.user.Position],[res.data.user.Gender],[res.data.user.Age],[res.data.user.Mail]
        ],
      })
  
  }).catch(error => {
    console.error('POST请求错误:', error);
  })
    //  console.log(this.state.token)
    })
   /* .catch(err => {
      // any exception including data not found
      // goes to catch()
      console.warn(err.message);
      switch (err.name) {
        case 'NotFoundError':
          // TODO;
          break;
        case 'ExpiredError':
          // TODO
          break;
      }
    });*/


  }
 /* shouldComponentUpdate(nextProps, nextState) {
    if (this.state. tableData !== nextState. tableData) {
      return true;
    }
    return false;
  }*/
   componentWillUnmount() {
  // 如果存在this.timer，则使用clearTimeout清空。  
 /* storage.remove({
    key: 'logintoken'
  });*/
        this.timer && clearInterval(this.timer);

 }
  render() {
    const state = this.state;
    return (
      <SafeAreaView style={[styles.container]}>
       <ScrollView>
      <View style={styles.container}>
          
        <Table borderStyle={{borderWidth: 0.8}}>
         
          <TableWrapper style={styles.wrapper} 	>
            <Col data={state.tableTitle}  style={styles.title} heightArr={[40,40]} textStyle={styles.text}/>
            <Rows data={state.tableData} flexArr={[1]} style={styles.row} textStyle={styles.text}/>
          </TableWrapper>
        </Table>

        

      </View>
      </ScrollView>
      </SafeAreaView>
    )
  }
}
//const { token } = route.params;
const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, paddingTop: 10, backgroundColor: '#fff' },
  head: {  height: 50,  backgroundColor: '#f1f8ff'  },
  wrapper: { flexDirection: 'row' },
  title: { flex: 1, backgroundColor: '#f6f8fa'},
  row: {  height: 40  },
  row1: {  height: 50  },
  text: { textAlign: 'center' },
})
/*
//javascript Aes解密方法
function aesDecrypt(text) {
    let key = CryptoJS.enc.Utf8.parse("aaaabbbbccccdddd");

    let decryptedData = CryptoJS.AES.decrypt(text, key, {
        iv: key,
        mode: CryptoJS.mode.CBC,
        padding: CryptoJS.pad.Pkcs7
    });

    return decryptedData.toString(CryptoJS.enc.Utf8);
};*/
/*
//进行接口网络请求，并Aes解密。
function aesExampleRequest() {
    axios.get("http://10.0.2.2:8085/aes_example").then(res => {
      console.log(res)
        let result = res.data.data //原始数据
        console.log("解密前：\n", result)

        let result_de = aesDecrypt(result)
        console.log("解密后：\n", result_de)

        let result_json = JSON.parse(result_de)
        console.log("转化为json：\n", result_json)
    })
}
*/