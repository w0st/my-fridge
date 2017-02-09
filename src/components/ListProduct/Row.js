import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import moment from 'moment/src/moment';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  text: {
    marginLeft: 12,
    fontSize: 16,
  }
});

const Row = (props) => (
  <View style={styles.container}>
    <Text style={styles.text}>
      {`${props.name}`}
    </Text>
    <Text>
      {`${props.category}`}
    </Text>
    <Text>
      {`${moment(props.expiryDate).format("DD-MM-YYYY")}`}
    </Text>
  </View>
);

export default Row;