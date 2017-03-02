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

const expiryIn = (date) => {
  days = moment(date).diff(moment().startOf('day'), 'days')
  return days < 0 ? 'outdate' : days + ' days'
}

const Row = (props) => (
  <View style={styles.container}>
    <Text style={styles.text}>
      {`${props.name}`}
    </Text>
    <Text style={styles.text}>
      {`${props.category ? props.category : ''}`}
    </Text>
    <Text style={styles.text}>
      {`${expiryIn(props.expiryDate)}`}
    </Text>
  </View>
);

export default Row;
