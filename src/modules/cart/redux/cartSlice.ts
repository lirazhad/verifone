import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {AppDispatch, AppThunk} from '../../../services/store';
import * as API from '../../../services/APIGateway';
import ToastService from "../../../services/ToastService";

interface Item {
    id: number;
    name: string;
    images: string[];
    categories: string[];
    price: number;
    pricingDescription: string;
}
interface CartItem {
    id: number;
    name: string;
    images: any;
    totalPrice: number;
    price: number;
    itemsAmount: number;
    // discount:number
}

export interface InitialState {
    cartItems: any | object;
    totalCartPrice: number;
    sumOfItems: number;
    // totalDiscount: number;
}

const initialState: InitialState = {
    cartItems: {},
    totalCartPrice: 0,
    sumOfItems: 0
    // totalDiscount: 0
};

const cart = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addToCart(state, action: PayloadAction<Item>) {
            const addedItem = action.payload;
            const itemPrice = addedItem.price;
            const itemName = addedItem.name;
            const itemId = addedItem.id;
            let UpdatedOrNewItem: CartItem;
            if (state.cartItems[itemId]) {
                UpdatedOrNewItem = {
                    id: itemId,
                    name: itemName,
                    price: itemPrice,
                    itemsAmount: state.cartItems[itemId].itemsAmount + 1,
                    totalPrice: state.cartItems[itemId].totalPrice + itemPrice,
                    images: addedItem.images
                };
            } else {
                UpdatedOrNewItem = {
                    id: itemId,
                    name: itemName,
                    price: itemPrice,
                    itemsAmount: 1,
                    totalPrice: itemPrice,
                    images: addedItem.images
                };
            }
            state.totalCartPrice = state.totalCartPrice + itemPrice;
            state.cartItems[UpdatedOrNewItem.id] = UpdatedOrNewItem;
            state.sumOfItems = state.sumOfItems + 1;
        },
        removeFromCart(state, action: PayloadAction<number>) {
            if (state.cartItems[action.payload]) {
                const selectedCartItemToRemove = state.cartItems[action.payload];
                const currentQuantity = selectedCartItemToRemove.itemsAmount;
                if (currentQuantity > 1) {
                    selectedCartItemToRemove.itemsAmount = selectedCartItemToRemove.itemsAmount - 1;
                    selectedCartItemToRemove.totalPrice =
                        selectedCartItemToRemove.totalPrice - selectedCartItemToRemove.price;
                } else {
                    delete state.cartItems[action.payload];
                }

                state.totalCartPrice = state.totalCartPrice - selectedCartItemToRemove.totalPrice;
                state.sumOfItems = state.sumOfItems - 1;
            }
        },
        clearCart(state) {
            state.sumOfItems = 0;
            state.totalCartPrice = 0;
            state.cartItems = {};
        }
    }
});

export const {addToCart, clearCart, removeFromCart} = cart.actions;

export default cart.reducer;

export const submitQuote: AppThunk = (
    customer: CustomerDto,
    sendTo: string,
    phoneNumber: string,
    email: string,
    agentEmail: string,
    comment: string
) => async (dispatch: AppDispatch) => {

    try {
        await API.submitQuote(customer, sendTo, phoneNumber, email, agentEmail, comment);
    } catch {
        ToastService.show("cant submit the quote")
    }
};
