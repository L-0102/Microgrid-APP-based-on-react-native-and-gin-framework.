import React, { Component } from 'react'
import { Text, StyleSheet, View ,SafeAreaView,ScrollView,Button,Image,TouchableOpacity, Touchable, Alert, ImageBackground,Dimensions} from 'react-native'
import Ionicons from 'react-native-vector-icons/Ionicons'
//import CardView from 'react-native-cardview-wayne';
//import { CardView } from 'react-native-simple-card-view'
//import { CardViewWithIcon } from 'react-native-simple-card-view'
//import { CardViewWithImage } from 'react-native-simple-card-view'
//import { Card, ListItem, Button, Icon } from 'react-native-elements';
import { Card } from '@rneui/themed';
import LinearGradient from 'react-native-linear-gradient';
import {getDaydata} from '../../api';
import { aesDecrypt } from '../../aesDecrpt';

export default class Index extends Component {
  constructor(){
    super()
    this.state={
      DATA_0:{},
      DATA_1:{},
      DATA:{}
    }
  }
  componentDidMount(){
    this.timer = setInterval(
      () => {
        getDaydata().then(res=>{
          //console.log(res)
          this.setState({
            DATA_0 : aesDecrypt(res),            //aes解密
            
          })
          this.setState({
            DATA_1 :JSON.parse(this.state.DATA_0)       //转化为json
          })
          this.setState({
            DATA : this.state.DATA_1[0]
          })
          
         // console.log(this.state.DATA)
        //  Alert.alert('成功','请求成功')
        })
      },
      1000
      );
 
  }
  shouldComponentUpdate(nextProps, nextState) {
    if (this.state. DATA !== nextState. DATA) {
      return true;
    }
    return false;
  }
  componentWillUnmount() {
    // 如果存在this.timer，则使用clearTimeout清空。
    this.timer && clearInterval(this.timer);
   }
  render() {
    return (
      
      <SafeAreaView style={[styles.container]}>
       <ScrollView>
           <View style={{alignItems:'center',marginTop:5}}>
           <Text style={{marginLeft:5,fontSize:20,fontWeight: 'bold'}}>微电网综合管控平台</Text>
           </View>
       <Card  containerStyle={{ elevation:5,borderRadius: 30 }}>
           <View style={{flexDirection:'row',flexWrap:'wrap'}}>
         <TouchableOpacity
          //onPress={()=> alert('aaa')}
          onPress={()=> this.props.navigation.navigate('MainHome')}
          >
            <View style={[styles.listItem]}>
              <View style={{flexDirection:'column',alignItems:'center'}}>
              <View style={styles.container1}>
              <Ionicons name={'grid-outline'} size={30} color={'#22d'} />
             </View>
                <Text style={{marginLeft:5,fontSize:11,fontWeight: 'bold'}}>主页面</Text>
              </View>
             {/* <Ionicons name={'chevron-forward-outline'} size={20} color={'#bbb'} />*/}
            </View>
          </TouchableOpacity>

          <TouchableOpacity
          //onPress={()=> alert('aaa')}
          onPress={()=> this.props.navigation.navigate('EleUse')}
          >
            <View style={[styles.listItem]}>
              <View style={{flexDirection:'column',alignItems:'center'}}>
              <View style={styles.container1}>
              <Ionicons name={'flash-outline'} size={30} color={'#22d'} />
              </View>
                <Text style={{marginLeft:5,fontSize:11,fontWeight: 'bold'}}>微电源管理</Text>
              </View>
             {/* <Ionicons name={'chevron-forward-outline'} size={20} color={'#bbb'} />*/}
            </View>
          </TouchableOpacity>
        
          <TouchableOpacity
          //onPress={()=> alert('aaa')}
          onPress={()=> this.props.navigation.navigate('StorageManage')}
          >
            <View style={[styles.listItem]}>
              <View style={{flexDirection:'column',alignItems:'center'}}>
              <View style={styles.container1}>
              <Ionicons name={'battery-half-outline'} size={30} color={'#22d'} />
              </View>
                <Text style={{marginLeft:5,fontSize:10,fontWeight: 'bold'}}>储能系统管理</Text>
              </View>
              
            </View>
          </TouchableOpacity>
          

          <TouchableOpacity
          //onPress={()=> alert('aaa')}
          onPress={()=> this.props.navigation.navigate('LoadManage')}
          >
            <View style={[styles.listItem]}>
              <View style={{flexDirection:'column',alignItems:'center'}}>
              <View style={styles.container1}>
              <Ionicons name={'stats-chart-outline'} size={30} color={'#22d'} />
              </View>
                <Text style={{marginLeft:5,fontSize:11,fontWeight: 'bold'}}>负荷管理</Text>
              </View>
             
            </View>
          </TouchableOpacity>

          <TouchableOpacity
          //onPress={()=> alert('aaa')}
          onPress={()=> this.props.navigation.navigate('Dispatch')}
          >
            <View style={[styles.listItem]}>
              <View style={{flexDirection:'column',alignItems:'center'}}>
              <View style={styles.container1}>
              <Ionicons name={'swap-vertical-outline'} size={30} color={'#22d'} />
              </View>
                <Text style={{marginLeft:5,fontSize:11,fontWeight: 'bold'}}>调度与分析</Text>
              </View>
             
            </View>
          </TouchableOpacity>

          <TouchableOpacity
          //onPress={()=> alert('aaa')}
          onPress={()=> this.props.navigation.navigate('GreenUse')}
          >
            <View style={[styles.listItem]}>
              <View style={{flexDirection:'column',alignItems:'center'}}>
              <View style={styles.container1}>
              <Ionicons name={'leaf-outline'} size={30} color={'#22d'} />
              </View>
                <Text style={{marginLeft:5,fontSize:11,fontWeight: 'bold'}}>绿色用电</Text>
              </View>
             
            </View>
          </TouchableOpacity>
          
          </View>
          </Card>
          <Card containerStyle={{ elevation:5,borderRadius: 15 }}>
              <View style={[styles.container2]}>
              <Text style={{fontSize: 17,fontWeight: 'bold'}}>本日运行数据</Text>
              </View>
              <View style={{flexDirection:'row',flexWrap:'wrap',backgroundColor: 'transparent'}}>
              
                  {/*<Card containerStyle={styles.container3}> </Card>*/}
                  <LinearGradient colors={['#0fffff', '#ffffff']} style={styles.gradient}>
                      <View style={{flexDirection:'column',alignItems:'center'}}>
                          <Text style={styles.text}>日累计用电量</Text>
                          <View style={{flexDirection:'row',flexWrap:'wrap'}}>
                             <Text style={styles.text}>{this.state.DATA.eleconsum}</Text>
                             <Text style={styles.text}>kWh</Text>
                          </View>
                        </View>
                    </LinearGradient>
                    <LinearGradient colors={['#0fffff', '#ffffff']} style={styles.gradient}>
                      <View style={{flexDirection:'column',alignItems:'center'}}>
                          <Text style={styles.text}>新能源日发电量</Text>
                          <View style={{flexDirection:'row',flexWrap:'wrap'}}>
                             <Text style={styles.text}>{this.state.DATA.elegenerate}</Text>
                             <Text style={styles.text}>kWh</Text>
                          </View>
                        </View>
                    </LinearGradient>
                    <LinearGradient colors={['#0fffff', '#ffffff']} style={styles.gradient}>
                      <View style={{flexDirection:'column',alignItems:'center'}}>
                          <Text style={styles.text}>日调节负荷量</Text>
                          <View style={{flexDirection:'row',flexWrap:'wrap'}}>
                             <Text style={styles.text}>{this.state.DATA.adjustload}</Text>
                             <Text style={styles.text}>kWh</Text>
                          </View>
                        </View>
                    </LinearGradient>

                    <LinearGradient colors={['#0fffff', '#ffffff']} style={styles.gradient}>
                      <View style={{flexDirection:'column',alignItems:'center'}}>
                          <Text style={styles.text}>新能源停电小时</Text>
                          <View style={{flexDirection:'row',flexWrap:'wrap'}}>
                             <Text style={styles.text}>{this.state.DATA.poweroff}</Text>
                             <Text style={styles.text}>h</Text>
                          </View>
                        </View>
                    </LinearGradient>
                    <LinearGradient colors={['#0fffff', '#ffffff']} style={styles.gradient}>
                      <View style={{flexDirection:'column',alignItems:'center'}}>
                          <Text style={styles.text}>故障告警次数</Text>
                          <View style={{flexDirection:'row',flexWrap:'wrap'}}>
                             <Text style={styles.text}>{this.state.DATA.alarm}</Text>
                             <Text style={styles.text}>次</Text>
                          </View>
                        </View>
                    </LinearGradient>
                    <LinearGradient colors={['#0fffff', '#ffffff']} style={styles.gradient}>
                      <View style={{flexDirection:'column',alignItems:'center'}}>
                          <Text style={styles.text}>综合评分</Text>
                          <View style={{flexDirection:'row',flexWrap:'wrap'}}>
                             <Text style={styles.text}>{this.state.DATA.elaluate}</Text>
                          </View>
                        </View>
                    </LinearGradient>

                    <LinearGradient colors={['#0fffff', '#ffffff']} style={styles.gradient1}>
                      <View style={{flexDirection:'column'}}>
                          <View style={{alignItems:'center'}}>
                          <Text style={styles.text}>日累计购售电量</Text>
                          </View>
                          <View style={{flexDirection:'row',flexWrap:'wrap',justifyContent:'space-around'}}>
                          <Text style={styles.text}>购电量:</Text>
                             <Text style={styles.text}>{this.state.DATA.elepurchase}</Text>
                             <Text style={styles.text}>kWh</Text>
                          </View>
                          <View style={{flexDirection:'row',flexWrap:'wrap',justifyContent:'space-around'}}>
                          <Text style={styles.text}>售电量:</Text>
                             <Text style={styles.text}>{this.state.DATA.elesale}</Text>
                             <Text style={styles.text}>kWh</Text>
                          </View>
                        </View>
                    </LinearGradient>
                    <LinearGradient colors={['#0fffff', '#ffffff']} style={styles.gradient1}>
                      <View style={{flexDirection:'column'}}>
                      <View style={{alignItems:'center'}}>
                          <Text style={styles.text}>储能充放电量</Text>
                          </View>
                          <View style={{flexDirection:'row',flexWrap:'wrap',justifyContent:'space-around'}}>
                          <Text style={styles.text}>充电量:</Text>
                             <Text style={styles.text}>{this.state.DATA.storagecharge}</Text>
                             <Text style={styles.text}>kWh</Text>
                          </View>
                          <View style={{flexDirection:'row',flexWrap:'wrap',justifyContent:'space-around'}}>
                          <Text style={styles.text}>放电量:</Text>
                             <Text style={styles.text}>{this.state.DATA.storagedischarge}</Text>
                             <Text style={styles.text}>kWh</Text>
                          </View>
                        </View>
                    </LinearGradient>
              </View>
          </Card>
        
       </ScrollView>
      </SafeAreaView>
    )
  }
}


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
   // flexDirection:'column',
    justifyContent:'space-around',
    alignItems:'center',
    borderBottomWidth:0,
    borderBottomColor:'#ddd',
    height:60,
    paddingHorizontal:11,
    //paddingVertical:11,
    marginVertical:10,
    width: Dimensions.get('window').width/3.7,
    //width:173
    //width:114
    //marginRight:4
  },
  image: {
    flex: 1,
    resizeMode: "center",
    //justifyContent: "center"
  },
  container1: {
    //backgroundColor: '#32cd32',
    borderRadius: 20,
    width: 50,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth:2,
    //elevation:50
    borderColor:'#1e90ff',
    //borderTopWidth:2
  },
  container2: {
    borderWidth: 0.5,
    borderColor: '#000',
    borderRadius: 5,
    padding: 5,
    backgroundColor:'#00ced1',
    //aspectRatio: 1,
    //width: text.length * 11
    width:130,
    marginVertical:5,
    paddingVertical:10,
    alignItems:'center'
  },

  text: {
    fontSize: 11,
    color: 'dodgerblue',
    lineHeight:18,
    fontWeight: 'bold',
  },
  
  container3:{
    elevation:5,
    borderRadius:11,
    alignItems:'center',
    //overflow: 'hidden'
  },
  gradient:{
    padding: 5,
    paddingHorizontal:2,
    paddingVertical:10,
    borderRadius: 5,
    borderWidth:0.2,
    marginVertical:10,
    marginHorizontal:2,
    width:Dimensions.get('window').width/3.8
  },
  gradient1:{
    padding: 5,
    paddingHorizontal:1,
    paddingVertical:10,
    borderRadius: 5,
    borderWidth:0.2,
    marginVertical:15,
    marginHorizontal:2,
    width:Dimensions.get('window').width/2.5
  }
})
