import React, { Component } from 'react'
import { Text, StyleSheet, View ,SafeAreaView,ScrollView,Image,TouchableOpacity, Touchable, Alert, ImageBackground,Dimensions} from 'react-native'
import { Card } from '@rneui/themed';
import LinearGradient from 'react-native-linear-gradient';
//import { Table, TableWrapper, Row, Rows, Col } from 'react-native-table-component';
import {
    LineChart,
    BarChart,
    PieChart,
    ProgressChart,
    ContributionGraph,
    StackedBarChart
  } from "react-native-chart-kit";
import {getmainhomedata} from '../../api';
import { Table, TableWrapper, Row, Rows, Col, Cols, Cell } from 'react-native-reanimated-table';
import { aesDecrypt } from '../../aesDecrpt';

export default class MainHome extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tableHead: ['', '计划功率(kW)', '实际功率(kW)', '设备状态'],
      tableTitle: [['进线PCC点'],['光伏发电'],['风力发电'],
      ['储能系统'],['柴油机组'],['燃气轮机'],
      ['总负荷'],['一级负荷'],['二级负荷'],
      ['三级负荷'],['四级负荷'],['充电桩'],],
      tableData: [
        ['---', '---', '运行'] ,['---', '---', '运行'] ,
        ['---', '---', '运行'] ,['---', '---', '运行'] ,
        ['---', '---', '停止'] ,['---', '---', '停止'] ,
        ['---', '---', '---'] ,['---', '---', '---'] ,
        ['---', '---', '---'] ,['---', '---', '---'] ,
        ['---', '---', '---'] ,['---', '---', '---'] 
      ],
      MAINDATA:{},
      MAINDATA_0:{},
      MAINDATA_1:{},
      data3 : {
        labels: ["0","3","6","9","12","15","18","21","24"],
        datasets: [
          {
            data: [20, 45, 28,22,55, 80, 52, 34,60],
            color: (opacity = 1) => `rgba(0, 0, 255, ${opacity})`, // optional
            labelColor: (opacity = 1) => `rgba(0,0,255, ${opacity})`,
            strokeWidth: 1, // optional
            //legend: ["Rainy Days"] // optional
          },
          {
            data: [60, 45, 28,55,88, 80, 99, 43,20],
            color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`, // optional
            labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
            strokeWidth: 1 // optional
          }
        ],
        legend: ["计划","实际"] // optional
      }
    }
    
  }
  
  componentDidMount(){
    this.timer = setInterval(
      () => {
        getmainhomedata().then(res=>{
        //  console.log(res[0])
        // console.log(res)
         this.setState({
          MAINDATA_0 : aesDecrypt(res),            //aes解密
          
        })
        this.setState({
          MAINDATA_1 :JSON.parse(this.state.MAINDATA_0)       //转化为json
        })
        this.setState({
          MAINDATA : this.state.MAINDATA_1[0]
        })
        
       // console.log(this.state.MAINDATA)
          /*this.setState({
            MAINDATA:res[0]
           
          })*/
          this.setState({
            tableData: [
              [this.state.MAINDATA.pccplan,this.state.MAINDATA.pccactual, this.state.MAINDATA.pccstate] ,
              [this.state.MAINDATA.pvplan, this.state.MAINDATA.pvactual, this.state.MAINDATA.pvstate] ,
              [this.state.MAINDATA.windplan,this.state.MAINDATA.windactual, this.state.MAINDATA.windstate] ,
              [this.state.MAINDATA.storageplan, this.state.MAINDATA.storageactual, this.state.MAINDATA.storagestate] ,
              [this.state.MAINDATA.dieselplan,this.state.MAINDATA.dieselactual, this.state.MAINDATA.dieselstate] ,
              [this.state.MAINDATA.gas_turbine_plan, this.state.MAINDATA.gas_turbine_actual, this.state.MAINDATA.gas_turbine_state] ,
              [this.state.MAINDATA.totalloadplan, this.state.MAINDATA.totalloadactual, '---'] ,
              [this.state.MAINDATA.firstloadplan, this.state.MAINDATA.firstloadactual, '---'] ,
              [this.state.MAINDATA.secondloadplan, this.state.MAINDATA.secondloadactual, '---'] ,
              [this.state.MAINDATA.thirdloadplan, this.state.MAINDATA.thirdloadactual, '---'] ,
              [this.state.MAINDATA.fourthloadplan, this.state.MAINDATA.fourthloadactual, '---'] ,
              [this.state.MAINDATA.chargingpileplan, this.state.MAINDATA.chargingpileactual, '---'] 
            ],
            data3:{
              labels: ["0","3","6","9","12","15","18","21","24"],
              datasets: [
                {
                  data: [this.state.MAINDATA.pccplan_0, this.state.MAINDATA.pccplan_3, this.state.MAINDATA.pccplan_6,
                    this.state.MAINDATA.pccplan_9,this.state.MAINDATA.pccplan_12, this.state.MAINDATA.pccplan_15,
                    this.state.MAINDATA.pccplan_18, this.state.MAINDATA.pccplan_21,this.state.MAINDATA.pccplan_24],
                  color: (opacity = 1) => `rgba(0, 0, 255, ${opacity})`, // optional
                  labelColor: (opacity = 1) => `rgba(0,0,255, ${opacity})`,
                  strokeWidth: 1, // optional
                  //legend: ["Rainy Days"] // optional
                },
                {
                  data: [this.state.MAINDATA.pccactual_0, this.state.MAINDATA.pccactual_3, this.state.MAINDATA.pccactual_6,
                    this.state.MAINDATA.pccactual_9,this.state.MAINDATA.pccactual_12,this.state.MAINDATA.pccactual_15, 
                    this.state.MAINDATA.pccactual_18,0,0],
                  color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`, // optional
                  labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
                  strokeWidth: 1 // optional
                }
              ],
              legend: ["计划","实际"] // optional
              
            }
            /*tableHead:[this.state.MAINDATA.loadpower,this.state.MAINDATA.loadpower,
              this.state.MAINDATA.loadpower,this.state.MAINDATA.loadpower]*/
          })
        //  Alert.alert('成功','请求成功')
        })
      },
      1000
      );}
      shouldComponentUpdate(nextProps, nextState) {
        if (this.state.MAINDATA !== nextState.MAINDATA) {
          return true;
        }
        return false;
      }
   componentWillUnmount() {
  // 如果存在this.timer，则使用clearTimeout清空。  
        this.timer && clearInterval(this.timer);
 }
 
 
  
  render() {
    const state = this.state;
    return (
      <SafeAreaView style={[styles.container]}>
       <ScrollView>
       <View style={{alignItems:'center',marginTop:2}}>
           <Text style={{marginLeft:2,fontSize:18,fontWeight: 'bold'}}>全网监测</Text>
           </View>
       <Card containerStyle={{ elevation:5,borderRadius: 15 }}>
              <View style={{flexDirection:'row',flexWrap:'wrap',backgroundColor: 'transparent'}}>
                  <LinearGradient colors={['#0fffff', '#ffffff']} style={styles.gradient}>
                      <View style={{flexDirection:'column',alignItems:'center',justifyContent: 'center'}}>
                          <Text style={styles.text}>全网负荷总功率</Text>
                          <View style={{flexDirection:'row',flexWrap:'wrap'}}>
                             <Text style={styles.text}>{this.state.MAINDATA.loadpower}</Text>
                             <Text style={styles.text}>kWh</Text>
                          </View>
                        </View>
                    </LinearGradient>
                    <LinearGradient colors={['#0fffff', '#ffffff']} style={styles.gradient}>
                      <View style={{flexDirection:'column',alignItems:'center'}}>
                          <Text style={styles.text}>新能源发电总功率</Text>
                          <View style={{flexDirection:'row',flexWrap:'wrap'}}>
                             <Text style={styles.text}>{this.state.MAINDATA.new_energy_generation}</Text>
                             <Text style={styles.text}>kWh</Text>
                          </View>
                        </View>
                    </LinearGradient>
                    <LinearGradient colors={['#0fffff', '#ffffff']} style={styles.gradient}>
                      <View style={{flexDirection:'column',alignItems:'center'}}>
                          <Text style={styles.text}>储能系统总功率</Text>
                          <View style={{flexDirection:'row',flexWrap:'wrap'}}>
                             <Text style={styles.text}>{this.state.MAINDATA.storagepower}</Text>
                             <Text style={styles.text}>kWh</Text>
                          </View>
                        </View>
                    </LinearGradient>

                    <LinearGradient colors={['#0fffff', '#ffffff']} style={styles.gradient}>
                      <View style={{flexDirection:'column',alignItems:'center'}}>
                          <Text style={styles.text}>PCC点交换总功率</Text>
                          <View style={{flexDirection:'row',flexWrap:'wrap'}}>
                             <Text style={styles.text}>{this.state.MAINDATA.pccexchange}</Text>
                             <Text style={styles.text}>kWh</Text>
                          </View>
                        </View>
                    </LinearGradient>
                    <LinearGradient colors={['#0fffff', '#ffffff']} style={styles.gradient}>
                      <View style={{flexDirection:'column',alignItems:'center'}}>
                          <Text style={styles.text}>PCC点无功功率</Text>
                          <View style={{flexDirection:'row',flexWrap:'wrap'}}>
                             <Text style={styles.text}>{this.state.MAINDATA.pcc_reactive_power}</Text>
                             <Text style={styles.text}>kWh</Text>
                          </View>
                        </View>
                    </LinearGradient>
                    <LinearGradient colors={['#0fffff', '#ffffff']} style={styles.gradient}>
                      <View style={{flexDirection:'column',alignItems:'center'}}>
                          <Text style={styles.text}>微电源出力余度</Text>
                          <View style={{flexDirection:'row',flexWrap:'wrap'}}>
                          <Text style={styles.text}>{this.state.MAINDATA.micropower}</Text>
                             <Text style={styles.text}>kWh</Text>
                          </View>
                        </View>
                    </LinearGradient>
                </View>
            </Card>
          <View style={{alignItems:'center',marginBottom:10,marginTop:5}}>
              <LinearGradient colors={['#0fffff', '#ffffff']} style={styles.gradient1}>
                <View style={{flexDirection:'column',alignItems:'center'}}>
                    <Text >实施运行参数与状态</Text>     
                </View>
              </LinearGradient>
            </View>
            <View style={{flex: 1, padding: 16, paddingTop: 10, backgroundColor: '#fff'}}>
            <Table borderStyle={{borderWidth: 0.8}}>
          <Row data={state.tableHead} flexArr={[1, 1, 1, 1]} style={styles.head} textStyle={styles.text1}/>
          <TableWrapper style={styles.wrapper} 	>
            <Col data={state.tableTitle}  style={styles.title} heightArr={[30,30]} textStyle={styles.text1}/>
            <Rows data={state.tableData} flexArr={[1,1,1]} style={styles.row} textStyle={styles.text1}/>
          </TableWrapper>
        </Table>   
        </View>   
        <View style={{alignItems:'center',marginBottom:10,marginTop:5}}>
              <LinearGradient colors={['#0fffff', '#ffffff']} style={styles.gradient2}>
                <View style={{flexDirection:'column',alignItems:'center'}}>
                    <Text >今日PCC点运行曲线(kWh)</Text>     
                </View>
              </LinearGradient>
          </View>
            <View 
            //style={{alignItems:'center'}}
            >
            <LineChart
              data={state.data3}
               width={Dimensions.get("window").width/1.05}
               height={220}
               chartConfig={chartConfig}
               style={{
               marginVertical: 8,
               borderRadius: 16,
               marginHorizontal:5
                }}
              /* yAxisSuffix={"kW/h"}
                xAxisLabel={"h"}
                yLabelsOffset={0}*/
                fromZero={true}
           bezier
           />
           </View>  
       </ScrollView>
       </SafeAreaView>
    )
  }
}
/*const data1 = {
  labels: ["","1", "", "3", "", "5", "","7", "", "9", "", "11","","13", "", "15", "", "17","","19", "", "21", "", "23"],
  datasets: [
    {
      data: [10, 45, 28, 80, 52, 34,46, 61, 64, 55, 22, 19,20, 64, 28, 64, 34, 14,94, 64, 34, 80,55, 43],
      color: (opacity = 1) => `rgba(0, 0, 255, ${opacity})`, // optional
      labelColor: (opacity = 1) => `rgba(0,0,255, ${opacity})`,
      strokeWidth: 1, // optional
      //legend: ["Rainy Days"] // optional
    },
    {
      data: [20, 45, 28, 80, 99, 43,20, 45, 28, 80, 99, 43,20, 45, 28, 80, 99, 43,20, 45, 28, 80, 99, 43],
      color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`, // optional
      labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
      strokeWidth: 1 // optional
    }
  ],
  legend: ["计划","实际"] // optional
};
var data2 = {
  labels: ["0","3","6","9","12","15","18","21","24"],
  datasets: [
    {
      data: [20, 45, 28,22,55, 80, 52, 34,60],
      color: (opacity = 1) => `rgba(0, 0, 255, ${opacity})`, // optional
      labelColor: (opacity = 1) => `rgba(0,0,255, ${opacity})`,
      strokeWidth: 1, // optional
      //legend: ["Rainy Days"] // optional
    },
    {
      data: [50, 45, 28,55,88, 80, 99, 43,20],
      color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`, // optional
      labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
      strokeWidth: 1 // optional
    }
  ],
  legend: ["计划","实际"] // optional
  
};*/
const chartConfig = {
  //backgroundGradientFrom: "#e6e6fa",
  //backgroundGradientFromOpacity:"#d3d3d3",
  //backgroundGradientTo: "#d3d3d3",
  backgroundGradientFrom: "#ffffff",
  backgroundGradientTo: "#ffffff",
 // backgroundGradientToOpacity: 2,
  color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
  //strokeWidth: 2, // optional, default 3
  //barPercentage: 0.5,
  //useShadowColorFromDataset: false // optional
  

};
const styles = StyleSheet.create({
  container:{
    justifyContent:'flex-start',
    backgroundColor: '#fff'
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
    fontSize: 12,
    color: 'dodgerblue',
    lineHeight:18,
    fontWeight: 'bold',
  },
  gradient:{
    padding: 5,
    paddingHorizontal:2,
    paddingVertical:10,
    borderRadius: 5,
    borderWidth:0.5,
    marginVertical:3,
    marginHorizontal:2,
    width:Dimensions.get('window').width/2.5
  },
  gradient1:{
    padding: 5,
    paddingVertical:8,
    marginTop:8,
    borderRadius: 5,
    borderWidth:0.2,
    width:Dimensions.get('window').width/2,
    alignItems:'center'
  },
  gradient2:{
    padding: 5,
    paddingVertical:8,
    marginTop:8,
    borderRadius: 5,
    borderWidth:0.2,
    width:Dimensions.get('window').width/1.5,
    alignItems:'center'
  },
  head: {  height: 50,  backgroundColor: '#f1f8ff'  },
  wrapper: { flexDirection: 'row' },
  title: { flex: 1, backgroundColor: '#f6f8fa'},
  row: {  height: 30  },
  text1: { textAlign: 'center' },
})
