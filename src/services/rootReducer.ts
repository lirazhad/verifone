import userSession, {
    InitialState as userSessionState
} from '../modules/auth/redux/userSessionSlice';
import app, {InitialState as appSliceState} from '../modules/app/redux/appSlice';
import home, {InitialState as HomeItemsState} from '../modules/home/redux/homeSlice';
import cart, {InitialState as CartSlice } from '../modules/cart/redux/cartSlice'

const rootReducer = {
    userSession,
    app,
    home,
    cart
};

export interface RootState {
    userSession: userSessionState;
    app: appSliceState;
    home: HomeItemsState;
    cart: CartSlice
}

export default rootReducer;
