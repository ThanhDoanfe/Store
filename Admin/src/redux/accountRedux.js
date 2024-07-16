import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    accountList: [],
    isFetching: false,
    error: false
}

const accountSlice = createSlice({
    name: "account",
    initialState,
    reducers: {
        getAccountListStart(state) {
            state.isFetching = true;
        },
        getAccountListSuccess(state, action) {
            state.accountList = [...action.payload];
            state.isFetching = false;
            state.error = false
        },
        getAccountListFailure(state) {
            state.isFetching = false;
            state.error = true
        },
        deleteAccountStart(state) {
            state.isFetching = true;
        },
        deleteAccountSuccess(state, action) {
            const accountId = action.payload;
            const index = state.accountList.findIndex(item => item._id === accountId);
            state.accountList.splice(index, 1);
            state.isFetching = false;
            state.error = false;
        },
        deleteAccountFailure(state) {
            state.isFetching = false;
            state.error = true;
        },
        editAccountStart(state) {
            state.isFetching = true;
        },
        editAccountSuccess(state, action) {
            const index = state.accountList.findIndex(item => item._id === action.payload.accountId);
            state.accountList[index] = { ...action.payload.updatedUser };
            state.isFetching = false;
            state.error = false;
        },
        editAccountFailure(state) {
            state.isFetching = false;
            state.error = true
        },
        addAccountStart(state) {
            state.isFetching = true;
        },
        addAccountSuccess(state, action) {
            state.accountList.push(action.payload);
            state.isFetching = false;
            state.error = false;
        },
        addAccountFailure(state) {
            state.isFetching = false;
            state.error = true;
        }
    }
})

export const { getAccountListStart, getAccountListSuccess, getAccountListFailure,
    deleteAccountStart, deleteAccountSuccess, deleteAccountFailure,
    editAccountStart, editAccountSuccess, editAccountFailure,
    addAccountStart, addAccountSuccess, addAccountFailure } = accountSlice.actions;
export default accountSlice.reducer