import React, {FC, useEffect, useState} from 'react';
import {View, Text, StyleSheet, Alert} from 'react-native';
import {app} from '../constants/firebase';
import firebase from 'firebase';
import {Button, Input} from '../components';
import BuyCrypto from '../screens/buycrypto';
import {NavigationContainer} from '@react-navigation/native';
import axios from 'axios';
import RNRestart from 'react-native-restart';
import Coin from './Coin';

const App: FC = props => {
  const [msg, setMsg] = useState<string | null>(null);

  const [coins, setCoins] = useState([]);
  // const [search, setSearch] = useState('')

  const signOut = () => {
    app.auth().signOut();
    RNRestart.Restart();
  };

  useEffect(() => {
    axios
      .get(
        'https://api.coingecko.com/api/v3/coins/markets?vs_currency=pkr&order=market_cap_desc&per_page=100&page=1&sparkline=false&price_change_percentage=1h',
      )
      .then(res => {
        console.log(res);
        setCoins(res.data);
      })
      .catch(error => console.log(error));
  }, []);

  // const handleChange = e => {
  //     setSearch(e.target.value)
  // }

  const filteredCoins = coins.filter(coin => coin.name.toLowerCase());

  const post = async () => {
    // let postssRef = app.database().ref("posts");

    // if(msg){
    const data = {
      msg,
      timeStamp: JSON.stringify(Date.now()),
      approved: false,
    };
    // Alert.alert('Post');
    Alert.alert('', data.timeStamp);
    try {
      // postssRef.push(data);
      // Alert.alert('Tried', JSON.stringify(Date.now()));
      //await app.firestore().collection('posts').add(data);
    } catch (err) {
      Alert.alert('failed');
      console.log('error', err);
    }

    // } else {
    //     Alert.alert('Missing Fields')
    // }
  };

  return (
    <View style={styles.container}>
      <Text>Welcome to the Crypto Trader</Text>
      <Text>Current Rates :</Text>
      <Text>
        {filteredCoins.map(coin => {
          if (coin.symbol == 'usdt' || coin.symbol == 'busd') {
            return (
              <Coin
                name={coin.name}
                image={coin.image}
                symbol={coin.symbol}
                volume={coin.market_cap}
                price={coin.current_price}
                price_change_percentage={
                  coins.price_change_percentage_1h_in_currency
                }
              />
            );
          }
        })}
      </Text>
      <View>
        {/* <Input placeholder="Write Something Here" onChangeText={(text) => setMsg(text)}/> */}
        <Button
          title="Buy Crypto"
          onPress={() => props.navigation.navigate('buycrypto')}
        />
        <Button
          title="Sell Crypto"
          onPress={() => props.navigation.navigate('sellcrypto')}
        />
      </View>
      <Button title="Sign Out" onPress={signOut} />
    </View>
  );
};

export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
