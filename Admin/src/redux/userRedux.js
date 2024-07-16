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
        }
    }
})

export const { loginStart, loginSuccess,
    loginFailure, logout } = userSlice.actions;
export default userSlice.reducer;