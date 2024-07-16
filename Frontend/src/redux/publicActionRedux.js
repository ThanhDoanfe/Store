import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    isPublicFetching: false,
    publicError: false,
    isSearching: false
}

const publicActionSlice = createSlice({
    name: 'publicAction',
    initialState,
    reducers: {
        publicActionStart(state) {
            state.isPublicFetching = true;
        },
        publicActionSuccess(state) {
            state.isPublicFetching = false;
            state.publicError = false;
        },
        publicActionFailure(state) {
            state.isPublicFetching = false;
            state.publicError = true;
        },
        publicSeachStart(state) {
            state.isSearching = true
        },
        publicSeachEnd(state) {
            state.isSearching = false
        }
    }
})

export const { publicActionStart, publicActionSuccess, publicActionFailure,
    publicSeachStart, publicSeachEnd } = publicActionSlice.actions;
export default publicActionSlice.reducer;