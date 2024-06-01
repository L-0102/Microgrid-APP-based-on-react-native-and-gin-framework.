import React, { Component } from 'react'
import { Text, StyleSheet, View ,SafeAreaView,ScrollView,Image,TouchableOpacity, Touchable, Alert} from 'react-native'
import Ionicons from 'react-native-vector-icons/Ionicons'
import { connect } from 'react-redux'
import { logout } from '../../redux/actions/User'
import {storage} from '../../storage'
//export default 
class Index extends Component {
   doLogout=()=>{
     this.props.logout()
   /*  storage.remove({
      key: 'logintoken'
    });*/
   // storage.clearMap();
     Alert.alert('成功','退出成功')
   }

  render() {
    return (
      <SafeAreaView style={[styles.container]}>
       <ScrollView>
          <View style={[styles.avatar]}>
            <Image 
              source={{uri:'http://reactnative.dev/img/tiny_logo.png'}}
              style={{width:80,height:80,marginVertical:10,borderRadius:40}}
            />
          </View>
          <TouchableOpacity
          //onPress={()=> alert('aaa')}
          onPress={()=> this.props.navigation.navigate('About')}
          >
            <View style={[styles.listItem]}>
              <View style={{flexDirection:'row'}}>
              <Ionicons name={'information-outline'} size={20} color={'#22d'} />
                <Text style={{marginLeft:10,fontSize:18}}>关于</Text>
              </View>
              <Ionicons name={'chevron-forward-outline'} size={20} color={'#bbb'} />
            </View>

          </TouchableOpacity>
          <TouchableOpacity
         // onPress={()=> alert('aaa')}
           onPress={()=> this.props.navigation.navigate('Set')}
          >
            <View style={[styles.listItem]}>
              <View style={{flexDirection:'row'}}>
              <Ionicons name={'settings-outline'} size={20} color={'#22d'} />
                <Text style={{marginLeft:10,fontSize:18}}>账户</Text>
              </View>
              <Ionicons name={'chevron-forward-outline'} size={20} color={'#bbb'} />
            </View>

          </TouchableOpacity>

          <TouchableOpacity
         // onPress={()=> alert('aaa')}
           onPress={()=> this.props.navigation.navigate('登录')}
          >
            <View style={[styles.listItem]}>
              <View style={{flexDirection:'row'}}>
              <Ionicons name={'person-outline'} size={20} color={'#22d'} />
                <Text style={{marginLeft:10,fontSize:18}}>登录</Text>
              </View>
              <Ionicons name={'chevron-forward-outline'} size={20} color={'#bbb'} />
            </View>

          </TouchableOpacity>
          
         {/* <TouchableOpacity
         // onPress={()=> alert('aaa')}
           onPress={()=> this.props.navigation.navigate('计数器')}
          >
            <View style={[styles.listItem]}>
              <View style={{flexDirection:'row'}}>
              <Ionicons name={'ellipsis-vertical-outline'} size={20} color={'#22d'} />
                <Text style={{marginLeft:10,fontSize:18}}>计数器</Text>
              </View>
              <Ionicons name={'chevron-forward-outline'} size={20} color={'#bbb'} />
            </View>

         </TouchableOpacity>*/}

           <TouchableOpacity
         // onPress={()=> alert('aaa')}
           onPress={this.doLogout}
          >
            <View style={[styles.listItem]}>
              <View style={{flexDirection:'row'}}>
              <Ionicons name={'person-remove-outline'} size={20} color={'#22d'} />
                <Text style={{marginLeft:10,fontSize:18}}>退出</Text>
              </View>
              <Ionicons name={'chevron-forward-outline'} size={20} color={'#bbb'} />
            </View>

          </TouchableOpacity>
       </ScrollView>
      </SafeAreaView>
    )
  }
}
export default connect(null,{logout})(Index)

const styles = StyleSheet.create({
  container:{
    justifyContent:'flex-start'
  },
  avatar:{
    flexDirection:'row',
    justifyContent:'center',
    borderBottomWidth:1,
    borderBottomColor:'#ddd'
  },
  listItem:{
    flexDirection:'row',
    justifyContent:'space-between',
    alignItems:'center',
    borderBottomWidth:1,
    borderBottomColor:'#ddd',
    height:50,
    paddingHorizontal:20
  }
})
