import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    productList: [],
    isFetching: false,
    error: false,
}

const productSlice = createSlice({
    name: 'product',
    initialState,
    reducers: {
        getProductListStart(state) {
            state.isFetching = true;
        },
        getProductListSuccess(state, action) {
            state.productList = action.payload;
            state.isFetching = false;
            state.error = false;
        },
        getProductListFailure(state) {
            state.isFetching = false;
            state.error = true;
        },
        clearProduct() {
            return initialState;
        },
        deleteProductStart(state) {
            state.isFetching = true;
        },
        deleteProductSuccess(state, action) {
            const productId = action.payload;
            const index = state.productList.findIndex(item => item._id === productId);
            state.productList.splice(index, 1);
            state.isFetching = false;
            state.error = false;
        },
        deleteProductFailure(state) {
            state.isFetching = false;
            state.error = true;
        },
        editProductStart(state) {
            state.isFetching = true;
        },
        editProductSuccess(state, action) {
            const index = state.productList.findIndex(item => item._id === action.payload.productId);
            state.productList[index] = { ...action.payload.updatedProduct };
            state.isFetching = false;
            state.error = false;
        },
        editProductFailure(state) {
            state.isFetching = false;
            state.error = true;
        },
        addProductStart(state) {
            state.isFetching = true;
        },
        addProductSuccess(state, action) {
            state.productList.push(action.payload);
            state.isFetching = false;
            state.error = false;
        },
        addProductFailure(state) {
            state.isFetching = false;
            state.error = true;
        }
    }
})

export const { getProductListStart, getProductListSuccess,
    getProductListFailure, clearProduct,
    deleteProductStart, deleteProductSuccess, deleteProductFailure,
    editProductStart, editProductSuccess, editProductFailure,
    addProductStart, addProductSuccess, addProductFailure } = productSlice.actions
export default productSlice.reducer