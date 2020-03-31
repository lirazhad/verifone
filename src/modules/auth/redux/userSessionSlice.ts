import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {AppDispatch, AppThunk} from '../../../services/store';
import * as API from '../../../services/APIGateway';
import NavigationService from '../../../services/NavigationServices';
import {setJwtToken, removeJwtToken} from '../../../services/APIGateway';
import ToastService from "../../../services/ToastService";
import SplashScreen from "react-native-splash-screen";
import AsyncStorage from '@react-native-community/async-storage';



export interface InitialState {
    isRestoringSession: boolean;
    isSigningUp: boolean;
    user: null | User;

}

const initialState: InitialState = {
    isRestoringSession: true,
    isSigningUp: false,
    user: null
};

const userSession = createSlice({
    name: 'user',
    initialState,
    reducers: {
        signInAttempt(state) {
            state.isSigningUp = true;
        },
        signInSuccess(state, action: PayloadAction<User>) {
            state.isSigningUp = false;
            state.user = action.payload;
        },
        signInFailed(state) {
            state.isSigningUp = false;
        },
        logoutAttempt(state) {
        },
        logoutSuccess(state) {
        },
        logoutFailure(state) {
        }
    }
});

export const {
    signInAttempt,
    signInSuccess,
    signInFailed,
    logoutAttempt,
    logoutSuccess,
    logoutFailure
} = userSession.actions

export default userSession.reducer

// export const restoreSession: AppThunk = ({email, password}: LoginDto) => async (dispatch: AppDispatch, getState) => {
//     const state = getState();
//
//     if (state.userSession.user) {
//         // navigate to app
//     } else {
//         // login screen
//     }
//
//     // finally hide
//     SplashScreen.hide();
// };

export const login: AppThunk = ({email, password}: LoginDto) => async (dispatch: AppDispatch) => {
    dispatch(signInAttempt());
    try {
        const response = await API.signIn({email, password});
        await setJwtToken(response.token);
        dispatch(signInSuccess(response));
        NavigationService.navigate('HomeScreen');
    } catch(err) {
        console.log('error --', err)
        ToastService.show('Bad credentials, please try again');
        dispatch(signInFailed());
    }
};
export const logout: AppThunk = () => async (dispatch: AppDispatch) => {
    dispatch(logoutAttempt());
    try {
        // await API.logout();
        await removeJwtToken();
        dispatch(logoutSuccess());
        NavigationService.navigate("LoginScreen")
    } catch {
        dispatch(logoutFailure());
    }
};


