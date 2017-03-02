/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View
} from 'react-native';
import { Router, Scene } from 'react-native-router-flux';
import ListProduct from './src/components/ListProduct/ListProduct';
import AddProduct from './src/components/AddProduct/AddProduct';
import TakePicture from './src/components/TakePicture/TakePicture';
import { firebaseApp } from './src/settings/Firebase';

export default class MyFridge extends Component {
  constructor(props) {
    super(props);
    this.login('wojtek@example.com', 'password');
  }

  async login(email, pass) {
    try {
        await firebaseApp.auth()
            .signInWithEmailAndPassword(email, pass);

        console.log("Logged In!");
    } catch (error) {
        console.log(error.toString())
    }
  }

  render() {
    return (
      <Router>
        <Scene key="root">
          <Scene key="list" component={ListProduct} title="My Fridge" initial={true} />
          <Scene key="add" component={AddProduct} title="Add Product" />
          <Scene key="takePicture" component={TakePicture} title="Take a picture" />
        </Scene>
      </Router>
    );
  }
}



AppRegistry.registerComponent('MyFridge', () => MyFridge);
