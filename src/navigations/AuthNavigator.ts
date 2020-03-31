import {createStackNavigator} from 'react-navigation-stack';
import LoginScreen from '../modules/auth/LoginScreen';

const RouteConfigs = {
    LoginScreen
};
const AuthNavigatorConfig = {
    initialRouteName: 'LoginScreen',
    header: null,
    headerMode: 'none'
};

// @ts-ignore
const AuthNavigator = createStackNavigator(RouteConfigs, AuthNavigatorConfig);

export default AuthNavigator;
