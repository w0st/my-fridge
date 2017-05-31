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
  async addItem() {
    let uploadedFileUrl = await this.uploadFile();
    let value = this.refs.form.getValue();
    if (value) { // if validation fails, value will be null
      let productKey = value.name;
      let updates = {};
      updates['/listOfProducts/' + productKey] = { ...value, photoURL: uploadedFileUrl };
      firebaseApp.database().ref().update(updates);
      // go to main page
      Actions.pop();
    }
  }

  async uploadFile() {
    var PATH_TO_READ = this.state.photo;
    var NAME_OF_THE_PICTURE = this.state.photo.split('/').slice(-1)[0];

    let rnfbURI = RNFetchBlob.wrap(PATH_TO_READ);
    console.log('rnfbURI = ', rnfbURI)
    let blob = await Blob.build(rnfbURI, { type : 'image/png;'})
    console.log('blob = ', blob)
   // upload image using Firebase SDK
    let stored = await firebaseApp.storage()
      .ref()
      .child(NAME_OF_THE_PICTURE)
      .put(blob, { contentType : 'image/png' });
    blob.close();
    uploadedFileUrl = stored.a.downloadURLs[0];
    return uploadedFileUrl;
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
