import React, { Component } from 'react'
import { Text, StyleSheet, View } from 'react-native'
//import { Card, ListItem, Button, Icon } from 'react-native-elements';
import { Card } from '@rneui/themed';

export default class About extends Component {
  render() {
    return (
      <View>
        <Card>
        <Text style={fontSize=20}>          微电网综合能源管控系统能够对微电网的运行进行远程监测与控制，
          以及预测与智能调度，微电网手机移动端APP作为综合能源管控系统的一部分，
          可作为大屏端和电脑浏览器端综合管控平台的补充，重点应用于移动办公场合，
          适用于对数据进行快速查询，对信息进行快速浏览和填报。 </Text>
          </Card>
      </View>
    )
  }
}

const styles = StyleSheet.create({})
