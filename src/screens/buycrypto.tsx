import React, {FC, useState, useEffect} from 'react';
import {View, Text, StyleSheet, Alert} from 'react-native';
import {app} from './../constants/firebase';
import firebase from 'firebase';
import {Button, Input} from '../components';
import Dropdown from 'react-dropdown';
import {TextInput} from 'react-native-gesture-handler';
import RNSmtpMailer from 'react-native-smtp-mailer';
import Coin from './Coin';
import axios from 'axios';
import Val from './val';
// import DropDownPicker from 'react-native-dropdownn-picker';
import {Picker} from '@react-native-picker/picker';

const App: FC = props => {
  const [amount, setAmount] = useState<string | null>(null);
  const [currency, setCurrency] = useState<string | null>(null);

  const [selectedValue, setSelectedValue] = useState('usdt');
  // const [selectedOption, setSelectedOption] = useState<string | null>(null);

  const [user, setUser] = useState<any>(null);
  const [coins, setCoins] = useState([]);
  const [name, setName] = useState<any>(null);

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

  useEffect(() => {
    bootstrap();
  }, []);

  const buyCurrency = async () => {
    if (amount != null || currency == 'usdt' || currency == 'busd') {
    }
  };

  const buyUSDT = async () => {
    setCurrency('usdt');
    Alert.alert(
      'Are you sure you want to buy ' + amount + ' USDT ?',
      '',
      [
        {
          text: 'Go ahead',
          onPress: () => {
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
                '<h1>Purchase requested by:</h1>' +
                user +
                '<p>A request for the purchase of </p>' +
                amount +
                currency +
                '<p> has been recieved.</p>',
            })
              .then(success => console.log(success))
              .catch(err => console.log(err));
          },
        },
        {
          text: 'No',
          onPress: () => {},
        },
      ],
      {cancelable: false},
    );

    // RNSmtpMailer.sendMail({
    //     mailhost: "smtp.gmail.com",
    //     port: "465",
    //     ssl: true, // optional. if false, then TLS is enabled. Its true by default in android. In iOS TLS/SSL is determined automatically, and this field doesn't affect anything
    //     username: "wajahatalih93@gmail.com",
    //     password: "trick@treat",
    //     fromName: "CurrencyTrader", // optional
    //     replyTo: "Client", // optional
    //     recipients: user,
    //     bcc: ["imran001122@yandex.com"], // optional
    //     subject: "Purchase in Progress",
    //     htmlBody: "<h1>Purchase requested by:</h1>"+user+"<p>A request for the purchase of </p>"+amount+currency+"<p> has been recieved. Rate at the time of request :</p>",
    //   })
    //     .then(success => console.log(success))
    //     .catch(err => console.log(err));
  };

  const buyBUSD = async () => {
    setCurrency('busd');
    if (amount == null) {
      Alert.alert('Enter the amount first');
    } else {
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
          '<h1>Purchase requested by:</h1>' +
          user +
          '<p>A request for the purchase of </p>' +
          amount +
          currency +
          '<p> has been recieved.</p>',
      })
        .then(success =>
          Alert.alert('Purchase request for ' + amount + ' BUSD successful'),
        )
        .catch(err => console.log(err));
    }
    // Alert.alert(
    //     'Are you sure you want to Buy '+amount+' BUSD ?',
    //     '',
    //     [
    //       {
    //         text: 'Yes',
    //         onPress: () => {RNSmtpMailer.sendMail({
    //             mailhost: "smtp.gmail.com",
    //             port: "465",
    //             ssl: true, // optional. if false, then TLS is enabled. Its true by default in android. In iOS TLS/SSL is determined automatically, and this field doesn't affect anything
    //             username: "wajahatalih93@gmail.com",
    //             password: "trick@treat",
    //             fromName: "CurrencyTrader", // optional
    //             replyTo: "Client", // optional
    //             recipients: user,
    //             bcc: ["imran001122@yandex.com"], // optional
    //             subject: "Purchase in Progress",
    //             htmlBody: "<h1>Purchase requested by:</h1>"+user+"<p>A request for the purchase of </p>"+amount+currency+"<p> has been recieved.</p>",
    //           })
    //             .then(success => console.log(success))
    //             .catch(err => console.log(err));}
    //       },
    //       {
    //         text: 'No',
    //         onPress: () => {}
    //       }
    //     ],
    //     { cancelable: false }
    //   );
    // setCurrency('busd')
    // RNSmtpMailer.sendMail({
    //     mailhost: "smtp.gmail.com",
    //     port: "465",
    //     ssl: true, // optional. if false, then TLS is enabled. Its true by default in android. In iOS TLS/SSL is determined automatically, and this field doesn't affect anything
    //     username: "wajahatalih93@gmail.com",
    //     password: "trick@treat",
    //     fromName: "CurrencyTrader", // optional
    //     replyTo: "Client", // optional
    //     recipients: user,
    //     bcc: ["imran001122@yandex.com"], // optional
    //     subject: "Purchase in Progress",
    //     htmlBody: "<h1>Purchase requested by:</h1>"+user+"<p>A request for the purchase of </p>"+amount+currency+"<p> has been recieved.</p>"+filteredCoins.map(coin => {
    //         if(coin.symbol=="busd"){

    //             coins.price

    //         }
    //         })+"",
    //   })
    //     .then(success => console.log(success))
    //     .catch(err => console.log(err));
  };

  return (
    <View style={styles.container}>
      <Text>Here you'll be buying the crypto currency</Text>
      <TextInput
        style={styles.texts}
        keyboardType="numeric"
        placeholder="Enter the amount you wish to buy"
        onChangeText={text => setAmount(text)}
      />

      {/* <TextInput style={styles.text} placeholder="Enter currency code e.g usdt" onChangeText={(text) => setCurrency(text).toLowerCase()}/> */}

      {/* <DropDownPicker
                items={[
                    {label: 'USDT', value: 'usdt', },
                    {label: 'BUSD', value: 'busd', },
                ]}
                defaultValue={'usdt'}
                containerStyle={{height: 40}}
                style={{backgroundColor: '#fafafa'}}
                itemStyle={{
                    justifyContent: 'flex-start'
                }}
                dropDownStyle={{backgroundColor: '#fafafa'}}
                onChangeItem={item => setCurrency(item)}
            /> */}
      {/* console.log({currency}) */}

      <Text>Choose now:</Text>

      <Picker
        selectedValue={selectedValue}
        style={{height: 50, width: 150}}
        onValueChange={(itemValue, itemIndex) => setSelectedValue(itemValue)}>
        <Picker.Item label="USDT" value="usdt" />
        <Picker.Item label="BUSD" value="busd" />
      </Picker>

      {/* <Button title="Buy USDT" onPress={buyUSDT}/>

            <Button title="Buy USDT" onPress={()=>{ amount == null? Alert.alert('Enter the amount first') : buyUSDT}} />
            <Text>{filteredCoins.map(coin => {
                if(coin.symbol=="usdt"){
                    return (
                        <Val price={coin.current_price} />
                    )
                }
            })}</Text>

            <Button title="Buy BUSD" onPress={buyBUSD} />

            <Text>{filteredCoins.map(coin => {
                if(coin.symbol=="busd"){
                    return (
                        <Val price={coin.current_price} />
                    )
                }
            })}</Text> */}

      {/* <Text>{user}</Text> */}

      {/* <Select
                defaultValue={selectedOption}
                onChange={setSelectedOption}
                options={options}
            /> */}
      {/* <Dropdown options={['usdt','busd']} onChange={onSelect} placeholder="Select a Currency" /> */}
    </View>
  );
};
//value={defaultOption}
export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  texts: {
    borderRadius: 2,
    color: '#000000',
  },
});
