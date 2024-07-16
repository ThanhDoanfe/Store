import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    currentUser: null,
    userToken: '',
    isFetching: false,
    error: false,
    isSession: false,
}

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        loginStart(state) {
            state.isFetching = true;
        },
        loginSuccess(state, action) {
            const { token, ...user } = action.payload;
            state.currentUser = { ...user };
            state.userToken = token;
            state.isFetching = false;
            state.error = false;
            state.isSession = true;
        },
        loginFailure(state) {
            state.isFetching = false;
            state.error = true;
        },
        logout() {
            return initialState
        },
        registerStart(state) {
            state.isFetching = true;
        },
        registerSuccess(state) {
            state.isFetching = false;
            state.error = false;
        },
        registerFailure(state) {
            state.isFetching = false;
            state.error = true;
        },
        editProfileStart(state) {
            state.isFetching = true;
        },
        editProfileSuccess(state, action) {
            state.currentUser = { ...action.payload }
            state.isFetching = false;
            state.error = false;
        },
        editProfileFailure(state) {
            state.isFetching = false;
            state.error = true;
        }
    }
})

export const { loginStart, loginSuccess,
    loginFailure, logout, registerStart, registerSuccess, registerFailure,
    editProfileStart, editProfileSuccess, editProfileFailure } = userSlice.actions;
export default userSlice.reducer;