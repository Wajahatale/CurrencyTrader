import React, {FC, useState, useEffect} from 'react';
import {View, Text, StyleSheet, Alert} from 'react-native';
import {app} from './../constants/firebase';
import firebase from 'firebase';
import {Button, Input} from '../components';
import Dropdown from 'react-dropdown';
import {TextInput} from 'react-native-gesture-handler';
// import Select from 'react-select';
import RNSmtpMailer from 'react-native-smtp-mailer';
import Coin from './Coin';
import axios from 'axios';
import Val from './val';

const options = [
  {value: 'usdt', label: 'USDT'},
  {value: 'busd', label: 'BUSD'},
];

const App: FC = props => {
  const [amount, setAmount] = useState<string | null>(null);
  const [currency, setCurrency] = useState<string | null>(null);

  // const [selectedOption, setSelectedOption] = useState<string | null>(null);

  const [user, setUser] = useState<any>(null);
  const [coins, setCoins] = useState([]);
  const [name, setName] = useState<any>(null);
  const [mul, setMul] = useState();


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

  const filteredCoins = coins.filter(coin => coin.name.toLowerCase());

  const bootstrap = () => {
    firebase.auth().onAuthStateChanged(_user => {
      if (_user) {
        setUser(_user.email);
        setName(_user.displayName);
      }
    });
  };

  // const uemail = {user.email} ;
  useEffect(() => {
    bootstrap();
  }, []);

  // type buyProps = {
  //     amount : string ;
  //     currency : string;
  // }

  const sellUSDT = async () => {
    setCurrency('usdt');
    RNSmtpMailer.sendMail({
      mailhost: 'smtp.gmail.com',
      port: '465',
      ssl: true, // optional. if false, then TLS is enabled. Its true by default in android. In iOS TLS/SSL is determined automatically, and this field doesn't affect anything
      username: 'wajahatalih93@gmail.com',
      password: 'trick@treat',
      fromName: 'CurrencyTrader', // optional
      replyTo: 'Client', // optional
      recipients: user,
      bcc: ['imran001122@yandex.com'], // optional
      subject: 'Sale in Progress',
      htmlBody:
        '<h1>Sale requested by:</h1>' +
        user +
        '<p>A request for the sale of </p>' +
        amount +
        currency +
        '<p> has been recieved.</p>',
    })
      .then(success => console.log(success))
      .catch(err => console.log(err));
  };

  const sellBUSD = async () => {
    setCurrency('busd');
    RNSmtpMailer.sendMail({
      mailhost: 'smtp.gmail.com',
      port: '465',
      ssl: true, // optional. if false, then TLS is enabled. Its true by default in android. In iOS TLS/SSL is determined automatically, and this field doesn't affect anything
      username: 'wajahatalih93@gmail.com',
      password: 'trick@treat',
      fromName: 'CurrencyTrader', // optional
      replyTo: 'Client', // optional
      recipients: user,
      bcc: ['imran001122@yandex.com'], // optional
      subject: 'Purchase in Progress',
      htmlBody:
        '<h1>Sale requested by:</h1>' +
        user +
        '<p>A request for the sale of </p>' +
        amount +
        currency +
        '<p> has been recieved.</p>' +
        filteredCoins.map(coin => {
          if (coin.symbol == 'busd') {

                    coins.price;

        }) +
        '',
    })
      .then(success => console.log(success))
      .catch(err => console.log(err));
  };

  return (
    <View style={styles.container}>
      <Text>Here you'll be Selling the crypto currency</Text>
      <TextInput
        style={styles.text}
        keyboardType="numeric"
        placeholder="Enter the amount you wish to sell"
        onChangeText={text => setAmount(text)}
      />

      {/* <TextInput style={styles.text} placeholder="Enter currency code e.g usdt" onChangeText={(text) => setCurrency(text)}/> */}
      <Button title="Sell USDT" onPress={sellUSDT} />
      <Text>
        {filteredCoins.map(coin => {
          if (coin.symbol == 'usdt') {
            return <Val price={coin.current_price} />;
          }
        })}
      </Text>

      <Button title="Sell BUSD" onPress={sellBUSD} />

        {filteredCoins.map(coin => {
          if (coin.symbol == 'busd') {
            return <Val price={coin.current_price} />;
          }
        })}
      </Text>


            <Text>{user}</Text>

      {/* <Select 
                defaultValue={selectedOption}
                onChange={setSelectedOption}
                options={options}
            /> */}
      {/* <Dropdown options={['usdt','busd']} onChange={onSelect} placeholder="Select a Currency" /> */}
    </View>
  );
};;
//value={defaultOption}
export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    borderRadius: 2,
    borderColor: 'black',
  },
});
;
