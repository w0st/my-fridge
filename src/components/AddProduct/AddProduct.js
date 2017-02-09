import React, { Component } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import { Actions } from 'react-native-router-flux';
import t from 'tcomb-form-native';
import moment from 'moment/src/moment';
import { styles } from './Styles.js';
import { Product } from '../../models/Product';
import { firebaseApp } from '../../settings/Firebase';

let Form = t.form.Form;
let options = {
  fields: {
    name: {
      placeholder: 'Type the name',
      error: 'Please, insert the name'
    },
    category: {
      placeholder: 'Type the category'
    },
    expiryDate: {
      config: {
        format: (date) => moment(date).format("DD-MM-YYYY")
      }
    }
  },
};

export default class AddProduct extends Component {

  constructor(props) {
  	super(props);
  	this.addItem = this.addItem.bind(this);
    this.getCollection = this.getCollection.bind(this);
    this.collectionPath = 'collection';
  }

  addItem() {
    var value = this.refs.form.getValue();
    if (value) { // if validation fails, value will be null
      console.log(value); // value here is an instance of Person
      var productKey = firebaseApp.database().ref().child('listOfProducts').push().key;
      var updates = {};
      updates['/listOfProducts/' + productKey] = value;
      firebaseApp.database().ref().update(updates);
      // go to main page
      Actions.pop();
    }
  }

  getCollection() {
    return firebaseApp.database().ref(this.collectionPath).once('value').then( (snapshot) => {
      console.log('snapshot = ', snapshot.val());
    });
  }

  render() {
    return (
      <View style={styles.container}>
        <Form
          ref='form'
          styles={styles.form}
          type={Product}
          options={options} />
      	<Button 
      		onPress={this.addItem}
          styles={styles.buttons}
          title="Add" 
          accessibilityLabel="Add new item" />
      </View>
    )
  }
}
