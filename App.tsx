import React, {useEffect} from 'react';
import 'react-native-gesture-handler';
import {useNetInfo} from '@react-native-community/netinfo';
import {useDispatch, useSelector} from 'react-redux';
import {AppDispatch} from './src/services/store';
import NavigationService from './src/services/NavigationServices';
import Navigator from './src/navigations';
import {hideModal, showModal} from './src/modules/app/redux/appSlice';
import PopupModal from './src/components/PopupModal';
import {RootState} from './src/services/rootReducer';
import SplashScreen from 'react-native-splash-screen';
import Toast from 'react-native-easy-toast';
import ToastService from './src/services/ToastService';
import { observer, Provider } from "mobx-react"
import { ItemStore } from './src/logic/itemsStore'
import {SafeAreaView} from 'react-native'

export const itemStore = new ItemStore()

const App = () => {
    const isModalVisible = useSelector((state: RootState) => state.app.isModalVisible);
    const dispatch: AppDispatch = useDispatch();
    const {isConnected} = useNetInfo();

    useEffect(() => {
        SplashScreen.hide();
        itemStore.init()
    }, []);



    useEffect(() => {
        if (!isConnected) {
            dispatch(showModal());
        } else {
            dispatch(hideModal());
        }
    }, [isConnected]);

    return (
        <>
            {/*<PersistGate loading={null} persistor={persistor}>*/}
            <Provider itemStore={itemStore}>
            <Toast
                ref="toast"
                style={{backgroundColor: 'red'}}
                position="top"
                positionValue={290}
                fadeInDuration={750}
                fadeOutDuration={1000}
                opacity={0.8}
                textStyle={{color: 'white'}}
                ref={ToastService.setTopLevelToast}
            />
            <PopupModal
                onModalClosed={() => {
                    dispatch(hideModal());
                }}
                visible={isModalVisible}
            />
            <SafeAreaView style={{width: '100%', height: '100%'}}>
               <Navigator ref={NavigationService.setTopLevelNavigator} /> 
            </SafeAreaView>
            </Provider>
            {/*</PersistGate>*/}
        </>
    );
};

export default App;
