import { loginStart, loginSuccess, loginFailure } from 'src/redux/userRedux';
import { publicRequest, userRequest } from 'src/requestMethods';
import {
    getProductListStart, getProductListSuccess,
    getProductListFailure, clearProduct,
    deleteProductStart, deleteProductSuccess, deleteProductFailure,
    editProductStart, editProductSuccess, editProductFailure,
    addProductStart, addProductSuccess, addProductFailure,
} from 'src/redux/productRedux';
import {
    getAccountListStart, getAccountListSuccess, getAccountListFailure,
    deleteAccountStart, deleteAccountSuccess, deleteAccountFailure,
    editAccountStart, editAccountSuccess, editAccountFailure,
    addAccountStart, addAccountSuccess, addAccountFailure
} from 'src/redux/accountRedux'

export const login = async (dispatch, inputUser) => {
    dispatch(loginStart());
    try {
        const res = await publicRequest.post('/api/auth/login', inputUser)
        if (res.data.errCode === 0 && res.data.user.isAdmin)
            dispatch(loginSuccess({ ...res.data.user, token: res.data.token }))
        else
            dispatch(loginFailure())
    } catch (err) {
        dispatch(loginFailure())
    }
}

export const getAllProduct = async (dispatch) => {
    dispatch(getProductListStart())
    try {
        const res = await userRequest.get('/api/products/findAll')
        if (res.data.errCode == 0)
            dispatch(getProductListSuccess(res.data.products))
        else
            dispatch(getProductListFailure())
    } catch (err) {
        dispatch(getProductListFailure())
    }
}

export const deleteProduct = async (dispatch, productId) => {
    dispatch(deleteProductStart())
    try {
        const res = await userRequest.delete(`/api/products/delete/${productId}`)
        if (res.data.errCode == 0)
            dispatch(deleteProductSuccess(productId))
        else
            dispatch(deleteProductFailure())
    } catch (err) {
        dispatch(deleteProductFailure())
    }
}

export const editProduct = async (dispatch, productId, editedData) => {
    dispatch(editProductStart())
    try {
        const res = await userRequest.put(`/api/products/update/${productId}`, editedData)
        if (res.data.errCode == 0)
            dispatch(editProductSuccess({ productId, updatedProduct: res.data.updatedProduct }))
        else
            dispatch(editProductFailure())
    } catch (err) {
        dispatch(editProductFailure())
    }
}

export const addProduct = async (dispatch, inputData) => {
    dispatch(addProductStart())
    try {
        const res = await userRequest.post('/api/products/create', inputData)
        if (res.data.errCode == 0)
            dispatch(addProductSuccess(res.data.newProduct))
        else
            dispatch(addProductFailure())
    } catch (err) {
        dispatch(addProductFailure())
    }
}

export const getAccountList = async (dispatch) => {
    dispatch(getAccountListStart())
    try {
        const res = await userRequest.get('/api/users/findAll')
        if (res.data.errCode == 0)
            dispatch(getAccountListSuccess(res.data.users))
        else
            dispatch(getAccountListFailure())
    } catch (err) {
        dispatch(getAccountListFailure())
    }
}

export const deleteAccount = async (dispatch, accountId) => {
    dispatch(deleteAccountStart())
    try {
        const res = await userRequest.delete(`/api/users/delete/${accountId}`)
        if (res.data.errCode == 0)
            dispatch(deleteAccountSuccess(accountId))
        else
            dispatch(deleteAccountFailure())
    } catch (err) {
        dispatch(deleteAccountFailure())
    }
}

export const editAccount = async (dispatch, accountId, editedData) => {
    dispatch(editAccountStart())
    try {
        const res = await userRequest.put(`/api/users/update/${accountId}`, editedData)
        if (res.data.errCode == 0)
            dispatch(editAccountSuccess({ accountId, updatedUser: res.data.updatedUser }))
        else
            dispatch(editAccountFailure())
    } catch (err) {
        dispatch(editAccountFailure())
    }
}

export const addAccount = async (dispatch, inputData) => {
    dispatch(addAccountStart())
    try {
        const res = await userRequest.post('/api/users/create', inputData)
        if (res.data.errCode == 0)
            dispatch(addAccountSuccess(res.data.newAccount))
        else
            dispatch(addAccountFailure())
    } catch (err) {
        dispatch(addAccountFailure())
    }
}