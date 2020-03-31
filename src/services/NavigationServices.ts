import {NavigationActions} from 'react-navigation';

let _navigator: any;

function setTopLevelNavigator(navigatorRef: any) {
    _navigator = navigatorRef;
}

export function navigate(routeName: string, params?: object) {
    _navigator.dispatch(
        NavigationActions.navigate({
            routeName,
            params
        })
    );
}
export function goBack() {
    _navigator.dispatch(NavigationActions.back());
}

export default {
    navigate,
    setTopLevelNavigator,
    goBack
};
