import React, { Component } from 'react';
import { View, Text, Button, ListView, StyleSheet } from 'react-native';
import { Actions } from 'react-native-router-flux';
import { styles } from './Styles.js';
import Row from './Row.js';
import { firebaseApp } from '../../settings/Firebase';

export default class List extends Component {
  constructor(props) {
    super(props);
    const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    this.state = {
      dataSource: ds.cloneWithRows([])
    };
    this.fetchList = this.fetchList.bind(this);
    this.fetchList();
  }

  fetchList() {
    var that = this;
    var listRef = firebaseApp.database().ref("listOfProducts");
    listRef.on('value', (snapshot) => {
      var collection = [];
      snapshot.forEach( (childSnapshot) => {
        collection.push(childSnapshot.val());
        console.log('collection = ', collection);
        that.setState({dataSource: that.state.dataSource.cloneWithRows(collection)});
      })
    });
  }

  render() {
    return (
      <View style={styles.container}>
      	<View style={styles.list}>
          <Text style={styles.listCaption}>List of products</Text>
          <ListView
                    dataSource={this.state.dataSource}
                    renderRow={(rowData) => <Row {...rowData} />} />
        </View>
        <Button onPress={Actions.add}
                style={styles.buttons}
                title="Add item" 
                accessibilityLabel="Add item to the fridge" />
      </View>
    )
  }
}
