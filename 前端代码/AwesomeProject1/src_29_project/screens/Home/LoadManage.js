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
import {getloadmanagedata} from '../../api';
import { Table, TableWrapper, Row, Rows, Col, Cols, Cell } from 'react-native-reanimated-table';
import { aesDecrypt } from '../../aesDecrpt'; 

export default class ExampleTwo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      //tableHead: ['', '风电', '光伏', '单位'],
      tableTitle: ['最大偏差值','最大偏差值','均方根误差'],
      tableData: [
        ['---'],['---'],['---'] 
      ],
      
      tableTitle1: ['昨日最高点负荷准确率','昨日最低点负荷准确率','上月日均最高点负荷准确率',
      '上月日均最低点负荷准确率','上月日均平均负荷准确率',],
      tableData1: [
        ['---'],['---'],['---'] ,['---'],['---']
      ],
      LOADDATA:{},
      LOADDATA_0:{},
      LOADDATA_1:{},
      data : {
        labels: ["2022-01", "2022-03", "2022-05", "2022-07", "2022-09", "2022-11",""],
        datasets: [
          {
            data: [20, 45, 28, 80, 99, 43,],
            color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`, // optional
            strokeWidth: 1 // optional
          }
        ]
      },
      data1 :{
        labels: ["00:00","04:00", "08:00", "12:00", "16:00", "20:00", "24:00"],
        datasets: [
          {
            data: [100,100,800,800,800,100,100],
            color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`, // optional
            strokeWidth: 1 // optional
          },
          {
            data: [100,120,900,850,800,100,100],
            color: (opacity = 1) => `rgba(0, 0, 255, ${opacity})`, // optional
            strokeWidth: 1 // optional
          }
        ],
        legend: ["预测曲线","实际曲线"] // optional
      },
       data2 : {
        labels: ["00:00","04:00", "08:00", "12:00", "16:00", "20:00", "24:00"],
        datasets: [
          {
            data: [100,120,900,850,800,100,100],
            color: (opacity = 1) => `rgba(255, 0, 0, ${opacity})`, // optional
            strokeWidth: 1 // optional
          }
        ],
        legend: ["预测曲线"] // optional
      },
    }
  }
  componentDidMount(){
    this.timer = setInterval(
      () => {
        getloadmanagedata().then(res=>{
        //  console.log(res[0])
       // console.log(res)
        this.setState({
          LOADDATA_0 : aesDecrypt(res),            //aes解密
          
        })
        this.setState({
          LOADDATA_1 :JSON.parse(this.state.LOADDATA_0)       //转化为json
        })
        this.setState({
          LOADDATA : this.state.LOADDATA_1[0]
        })
        
        //console.log(this.state.LOADDATA)
        /*  this.setState({
            LOADDATA:res[0]
          })*/
          this.setState({
            tableTitle: ['最大偏差值','最大偏差值','均方根误差'],
      tableData: [
        [this.state.LOADDATA.deviation_value_max],[this.state.LOADDATA.deviation_rate_max],[this.state.LOADDATA.rmsd] 
      ],
      
      tableTitle1: ['昨日最高点负荷准确率','昨日最低点负荷准确率','上月日均最高点负荷准确率',
      '上月日均最低点负荷准确率','上月日均平均负荷准确率',],
      tableData1: [
        [this.state.LOADDATA.peak_accuracy_yesterday],[this.state.LOADDATA.lowest_accuracy_yesterday],[this.state.LOADDATA.peak_accuracy_lastmonth] ,
        [this.state.LOADDATA.lowest_accuracy_lastmonth],[this.state.LOADDATA.average_accuracy_lastmonth]
      ],
      data : {
        labels: ["2022-01", "2022-03", "2022-05", "2022-07", "2022-09", "2022-11",""],
        datasets: [
          {
            data: [this.state.LOADDATA.mecf_1, this.state.LOADDATA.mecf_3, this.state.LOADDATA.mecf_5,
              this.state.LOADDATA.mecf_7,this.state.LOADDATA.mecf_9, this.state.LOADDATA.mecf_11,],
            color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`, // optional
            strokeWidth: 1 // optional
          }
        ]
      },
      data1 :{
        labels: ["00:00","04:00", "08:00", "12:00", "16:00", "20:00", "24:00"],
        datasets: [
          {
            data: [this.state.LOADDATA.sst_load_forecast_0,this.state.LOADDATA.sst_load_forecast_4,
              this.state.LOADDATA.sst_load_forecast_8,this.state.LOADDATA.sst_load_forecast_12,
              this.state.LOADDATA.sst_load_forecast_16,this.state.LOADDATA.sst_load_forecast_20,
              this.state.LOADDATA.sst_load_forecast_24],
            color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`, // optional
            strokeWidth: 1 // optional
          },
          {
            data: [this.state.LOADDATA.sst_load_actual_0,this.state.LOADDATA.sst_load_actual_4,
              this.state.LOADDATA.sst_load_actual_8,this.state.LOADDATA.sst_load_actual_12,
              this.state.LOADDATA.sst_load_actual_16,0,0],
            color: (opacity = 1) => `rgba(0, 0, 255, ${opacity})`, // optional
            strokeWidth: 1 // optional
          }
        ],
        legend: ["预测曲线","实际曲线"] // optional
      },
       data2 : {
        labels: ["00:00","04:00", "08:00", "12:00", "16:00", "20:00", "24:00"],
        datasets: [
          {
            data: [this.state.LOADDATA.stlf_0,this.state.LOADDATA.stlf_4,
              this.state.LOADDATA.stlf_8,this.state.LOADDATA.stlf_12,
              this.state.LOADDATA.stlf_16,this.state.LOADDATA.stlf_20,this.state.LOADDATA.stlf_24],
            color: (opacity = 1) => `rgba(255, 0, 0, ${opacity})`, // optional
            strokeWidth: 1 // optional
          }
        ],
        legend: ["预测曲线"] // optional
      },
          })
        })
      },
      1000
      );}
      shouldComponentUpdate(nextProps, nextState) {
        if (this.state. LOADDATA !== nextState. LOADDATA) {
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
                    <Text style={styles.text}>日负荷预测当日偏差值</Text>     
                </View>
              </LinearGradient>
            </View>
        <Table borderStyle={{borderWidth: 0.8}}>
         
          <TableWrapper style={styles.wrapper} 	>
            <Col data={state.tableTitle}  style={styles.title} heightArr={[40,40]} textStyle={styles.text}/>
            <Rows data={state.tableData} flexArr={[1]} style={styles.row} textStyle={styles.text}/>
          </TableWrapper>
        </Table>

        <View style={{alignItems:'center',marginBottom:10,marginTop:10}}>
              <LinearGradient colors={['#0fffff', '#ffffff']} style={styles.gradient}>
                <View style={{flexDirection:'column',alignItems:'center'}}>
                    <Text style={styles.text}>负荷预测数据</Text>     
                </View>
              </LinearGradient>
            </View>
        <Table borderStyle={{borderWidth: 0.8}}>
         
          <TableWrapper style={styles.wrapper} 	>
            <Col data={state.tableTitle1}  style={styles.title} heightArr={[50,50,50,50,50]} textStyle={styles.text}/>
            <Rows data={state.tableData1} flexArr={[1]} style={styles.row1} textStyle={styles.text}/>
          </TableWrapper>
        </Table>

        <View style={{alignItems:'center',marginBottom:10,marginTop:5}}>
              <LinearGradient colors={['#0fffff', '#ffffff']} style={styles.gradient1}>
                <View style={{flexDirection:'column',alignItems:'center'}}>
                    <Text style={styles.text}>超短期负荷预测(kWh)</Text>     
                </View>
              </LinearGradient>
          </View>
            <View>
            <LineChart
              data={state.data1}
               width={Dimensions.get("window").width/1.15}
               height={220}
               chartConfig={chartConfig}
               style={{
               marginVertical: 8,
               borderRadius: 16,
               marginHorizontal:-20
                }}
               
               // yLabelsOffset={0}
                fromZero={true}
           bezier
           />
           </View>
           <View style={{alignItems:'center',marginBottom:10,marginTop:5}}>
              <LinearGradient colors={['#0fffff', '#ffffff']} style={styles.gradient1}>
                <View style={{flexDirection:'column',alignItems:'center'}}>
                    <Text style={styles.text}>月度能耗预测(kWh)</Text>     
                </View>
              </LinearGradient>
            </View>
            <BarChart
              style={graphStyle}
              data={state.data}
              width={Dimensions.get('window').width/1.1}
              height={220}
              yAxisLabel=""
              chartConfig={chartConfig}
              verticalLabelRotation={20}
              fromZero={true}
            />
        
        <View style={{alignItems:'center',marginBottom:10,marginTop:5}}>
              <LinearGradient colors={['#0fffff', '#ffffff']} style={styles.gradient1}>
                <View style={{flexDirection:'column',alignItems:'center'}}>
                    <Text style={styles.text}>短期负荷预测(未来24h)(kWh)</Text>     
                </View>
              </LinearGradient>
            </View>
            <View>
            <LineChart
              data={state.data2}
               width={Dimensions.get("window").width/1.15}
               height={220}
               chartConfig={chartConfig}
               style={{
               marginVertical: 8,
               borderRadius: 16,
               marginHorizontal:-20
                }}
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
/*const data = {
  labels: ["2022-01", "2022-03", "2022-05", "2022-07", "2022-09", "2022-11",""],
  datasets: [
    {
      data: [20, 45, 28, 80, 99, 43,],
      color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`, // optional
      strokeWidth: 1 // optional
    }
  ]
};
const data1 = {
  labels: ["00:00","04:00", "08:00", "12:00", "16:00", "20:00", "24:00"],
  datasets: [
    {
      data: [100,100,800,800,800,100,100],
      color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`, // optional
      strokeWidth: 1 // optional
    },
    {
      data: [100,120,900,850,800,100,100],
      color: (opacity = 1) => `rgba(0, 0, 255, ${opacity})`, // optional
      strokeWidth: 1 // optional
    }
  ],
  legend: ["预测曲线","实际曲线"] // optional
};
const data2 = {
  labels: ["00:00","04:00", "08:00", "12:00", "16:00", "20:00", "24:00"],
  datasets: [
    {
      data: [100,120,900,850,800,100,100],
      color: (opacity = 1) => `rgba(255, 0, 0, ${opacity})`, // optional
      strokeWidth: 1 // optional
    }
  ],
  legend: ["预测曲线"] // optional
};*/
const chartConfig = {
  //backgroundGradientFrom: "#e6e6fa",
  //backgroundGradientFromOpacity:"#d3d3d3",
  //backgroundGradientTo: "#d3d3d3",
  backgroundGradientFrom: "#ffffff",
  backgroundGradientTo: "#ffffff",
  backgroundGradientToOpacity: 1,
  color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
  strokeWidth: 2, // optional, default 3
  barPercentage: 0.5,
  //useShadowColorFromDataset: false // optional

};

const graphStyle={
    marginVertical: 8,
    borderRadius: 16,
  marginHorizontal:-20,
  //paddingVertical:-50
            }
const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, paddingTop: 10, backgroundColor: '#fff' },
  head: {  height: 50,  backgroundColor: '#f1f8ff'  },
  wrapper: { flexDirection: 'row' },
  title: { flex: 1, backgroundColor: '#f6f8fa'},
  row: {  height: 40  },
  row1: {  height: 50  },
  text: { textAlign: 'center' },
  gradient:{
    padding: 5,
    paddingVertical:8,
    borderRadius: 5,
    borderWidth:0.2,
    width:Dimensions.get('window').width/2.5,
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