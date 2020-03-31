import {createStackNavigator} from 'react-navigation-stack';
import HomeScreen from '../modules/home/HomeScreen';
import CartScreen from "../modules/cart/CartScreen";
import ItemScreen from '../modules/home/ItemScreen'
import React from 'react';


const RouteConfigs = {
    HomeScreen,
    CartScreen,
    ItemScreen
};

const AppNavigatorConfig = {
    initialRouteName: 'HomeScreen',
    headerMode: 'none'
};

// @ts-ignore
const AppNavigator = createStackNavigator(RouteConfigs, AppNavigatorConfig);

export default AppNavigator;
