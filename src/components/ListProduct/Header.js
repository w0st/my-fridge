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

const Header = (props) => (
  <View style={styles.container}>
    <Text style={styles.text}>
      Name
    </Text>
    <Text style={styles.text}>
      Category
    </Text>
    <Text style={styles.text}>
      Expires in
    </Text>
  </View>
);

export default Header;