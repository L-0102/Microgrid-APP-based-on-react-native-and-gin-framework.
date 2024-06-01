import React, { Component } from 'react';
import { StyleSheet, View,Dimensions,Text ,SafeAreaView,ScrollView} from 'react-native';
//import { Table, TableWrapper, Row, Rows, Col } from 'react-native-table-component';
import LinearGradient from 'react-native-linear-gradient';
import {
    LineChart,
    BarChart,
    PieChart,
    ProgressChart,
    ContributionGraph,
    StackedBarChart
  } from "react-native-chart-kit";
import {getMicropowerdata,getmainhomedata} from '../../api';
import { Table, TableWrapper, Row, Rows, Col, Cols, Cell } from 'react-native-reanimated-table';   
import { aesDecrypt } from '../../aesDecrpt'; 

export default class EleUse extends Component {
  constructor(props) {
    super(props);
    //tableHead: ['', '计划功率(kW)', '实际功率(kW)', '设备状态'];
    this.state = {
      tableHead: ['', '风电', '光伏', '单位'],
      tableTitle: ['日发电量'],
      tableData: [
        ['---', '---', 'kWh'] 
      ],
      tableTitle1: ['风力发电机','光伏发电板'],
      tableData1: [
        ['---'],['---'] ],
       data3 : {
          labels: ["0","3", "6", "9", "12", "15", "18","21", "24"],
          datasets: [
            {
              data: [20, 45, 28, 80, 52, 34,46, 61, 64],
              color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`, // optional
              strokeWidth: 1 // optional
            }
          ],
        },
       data4 : {
          labels: ["0","3", "6", "9", "12", "15", "18","21", "24"],
          datasets: [
            {
              data:[20, 45, 28, 80, 52, 34,46, 61, 64],
              color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`, // optional
              strokeWidth: 1 // optional
            }
          ],
        },
      POWERDATA:{},
      POWERDATA_0:{},
      POWERDATA_1:{},
    }
  }
  componentDidMount(){
    this.timer = setInterval(
      () => {
        getMicropowerdata().then(res=>{
        //  console.log(res[0])
       // console.log(res)
        this.setState({
          POWERDATA_0 : aesDecrypt(res),            //aes解密
          
        })
        this.setState({
          POWERDATA_1 :JSON.parse(this.state.POWERDATA_0)       //转化为json
        })
        this.setState({
          POWERDATA : this.state.POWERDATA_1[0]
        })
        
       // console.log(this.state.POWERDATA)
         /* this.setState({
            POWERDATA:res[0]
          })*/
          this.setState({
            tableData: [
              [this.state.POWERDATA.wind_daily,this.state.POWERDATA.photovoltaic_daily, 'kWh'] 
            ],
            tableData1: [
              [this.state.POWERDATA.wind_turbine_number],[this.state.POWERDATA.photovoltaic_panel_number] ],
             data3 :{
                labels: ["0","3", "6", "9", "12", "15", "18","21", "24"],
                datasets: [
                  {
                    data: [this.state.POWERDATA.photovoltaic_0, this.state.POWERDATA.photovoltaic_3, this.state.POWERDATA.photovoltaic_6,
                      this.state.POWERDATA.photovoltaic_9, this.state.POWERDATA.photovoltaic_12, this.state.POWERDATA.photovoltaic_15,
                      this.state.POWERDATA.photovoltaic_18, 0,0],
                    color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`, // optional
                    strokeWidth: 1 // optional
                  }
                ],
              },
             data4 : {
                labels: ["0","3", "6", "9", "12", "15", "18","21", "24"],
                datasets: [
                  {
                    data:[this.state.POWERDATA.wind_0, this.state.POWERDATA.wind_3,this.state.POWERDATA.wind_6,
                      this.state.POWERDATA.wind_9, this.state.POWERDATA.wind_12,this.state.POWERDATA.wind_15,
                      this.state.POWERDATA.wind_18,0,0],
                    color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`, // optional
                    strokeWidth: 1 // optional
                  }
                ],
              },
          })
        })
      },
      1000
      );}
      shouldComponentUpdate(nextProps, nextState) {
        if (this.state.POWERDATA !== nextState.POWERDATA) {
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
      <View style={styles.container}>
          <View style={{alignItems:'center',marginBottom:10}}>
              <LinearGradient colors={['#0fffff', '#ffffff']} style={styles.gradient}>
                <View style={{flexDirection:'column',alignItems:'center'}}>
                    <Text style={styles.text}>日发电量数据</Text>     
                </View>
              </LinearGradient>
            </View>
        <Table borderStyle={{borderWidth: 0.8}}>
          <Row data={state.tableHead} flexArr={[2, 1, 1, 1]} style={styles.head} textStyle={styles.text}/>
          <TableWrapper style={styles.wrapper} 	>
            <Col data={state.tableTitle}  style={styles.title} heightArr={[50,50]} textStyle={styles.text}/>
            <Rows data={state.tableData} flexArr={[0.5, 0.5, 0.5]} style={styles.row} textStyle={styles.text}/>
          </TableWrapper>
        </Table>
       
        <View style={{alignItems:'center',marginBottom:10,marginTop:5}}>
              <LinearGradient colors={['#0fffff', '#ffffff']} style={styles.gradient}>
                <View style={{flexDirection:'column',alignItems:'center'}}>
                    <Text style={styles.text}>光伏风力设备数量</Text>     
                </View>
              </LinearGradient>
            </View>
        <Table borderStyle={{borderWidth: 0.8}}>
         
          <TableWrapper style={styles.wrapper} 	>
            <Col data={state.tableTitle1}  style={styles.title} heightArr={[50,50]} textStyle={styles.text}/>
            <Rows data={state.tableData1} flexArr={[1]} style={styles.row} textStyle={styles.text}/>
          </TableWrapper>
        </Table>

        <View style={{alignItems:'center',marginBottom:10,marginTop:5}}>
              <LinearGradient colors={['#0fffff', '#ffffff']} style={styles.gradient1}>
                <View style={{flexDirection:'column',alignItems:'center'}}>
                    <Text style={styles.text}>光伏日发电数据(kWh)</Text>     
                </View>
              </LinearGradient>
          </View>
            <View>
            <LineChart
              data={state.data3}
               width={Dimensions.get("window").width/1.05}
               height={220}
               chartConfig={chartConfig}
               style={{
               marginVertical: 8,
               borderRadius: 16,
               marginHorizontal:-30
                }}
             /*   yAxisSuffix={"kW/h"}
                xAxisLabel={"h"}
                yLabelsOffset={0}*/
                fromZero={true}
           bezier
           />
           <View style={{alignItems:'center',marginBottom:10,marginTop:5}}>
              <LinearGradient colors={['#0fffff', '#ffffff']} style={styles.gradient1}>
                <View style={{flexDirection:'column',alignItems:'center'}}>
                    <Text style={styles.text}>风力日发电数据(kWh)</Text>     
                </View>
              </LinearGradient>
            </View>
            <LineChart
              data={state.data4}
               width={Dimensions.get("window").width/1.05}
               height={220}
               chartConfig={chartConfig}
               style={{
               marginVertical: 8,
               borderRadius: 16,
               marginHorizontal:-30
                }}
               /* yAxisSuffix={"kW/h"}
                xAxisLabel={"h"}
                yLabelsOffset={0}*/
                fromZero={true}
           bezier
           />
  
      </View>
      </View>
      </ScrollView>
      </SafeAreaView>
    )
  }
}
const data1 = {
  labels: ["0","3", "6", "9", "12", "15", "18","21", "24"],
  datasets: [
    {
      data: [20, 45, 28, 80, 52, 34,46, 61, 64],
      color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`, // optional
      strokeWidth: 1 // optional
    }
  ],
  //legend: ["Rainy Days"] // optional
};
const data2 = {
  labels: ["0","3", "6", "9", "12", "15", "18","21", "24"],
  datasets: [
    {
      data:[20, 45, 28, 80, 52, 34,46, 61, 64],
      color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`, // optional
      strokeWidth: 1 // optional
    }
  ],
  //legend: ["Rainy Days"] // optional
};
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
  container: { flex: 1, padding: 16, paddingTop: 10, backgroundColor: '#fff' },
  head: {  height: 50,  backgroundColor: '#f1f8ff'  },
  wrapper: { flexDirection: 'row' },
  title: { flex: 1, backgroundColor: '#f6f8fa'},
  row: {  height: 50  },
  text: { textAlign: 'center' },
  gradient:{
    padding: 5,
    paddingVertical:8,
    borderRadius: 5,
    borderWidth:0.2,
    width:Dimensions.get('window').width/3,
    alignItems:'center'
  },
  gradient1:{
    padding: 5,
    paddingVertical:8,
    marginTop:8,
    borderRadius: 5,
    borderWidth:0.2,
    width:Dimensions.get('window').width/2.2,
    alignItems:'center'
  },
});