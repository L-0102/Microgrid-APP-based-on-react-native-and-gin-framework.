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
import {getstoragemanagedata} from '../../api';
import { Table, TableWrapper, Row, Rows, Col, Cols, Cell } from 'react-native-reanimated-table';
import { aesDecrypt } from '../../aesDecrpt'; 

export default class ExampleTwo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      //tableHead: ['', '风电', '光伏', '单位'],
      tableTitle1: ['上月光伏储能(kWh)','上月风电储能(kWh)','本月光伏储能(kWh)',
      '本月风电储能(kWh)','昨日光伏储能(kWh)',
      '昨日风电储能(kWh)','本月总储能(kWh)'],
      tableData1: [
        ['---'],['---'],['---'] ,['---'],['---'],['---'],['---']
      ],
      STORAGEDATA:{},
      STORAGEDATA_0:{},
      STORAGEDATA_1:{},
      data : {
        labels: ["2022-01", "2022-03", "2022-05", "2022-07", "2022-09", "2022-11",""],
        datasets: [
          {
            data: [20, 45, 28, 80, 99, 43],
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
        legend: ["风力储能曲线","光伏储能曲线"]
      },
    }
  }
  componentDidMount(){
    this.timer = setInterval(
      () => {
        getstoragemanagedata().then(res=>{
        //  console.log(res[0])
         //console.log(res)
         this.setState({
          STORAGEDATA_0 : aesDecrypt(res),            //aes解密
          
        })
        this.setState({
          STORAGEDATA_1 :JSON.parse(this.state.STORAGEDATA_0)       //转化为json
        })
        this.setState({
          STORAGEDATA : this.state.STORAGEDATA_1[0]
        })
        
        //console.log(this.state.STORAGEDATA_1)
          /*this.setState({
            STORAGEDATA:res[0]
          })*/
          this.setState({      
        tableTitle1: ['上月光伏储能(kWh)','上月风电储能(kWh)','本月光伏储能(kWh)',
      '本月风电储能(kWh)','昨日光伏储能(kWh)',
      '昨日风电储能(kWh)','本月总储能(kWh)'],
       tableData1: [
        [this.state.STORAGEDATA.pes_last_month],[this.state.STORAGEDATA.wes_last_month],[this.state.STORAGEDATA.pes_this_month] ,
        [this.state.STORAGEDATA.wes_this_month],[this.state.STORAGEDATA.pes_yesterday],[this.state.STORAGEDATA.wes_yesterday],
        [this.state.STORAGEDATA.mtes]
      ],
      
      data : {
        labels: ["2022-01", "2022-03", "2022-05", "2022-07", "2022-09", "2022-11",""],
        datasets: [
          {
            data: [this.state.STORAGEDATA.mesd_1, this.state.STORAGEDATA.mesd_3, this.state.STORAGEDATA.mesd_5,
              this.state.STORAGEDATA.mesd_7,this.state.STORAGEDATA.mesd_9, this.state.STORAGEDATA.mesd_11,],
            color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`, // optional
            strokeWidth: 1 // optional
          }
        ]
      },
      data1 :{
        labels: ["00:00","04:00", "08:00", "12:00", "16:00", "20:00", "24:00"],
        datasets: [
          {
            data: [this.state.STORAGEDATA.stwes_0,this.state.STORAGEDATA.stwes_4,this.state.STORAGEDATA.stwes_8,
              this.state.STORAGEDATA.stwes_12,this.state.STORAGEDATA.stwes_16,0,0],
            color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`, // optional
            strokeWidth: 1 // optional
          },
          {
            data: [this.state.STORAGEDATA.stpes_0,this.state.STORAGEDATA.stpes_4,this.state.STORAGEDATA.stpes_8,
              this.state.STORAGEDATA.stpes_12,this.state.STORAGEDATA.stpes_16,0,0],
            color: (opacity = 1) => `rgba(0, 0, 255, ${opacity})`, // optional
            strokeWidth: 1 // optional
          },
        ],
        legend: ["风力储能曲线","光伏储能曲线"] // optional
      },
          })
        })
      },
      1000
      );}
      shouldComponentUpdate(nextProps, nextState) {
        if (this.state. STORAGEDATA !== nextState. STORAGEDATA) {
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
           <View style={{alignItems:'center',marginBottom:10,marginTop:5}}>
              <LinearGradient colors={['#0fffff', '#ffffff']} style={styles.gradient}>
                <View style={{flexDirection:'column',alignItems:'center'}}>
                    <Text style={styles.text}>风光储能数据</Text>     
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
                    <Text style={styles.text}>短期储能数据(kWh)</Text>     
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
               marginHorizontal:-30
                }}
              /*  yAxisSuffix={"kW/h"}
                yLabelsOffset={0}*/
                fromZero={true}
           bezier
           />
           </View>
           <View style={{alignItems:'center',marginBottom:10,marginTop:5}}>
              <LinearGradient colors={['#0fffff', '#ffffff']} style={styles.gradient1}>
                <View style={{flexDirection:'column',alignItems:'center'}}>
                    <Text style={styles.text}>月度储能数据(kWh)</Text>     
                </View>
              </LinearGradient>
            </View>
            <BarChart
              style={graphStyle}
              data={state.data}
              width={Dimensions.get('window').width/1.1}
              height={220}
             // yAxisLabel="kW/h"
              chartConfig={chartConfig}
              verticalLabelRotation={20}
              //yAxisSuffix={"kW/h"}
               // yLabelsOffset={0}
              fromZero={true}
            />
       
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