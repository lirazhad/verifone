import {createSelector, createSlice, PayloadAction} from '@reduxjs/toolkit';
import {AppDispatch, AppThunk} from '../../../services/store';
import * as API from '../../../services/APIGateway';
import {RootState} from '../../../services/rootReducer';
import _ from 'lodash';

interface Item {
    id: number;
    name: string;
    images: string[];
    categories: string[];
    price: number;
    pricingDescription: string;
}

export interface InitialState {
    items: Item[];
    isFetchingItems: boolean;
}

const initialState: InitialState = {
    items: [],
    isFetchingItems: false
};

const HomeSlice = createSlice({
    name: 'items',
    initialState,
    reducers: {
        fetchItemsAttempt(state) {
            state.isFetchingItems = true;
        },
        fetchItemsSuccess(state, action: PayloadAction<Item[]>) {
            state.isFetchingItems = false;
            state.items = action.payload;
        },
        fetchItemsFailed(state) {
            state.isFetchingItems = false;
        }
    }
});

export const items = (state: RootState) => state.home.items;

export const selectItemsGroupedByCategory = createSelector(
    items,
    items => {
        return _.groupBy(items, (item: Item) => item.categories[0]);
    }
);

export const {fetchItemsAttempt, fetchItemsSuccess, fetchItemsFailed} = HomeSlice.actions;

export default HomeSlice.reducer;

export const fetchItems: AppThunk = () => async (dispatch: AppDispatch) => {
    dispatch(fetchItemsAttempt());
    try {
        const response = await API.fetchItems();
        dispatch(fetchItemsSuccess(response));
    } catch {
        dispatch(fetchItemsFailed());
    }
};
