import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
  },
  list: {
    paddingTop: 60,
  	flex: 5,
    flexDirection: 'column',
    backgroundColor: '#E3E8FF',
  },
  item: {
    color: '#000000',
    textAlign: 'center',
  },
  buttons: {
  	flex: 1,
    color: "#4566FF"
  },
  separator: {
    flex: 1,
    height: StyleSheet.hairlineWidth,
    backgroundColor: '#8E8E8E',
  },
});


