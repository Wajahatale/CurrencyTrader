import React from 'react';
import {View, Text, StyleSheet, Alert} from 'react-native';

type CoinProps = {
  price: number;
};

const val = ({price}: CoinProps) => {
  return (
    <View>
      <Text>{price}</Text>
    </View>
  );
};
export default val;
