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
import {getgreenusedata} from '../../api'
import { Table, TableWrapper, Row, Rows, Col, Cols, Cell } from 'react-native-reanimated-table';
import { aesDecrypt } from '../../aesDecrpt'; 

export default class ExampleTwo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      //tableHead: ['', '风电', '光伏', '单位'],
      tableTitle: ['峰时段用电量(kWh)','峰时段电价(元/kWh)','平时段用电量(kWh)','平时段电价(元/kWh)',
      '谷时段用电量(kWh)','谷时段电价(元/kWh)','日用电量(kWh)','日用电费用(元)'],
      tableData: [
        ['---'],['---'],['---'],['---'],
        ['---'],['---'],['---'],['---'] 
      ],
      GREENUSEDATA:{},
      GREENUSEDATA_0:{},
      GREENUSEDATA_1:{},
     data1 : {
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
        legend: ["计划曲线","实际曲线"] // optional
      },
    }
  }
  componentDidMount(){
    this.timer = setInterval(
      () => {
        getgreenusedata().then(res=>{
        //  console.log(res[0])
      //  console.log(res)
        this.setState({
          GREENUSEDATA_0 : aesDecrypt(res),            //aes解密
          
        })
        this.setState({
          GREENUSEDATA_1 :JSON.parse(this.state.GREENUSEDATA_0)       //转化为json
        })
        this.setState({
          GREENUSEDATA: this.state.GREENUSEDATA_1[0]
        })
        
      //  console.log(this.state.GREENUSEDATA)
          /*this.setState({
            GREENUSEDATA:res[0]
          })*/
          this.setState({
            tableData: [
              [this.state.GREENUSEDATA.peak_consumption],[this.state.GREENUSEDATA.peak_price],
              [this.state.GREENUSEDATA.normal_consumption],[this.state.GREENUSEDATA.normal_price],
              [this.state.GREENUSEDATA.valley_consumption],[this.state.GREENUSEDATA.valley_price],
              [this.state.GREENUSEDATA.daily_consumption],[this.state.GREENUSEDATA.daily_cost] 
            ],
            data1 : {
              labels: ["00:00","04:00", "08:00", "12:00", "16:00", "20:00", "24:00"],
              datasets: [
                {
                  data: [this.state.GREENUSEDATA.deccplan_0,this.state.GREENUSEDATA.deccplan_4,this.state.GREENUSEDATA.deccplan_8,
                    this.state.GREENUSEDATA.deccplan_12,this.state.GREENUSEDATA.deccplan_16,this.state.GREENUSEDATA.deccplan_20,
                    this.state.GREENUSEDATA.deccplan_24],
                  color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`, // optional
                  strokeWidth: 1 // optional
                },
                {
                  data: [this.state.GREENUSEDATA.deccactual_0,this.state.GREENUSEDATA.deccactual_4,this.state.GREENUSEDATA.deccactual_8,
                    this.state.GREENUSEDATA.deccactual_12,this.state.GREENUSEDATA.deccactual_16,0,0],
                  color: (opacity = 1) => `rgba(0, 0, 255, ${opacity})`, // optional
                  strokeWidth: 1 // optional
                }
              ],
              legend: ["计划曲线","实际曲线"] // optional
            },
          })
        })
      },
      1000
      );}
      shouldComponentUpdate(nextProps, nextState) {
        if (this.state. GREENUSEDATA !== nextState. GREENUSEDATA) {
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
                    <Text style={styles.text}>今日用电成本</Text>     
                </View>
              </LinearGradient>
            </View>
        <Table borderStyle={{borderWidth: 0.8}}>
         
          <TableWrapper style={styles.wrapper} 	>
            <Col data={state.tableTitle}  style={styles.title} heightArr={[40,40]} textStyle={styles.text}/>
            <Rows data={state.tableData} flexArr={[1]} style={styles.row} textStyle={styles.text}/>
          </TableWrapper>
        </Table>

        

        <View style={{alignItems:'center',marginBottom:10,marginTop:5}}>
              <LinearGradient colors={['#0fffff', '#ffffff']} style={styles.gradient1}>
                <View style={{flexDirection:'column',alignItems:'center'}}>
                    <Text style={styles.text}>当日用电曲线(kWh)</Text>     
                </View>
              </LinearGradient>
          </View>
            <View>
            <LineChart
              data={state.data1}
               width={Dimensions.get("window").width/1.1}
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
/*
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
  legend: ["计划曲线","实际曲线"] // optional
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