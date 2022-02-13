import React from 'react';
import { View, Text, StyleSheet, Alert } from 'react-native';

type CoinProps = {
    name: string;
    image: string;
    symbol: string;
    price: string;
    volume: string;
    price_change_percentage: string;

  };

const Coin = ({ name, image, symbol, price, volume, price_change_percentage}: CoinProps) => {
    return(
        <View>
            <Text>{name}</Text>
            <Text>{symbol}</Text>
            <Text>PKR {price}</Text>
            <Text>Volume: {volume.toLocaleString()} </Text>
            <Text>{price_change_percentage}</Text>
        </View>
    )
}
export default Coin;