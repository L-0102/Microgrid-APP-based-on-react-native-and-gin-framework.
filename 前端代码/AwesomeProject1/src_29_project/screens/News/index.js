import { Table, TableWrapper, Row, Rows, Col, Cols, Cell } from 'react-native-reanimated-table';
import {getalarmdata} from '../../api';
import React, { Component } from 'react';
import { StyleSheet, View } from 'react-native';
//import { Table, TableWrapper, Row, Rows, Col } from 'react-native-table-component';

export default class ExampleTwo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tableHead: ['', '设备', '故障类型', '故障级别'],
      tableTitle: ['1', '2', '3', '4','5','6'],
      tableData: [
        ['---', '---', '---'],
        ['---', '---', '---'],
        ['---', '---', '---'],
        ['---', '---', '---'],
        ['---', '---', '---'],
        ['---', '---', '---']
      ],
      ALARMDATA:{}
    }
  }

  componentDidMount(){
    this.timer = setInterval(
      () => {
        getalarmdata().then(res=>{
         // console.log(res.list)
          //console.log(res)
          this.setState({
            ALARMDATA:res.list
          })
          /*for (let i = 0; i < this.state.ALARMDATA.total; i += 1) {
                this.setState({
                  tableData[0]:this.state.ALARMDATA.id
                }
          
          }*/
         // for (let i = 0; i < this.state.ALARMDATA.total; i += 1) {
         this.setState({
            tableData:[
              [this.state.ALARMDATA[0].device,this.state.ALARMDATA[0].alarm_type ,this.state.ALARMDATA[0].alarm_level],
              [this.state.ALARMDATA[1].device,this.state.ALARMDATA[1].alarm_type ,this.state.ALARMDATA[1].alarm_level],
              [this.state.ALARMDATA[2].device,this.state.ALARMDATA[2].alarm_type ,this.state.ALARMDATA[2].alarm_level],
              [this.state.ALARMDATA[3].device,this.state.ALARMDATA[3].alarm_type ,this.state.ALARMDATA[3].alarm_level],
              [this.state.ALARMDATA[4].device,this.state.ALARMDATA[4].alarm_type ,this.state.ALARMDATA[4].alarm_level],
        [this.state.ALARMDATA[5].device,this.state.ALARMDATA[5].alarm_type ,this.state.ALARMDATA[5].alarm_level]
            ],
          })
      //  }
        })
      },
      500
      );}
      shouldComponentUpdate(nextProps, nextState) {
        if (this.state. ALARMDATA !== nextState. ALARMDATA) {
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
      <View style={styles.container}>
        <Table borderStyle={{borderWidth: 1}}>
          <Row data={state.tableHead} flexArr={[1, 2, 2, 2]} style={styles.head} textStyle={styles.text}/>
          <TableWrapper style={styles.wrapper}>
            <Col data={state.tableTitle} style={styles.title} heightArr={[38,38]} textStyle={styles.text}/>
            <Rows data={state.tableData} flexArr={[2, 2, 2]} style={styles.row} textStyle={styles.text}/>
          </TableWrapper>
        </Table>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, paddingTop: 30, backgroundColor: '#fff' },
  head: {  height: 40,  backgroundColor: '#f1f8ff'  },
  wrapper: { flexDirection: 'row' },
  title: { flex: 1, backgroundColor: '#f6f8fa' },
  row: {  height:38  },
  text: { textAlign: 'center' }
});
