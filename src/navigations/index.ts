import {createAppContainer, createSwitchNavigator} from 'react-navigation';
import AuthNavigator from './AuthNavigator';
import AppNavigator from './AppNavigator';

const RootNavigator = createSwitchNavigator({
    Auth:AuthNavigator,
    App: AppNavigator
});

export default createAppContainer(RootNavigator);
