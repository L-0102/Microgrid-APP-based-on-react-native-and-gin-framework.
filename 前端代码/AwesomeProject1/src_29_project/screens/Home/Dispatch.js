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
import {getdispatchdata} from '../../api';
import { Table, TableWrapper, Row, Rows, Col, Cols, Cell } from 'react-native-reanimated-table';
import { aesDecrypt } from '../../aesDecrpt'; 

export default class ExampleTwo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tableHead: ['', '风电', '光伏', '单位'],
      tableTitle: ['日预测发电量'],
      tableData: [
        ['---', '---', 'kW/h'] 
      ],
      DISPATCHDATA:{},
      DISPATCHDATA_0:{},
      DISPATCHDATA_1:{},
      data1 : {
        labels: ["1",  "3",  "5", "7", "9",  "11","13",  "15",  "17","19",  "21",  "23"],
        datasets: [
          {
            data: [0, 0, 0, 0, 0, 0,0, 0, 0, 0, 0, 0],
            color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`, // optional
            strokeWidth: 1 // optional
          }
        ],
      },
       data2 : {
        labels: ["1",  "3",  "5", "7",  "9",  "11","13",  "15",  "17","19",  "21",  "23"],
        datasets: [
          {
            data: [0, 0, 0, 0, 0, 0,0,0 , 0, 0, 0],
            color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`, // optional
            strokeWidth: 1 // optional
          }
        ],
      },
    }
  }
  componentDidMount(){
    this.timer = setInterval(
      () => {
        getdispatchdata().then(res=>{
        //  console.log(res[0])
        //console.log(res)
        this.setState({
          DISPATCHDATA_0 : aesDecrypt(res),            //aes解密
          
        })
        this.setState({
          DISPATCHDATA_1 :JSON.parse(this.state.DISPATCHDATA_0)       //转化为json
        })
        this.setState({
          DISPATCHDATA : this.state.DISPATCHDATA_1[0]
        })
        
       // console.log(this.state.DISPATCHDATA)
        /*  this.setState({
            DISPATCHDATA:res[0]
          })*/
          this.setState({
            tableData: [
              [this.state.DISPATCHDATA.wind_power_forecast,this.state.DISPATCHDATA.photovoltaic_power_forecast, 'kWh'] 
            ],
            data1 : {
              labels: ["1",  "3",  "5", "7", "9",  "11","13",  "15",  "17","19",  "21",  "23"],
              datasets: [
                {
                  data: [this.state.DISPATCHDATA.ppgf_1, this.state.DISPATCHDATA.ppgf_3, this.state.DISPATCHDATA.ppgf_5,
                    this.state.DISPATCHDATA.ppgf_7, this.state.DISPATCHDATA.ppgf_9, this.state.DISPATCHDATA.ppgf_11,
                    this.state.DISPATCHDATA.ppgf_13, this.state.DISPATCHDATA.ppgf_15,this.state.DISPATCHDATA.ppgf_17,
                    this.state.DISPATCHDATA.ppgf_19,this.state.DISPATCHDATA.ppgf_21,this.state.DISPATCHDATA.ppgf_23],
                  color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`, // optional
                  strokeWidth: 1 // optional
                }
              ],
            },
             data2 : {
              labels: ["1",  "3",  "5", "7",  "9",  "11","13",  "15",  "17","19",  "21",  "23"],
              datasets: [
                {
                  data: [this.state.DISPATCHDATA.wpgf_1, this.state.DISPATCHDATA.wpgf_3, this.state.DISPATCHDATA.wpgf_5,
                    this.state.DISPATCHDATA.wpgf_7, this.state.DISPATCHDATA.wpgf_9,this.state.DISPATCHDATA.wpgf_11,
                    this.state.DISPATCHDATA.wpgf_13, this.state.DISPATCHDATA.wpgf_15, this.state.DISPATCHDATA.wpgf_17,
                    this.state.DISPATCHDATA.wpgf_19,this.state.DISPATCHDATA.wpgf_21,this.state.DISPATCHDATA.wpgf_23],
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
        if (this.state.DISPATCHDATA !== nextState.DISPATCHDATA) {
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
                    <Text style={styles.text}>发电量预测数据</Text>     
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
              <LinearGradient colors={['#0fffff', '#ffffff']} style={styles.gradient1}>
                <View style={{flexDirection:'column',alignItems:'center'}}>
                    <Text style={styles.text}>光伏发电日预测数据(kWh)</Text>     
                </View>
              </LinearGradient>
          </View>
            <View>
            <LineChart
              data={state.data1}
               width={Dimensions.get("window").width/1.05}
               height={220}
               chartConfig={chartConfig}
               style={{
               marginVertical: 8,
               borderRadius: 16,
               marginHorizontal:-25
                }}
                fromZero={true}
           bezier
           />
           <View style={{alignItems:'center',marginBottom:10,marginTop:5}}>
              <LinearGradient colors={['#0fffff', '#ffffff']} style={styles.gradient1}>
                <View style={{flexDirection:'column',alignItems:'center'}}>
                    <Text style={styles.text}>风力发电日预测数据(kWh)</Text>     
                </View>
              </LinearGradient>
            </View>
            <LineChart
              data={state.data2}
               width={Dimensions.get("window").width/1.05}
               height={220}
               chartConfig={chartConfig}
               style={{
               marginVertical: 8,
               borderRadius: 16,
               marginHorizontal:-25
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