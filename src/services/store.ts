import {configureStore, ActionCreator, Action} from '@reduxjs/toolkit';
import rootReducer, {RootState} from './rootReducer';
import {ThunkAction} from 'redux-thunk';

import { persistStore, persistReducer } from 'redux-persist'
import AsyncStorage from '@react-native-community/async-storage';

const store = configureStore({
    reducer: rootReducer,

});

// const persistConfig = {
//     key: 'root',
//     storage: AsyncStorage
// }
// export default () => {
//     let store = configureStore(persistedReducer)
//     let persistor = persistStore(store)
//     return { store, persistor }
// }
// const persistedReducer = persistReducer(persistConfig, rootReducer)


export type AppDispatch = typeof store.dispatch;

export type AppThunk = ActionCreator<
    ThunkAction<void, RootState, null, Action<string>>
    >;

export default store;
