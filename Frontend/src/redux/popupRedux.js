import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    showPopup: false,
    typeSuccess: false,
    message: ''
}

const popupSlice = createSlice({
    name: 'popup',
    initialState,
    reducers: {
        displayPopup(state, action) {
            state.typeSuccess = action.payload.typeSuccess
            state.message = action.payload.message
            state.showPopup = true
        },
        closePopup(state) {
            state.showPopup = false
        }
    }
})

export const { closePopup, displayPopup } = popupSlice.actions;
export default popupSlice.reducer;