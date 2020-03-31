import {createSlice} from '@reduxjs/toolkit';

export interface InitialState {
    isModalVisible: boolean;
}

const initialState: InitialState = {
    isModalVisible: false
};

const appSlice = createSlice({
    name: 'app',
    initialState,
    reducers: {
        hideModal(state) {
            state.isModalVisible = false;
        },
        showModal(state) {
            state.isModalVisible = true;
        }
    }
});
export const {showModal, hideModal} = appSlice.actions;

export default appSlice.reducer;
