import React, { Component } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Image } from 'react-native';
import { Actions } from 'react-native-router-flux';
import t from 'tcomb-form-native';
import moment from 'moment/src/moment';
import RNFetchBlob from 'react-native-fetch-blob'
import { styles } from './Styles.js';
import { Product } from '../../models/Product';
import { firebaseApp } from '../../settings/Firebase';

const fs = RNFetchBlob.fs
const Blob = RNFetchBlob.polyfill.Blob
window.XMLHttpRequest = RNFetchBlob.polyfill.XMLHttpRequest
window.Blob = Blob

let Form = t.form.Form;
let options = {
  fields: {
    name: {
      placeholder: 'Type the name',
      error: 'Please, insert the name'
    },
    category: {
      placeholder: 'Type the category',
    },
    expiryDate: {
      config: {
        format: (date) => moment(date).format("DD-MM-YYYY")
      },
      error: 'Do you really want to put outdate product!?'
    }
  },
};

export default class AddProduct extends Component {

  constructor(props) {
  	super(props);
  	this.addItem = this.addItem.bind(this);
    this.addPhoto = this.addPhoto.bind(this);
    this.uploadFile = this.uploadFile.bind(this);
    this.getCollection = this.getCollection.bind(this);
    this.collectionPath = 'collection';

    this.state = {
      photo: "https://dummyimage.com/50x50/000000/fff"
    }
  }

  addPhoto(param) {
    this.setState({
      photo: param
    })
  }

  // TODO: Add photo too
  addItem() {
    this.uploadFile();
    var value = this.refs.form.getValue();
    if (value) { // if validation fails, value will be null
      console.log(value); // value here is an instance of Product
      var productKey = firebaseApp.database().ref().child('listOfProducts').push().key;
      var updates = {};
      updates['/listOfProducts/' + productKey] = value;
      firebaseApp.database().ref().update(updates);
      // go to main page
      Actions.pop();
    }
  }

  uploadFile() {
    console.log('uploadFile');
    var PATH_TO_READ = '/storage/emulated/0/DCIM/IMG_20170216_105333.jpg';

    let rnfbURI = RNFetchBlob.wrap(PATH_TO_READ);
    console.log('rnfbURI = ', rnfbURI)
    Blob
      .build(rnfbURI, { type : 'image/png;'})
      .then((blob) => {
        console.log('blog = ', blob)
       // upload image using Firebase SDK
        firebaseApp.storage()
          .ref()
          .child('image.png')
          .put(blob, { contentType : 'image/png' })
          .then((snapshot) => {
            blob.close()
          })
      })
  }

  getCollection() {
    return firebaseApp.database().ref(this.collectionPath).once('value').then( (snapshot) => {
      console.log('snapshot = ', snapshot.val());
    });
  }

  render() {
    return (
      <View style={styles.container}>
        <View>
          <Form
            ref='form'
            type={Product}
            options={options} />
        </View>
      	<View style={{flex: 2, alignItems: 'center'}}>
          <Image
            style={{width: 50, height: 50}}
            source={{uri: this.state.photo }}
          />
          <View style={styles.buttonsBar}>
            <Button
              style={styles.button}
              onPress={Actions.pop}
              title="Cancel"
              accessibilityLabel="Cancel" />
            <Button
              style={styles.button}
              onPress={() => Actions.takePicture(this.addPhoto)}
              title="Take a photo"
              accessibilityLabel="Attach photo"
              />
            <Button
              style={styles.button}
              onPress={this.addItem}
              title="Add"
              accessibilityLabel="Add new item" />
          </View>

        </View>
      </View>
    )
  }
}
