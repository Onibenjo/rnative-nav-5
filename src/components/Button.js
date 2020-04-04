import React from 'react';
import {TouchableOpacity, Text, StyleSheet} from 'react-native';

const Button = ({onPress, children, title, style}) => (
  <TouchableOpacity onPress={onPress} style={{...styles.btnStyle, ...style}}>
    <Text style={styles.textStyle}>{title ? title : children}</Text>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  btnStyle: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    marginVertical: 5,
    borderRadius: 6,
    backgroundColor: '#007aff',
    // flex: 1,
    // alignSelf: 'stretch',
  },
  textStyle: {
    color: 'white',
    fontSize: 18,
    alignSelf: 'center',
    fontWeight: '600',
  },
});
export default Button;
