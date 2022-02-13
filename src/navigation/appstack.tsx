import React, {FC} from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {Home, Dashboard, BuyCrypto, SellCrypto} from '../screens';

const {Navigator, Screen} = createStackNavigator();
const AppStack: FC = () => {
  return (
    <Navigator screenOptions={{headerShown: false}}>
      <Screen name="home" component={Home} />
      <Screen name="dashboard" component={Dashboard} />
      <Screen name="buycrypto" component={BuyCrypto} />
      <Screen name="sellcrypto" component={SellCrypto} />
    </Navigator>
  );
};

export default AppStack;
