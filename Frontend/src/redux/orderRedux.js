import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    isFetching: false,
    error: false,
}

const orderSlice = createSlice({
    name: 'order',
    initialState,
    reducers: {
        createOrderStart(state) {
            state.isFetching = true;
        },
        createOrderSuccess(state, action) {
            ;
            state.isFetching = false;
            state.error = false;
        },
        createOrderFailure(state) {
            state.isFetching = false;
            state.error = true;
        }
    }
})

export const { createOrderStart, createOrderSuccess, createOrderFailure } = orderSlice.actions;
export default orderSlice.reducer; 